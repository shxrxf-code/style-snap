import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { query } from '../db/connection';

const router = Router();

// Register
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { email, password, username, full_name } = req.body;

    // Check if user already exists
    const existingUser = await query(
      'SELECT id FROM users WHERE email = $1 OR username = $2',
      [email, username]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: 'User with this email or username already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    // Create user
    const result = await query(
      'INSERT INTO users (email, password_hash, username, full_name) VALUES ($1, $2, $3, $4) RETURNING id, email, username, full_name',
      [email, password_hash, username, full_name]
    );

    const user = result.rows[0];

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        full_name: user.full_name,
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Login
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Find user
    const result = await query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = result.rows[0];

    // Check password
    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        full_name: user.full_name,
        bio: user.bio,
        avatar_url: user.avatar_url,
        style_tags: user.style_tags,
        is_premium: user.is_premium,
        subscription_tier: user.subscription_tier,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Social Login (placeholder for Google, Facebook, etc.)
router.post('/social', async (req: Request, res: Response) => {
  try {
    const { provider, social_id, email, username, full_name, avatar_url } = req.body;

    // Check if user exists with this social account
    let result = await query(
      'SELECT * FROM users WHERE social_provider = $1 AND social_id = $2',
      [provider, social_id]
    );

    if (result.rows.length > 0) {
      // User exists, log them in
      const user = result.rows[0];
      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '7d' }
      );

      return res.json({
        message: 'Social login successful',
        token,
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          full_name: user.full_name,
          bio: user.bio,
          avatar_url: user.avatar_url,
          style_tags: user.style_tags,
          is_premium: user.is_premium,
          subscription_tier: user.subscription_tier,
        },
      });
    }

    // Check if email is already registered
    result = await query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length > 0) {
      return res.status(400).json({ error: 'Email already registered with different method' });
    }

    // Create new user
    result = await query(
      'INSERT INTO users (email, username, full_name, avatar_url, social_provider, social_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [email, username, full_name, avatar_url, provider, social_id]
    );

    const user = result.rows[0];
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'Social registration successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        full_name: user.full_name,
        bio: user.bio,
        avatar_url: user.avatar_url,
        style_tags: user.style_tags,
        is_premium: user.is_premium,
        subscription_tier: user.subscription_tier,
      },
    });
  } catch (error) {
    console.error('Social login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
