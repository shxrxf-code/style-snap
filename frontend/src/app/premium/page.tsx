import Navigation from '@/components/Navigation';
import { Crown, Check, Sparkles, Star, Zap } from 'lucide-react';

const premiumFeatures = [
  { icon: Sparkles, title: 'AI Styling', description: 'Get personalized outfit recommendations' },
  { icon: Star, title: 'Exclusive Lookbooks', description: 'Seasonal style guides curated by experts' },
  { icon: Zap, title: 'Ad-Free Experience', description: 'Enjoy Style Snap without interruptions' },
  { icon: Crown, title: 'Premium Badge', description: 'Show off your status with a special badge' },
  { icon: Check, title: 'Early Access', description: 'Be first to try new features' },
  { icon: Sparkles, title: 'Advanced Analytics', description: 'Deep insights into your style journey' },
];

export default function PremiumPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background pb-16">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-lg mx-auto px-4 py-3">
          <h1 className="text-xl font-bold">Upgrade to Premium</h1>
        </div>
      </header>

      <main className="flex-1 max-w-lg mx-auto w-full p-4">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-accent mb-4">
            <Crown className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Unlock Your Style Potential</h2>
          <p className="text-muted-foreground text-sm">
            Get AI-powered styling recommendations, exclusive lookbooks, and more
          </p>
        </div>

        {/* Features */}
        <div className="grid gap-3 mb-8">
          {premiumFeatures.map((feature) => (
            <div key={feature.title} className="flex items-start gap-3 p-4 bg-card rounded-xl border border-border">
              <div className="p-2 bg-accent/10 rounded-lg">
                <feature.icon className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">{feature.title}</h3>
                <p className="text-xs text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Pricing Cards */}
        <div className="space-y-3 mb-8">
          {/* Monthly Plan */}
          <div className="p-4 bg-card rounded-xl border-2 border-border hover:border-accent transition-colors cursor-pointer">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold">Monthly</h3>
              <div className="text-right">
                <span className="text-2xl font-bold">$9.99</span>
                <span className="text-muted-foreground text-sm">/month</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Billed monthly, cancel anytime</p>
          </div>

          {/* Yearly Plan */}
          <div className="p-4 bg-accent/10 rounded-xl border-2 border-accent cursor-pointer relative">
            <div className="absolute -top-2 -right-2 px-3 py-1 bg-accent text-white text-xs font-bold rounded-full">
              SAVE 20%
            </div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold">Yearly</h3>
              <div className="text-right">
                <span className="text-2xl font-bold">$7.99</span>
                <span className="text-muted-foreground text-sm">/month</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Billed annually ($95.88/year)</p>
          </div>

          {/* Student Plan */}
          <div className="p-4 bg-card rounded-xl border-2 border-border hover:border-accent transition-colors cursor-pointer">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold">Student</h3>
              <div className="text-right">
                <span className="text-2xl font-bold">$4.99</span>
                <span className="text-muted-foreground text-sm">/month</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Valid student ID required, 50% off</p>
          </div>
        </div>

        {/* CTA Button */}
        <button className="w-full py-4 bg-accent text-white rounded-full font-bold text-lg hover:opacity-90 transition-opacity mb-4">
          Start 7-Day Free Trial
        </button>

        <p className="text-center text-xs text-muted-foreground">
          Cancel anytime. No commitment required.
        </p>
      </main>

      <Navigation />
    </div>
  );
}
