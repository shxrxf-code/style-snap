import { Router, Request, Response } from 'express';
import Stripe from 'stripe';
import { query } from '../db/connection';
import { authenticateToken, AuthRequest } from '../middleware/auth';

const router = Router();

const stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-11-20.acacia',
} as any);

// Create checkout session
router.post('/create-checkout-session', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const { plan } = req.body;
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Define pricing
    const prices: Record<string, number> = {
      monthly: 999, // $9.99
      yearly: 7999, // $79.99
      student: 499, // $4.99
    };

    const priceInCents = prices[plan];
    if (!priceInCents) {
      return res.status(400).json({ error: 'Invalid plan' });
    }

    // Check if user already has a Stripe customer ID
    const userResult = await query('SELECT stripe_customer_id FROM users WHERE id = $1', [userId]);
    const user = userResult.rows[0];

    let customerId = user?.stripe_customer_id;

    if (!customerId) {
      // Create new Stripe customer
      const customer = await stripeClient.customers.create({
        metadata: { userId: userId.toString() },
      });
      customerId = customer.id;

      // Update user with customer ID
      await query('UPDATE users SET stripe_customer_id = $1 WHERE id = $2', [customerId, userId]);
    }

    // Create checkout session
    const session = await stripeClient.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Style Snap ${plan.charAt(0).toUpperCase() + plan.slice(1)} Plan`,
              description: plan === 'yearly' ? 'Annual subscription (save 20%)' : 'Monthly subscription',
            },
            unit_amount: priceInCents,
            recurring: {
              interval: plan === 'yearly' ? 'year' : 'month',
            },
          },
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/premium?success=true`,
      cancel_url: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/premium?canceled=true`,
      metadata: {
        userId: userId.toString(),
        plan,
      },
    });

    res.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Checkout session error:', error);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
});

// Get user subscription status
router.get('/status', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const result = await query(
      `SELECT s.*, u.is_premium, u.subscription_tier 
       FROM subscriptions s 
       JOIN users u ON s.user_id = u.id 
       WHERE u.id = $1`,
      [userId]
    );

    if (result.rows.length === 0) {
      return res.json({
        isPremium: false,
        subscriptionTier: 'free',
        subscription: null,
      });
    }

    const subscription = result.rows[0];
    res.json({
      isPremium: subscription.is_premium,
      subscriptionTier: subscription.subscription_tier,
      subscription: {
        status: subscription.status,
        plan: subscription.plan,
        currentPeriodEnd: subscription.current_period_end,
        cancelAtPeriodEnd: subscription.cancel_at_period_end,
      },
    });
  } catch (error) {
    console.error('Subscription status error:', error);
    res.status(500).json({ error: 'Failed to get subscription status' });
  }
});

// Cancel subscription
router.post('/cancel', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;

    const result = await query(
      'SELECT stripe_subscription_id FROM subscriptions WHERE user_id = $1 AND status = $2',
      [userId, 'active']
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'No active subscription found' });
    }

    const subscription = await stripeClient.subscriptions.update(result.rows[0].stripe_subscription_id, {
      cancel_at_period_end: true,
    });

    await query(
      'UPDATE subscriptions SET cancel_at_period_end = true WHERE user_id = $1',
      [userId]
    );

    res.json({ message: 'Subscription will be canceled at period end' });
  } catch (error) {
    console.error('Cancel subscription error:', error);
    res.status(500).json({ error: 'Failed to cancel subscription' });
  }
});

// Stripe webhook handler
router.post('/webhook', async (req: Request, res: Response) => {
  const sig = req.headers['stripe-signature'] as string;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event: any;

  try {
    event = stripeClient.webhooks.constructEvent(req.body, sig, webhookSecret || '');
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return res.status(400).json({ error: 'Invalid signature' });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        const userId = parseInt(session.metadata?.userId || '0');
        const plan = session.metadata?.plan || 'monthly';

        if (userId && session.subscription) {
          await query(
            `INSERT INTO subscriptions (user_id, stripe_subscription_id, stripe_customer_id, plan, status, current_period_start, current_period_end)
             VALUES ($1, $2, $3, $4, $5, NOW(), NOW() + INTERVAL '1 month')
             ON CONFLICT (user_id) DO UPDATE SET
             stripe_subscription_id = $2,
             plan = $4,
             status = $5,
             current_period_start = NOW(),
             current_period_end = NOW() + INTERVAL '1 month'`,
            [userId, session.subscription, session.customer, plan, 'active']
          );

          await query(
            'UPDATE users SET is_premium = true, subscription_tier = $1 WHERE id = $2',
            [plan, userId]
          );
        }
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object;
        const customerId = subscription.customer as string;

        await query(
          'UPDATE subscriptions SET status = $1 WHERE stripe_customer_id = $2',
          ['canceled', customerId]
        );

        await query(
          'UPDATE users SET is_premium = false, subscription_tier = $1 WHERE stripe_customer_id = $2',
          ['free', customerId]
        );
        break;
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object;
        const subscriptionId = invoice.subscription as string;

        // Update subscription period end
        const subscription = await stripeClient.subscriptions.retrieve(subscriptionId);
        
        await query(
          'UPDATE subscriptions SET current_period_end = to_timestamp($1), status = $2 WHERE stripe_subscription_id = $3',
          [(subscription as any).current_period_end, 'active', subscriptionId]
        );
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object;
        const subscriptionId = invoice.subscription as string;

        await query(
          'UPDATE subscriptions SET status = $1 WHERE stripe_subscription_id = $2',
          ['past_due', subscriptionId]
        );
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Webhook processing error:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
});

export default router;
