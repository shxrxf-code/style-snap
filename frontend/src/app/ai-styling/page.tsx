import Navigation from '@/components/Navigation';
import { Sparkles, RefreshCw, Heart, Shuffle } from 'lucide-react';

const aiRecommendations = [
  {
    id: 1,
    title: 'Casual Friday',
    occasion: 'Work Casual',
    season: 'All Seasons',
    items: [
      { name: 'White T-Shirt', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200' },
      { name: 'Denim Jeans', image: 'https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?w=200' },
      { name: 'White Sneakers', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200' },
    ],
    matchScore: 95,
  },
  {
    id: 2,
    title: 'Date Night',
    occasion: 'Evening',
    season: 'Spring/Summer',
    items: [
      { name: 'Summer Dress', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=200' },
      { name: 'Heeled Sandals', image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=200' },
      { name: 'Statement Necklace', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=200' },
    ],
    matchScore: 88,
  },
  {
    id: 3,
    title: 'Weekend Brunch',
    occasion: 'Casual',
    season: 'Spring',
    items: [
      { name: 'Floral Blouse', image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=200' },
      { name: 'Skirt', image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0uj9a?w=200' },
      { name: 'Loafers', image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=200' },
    ],
    matchScore: 92,
  },
];

export default function AIStylingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background pb-16">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-accent" />
            <h1 className="text-xl font-bold">AI Stylist</h1>
          </div>
          <button className="p-2 rounded-full hover:bg-muted transition-colors">
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-lg mx-auto w-full p-4">
        {/* Input Section */}
        <div className="mb-6 p-4 bg-accent/10 rounded-xl border border-accent/20">
          <h2 className="font-semibold mb-3">Tell us about your occasion</h2>
          <div className="space-y-3">
            <select className="w-full p-3 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent">
              <option value="">Select occasion...</option>
              <option value="work">Work</option>
              <option value="casual">Casual</option>
              <option value="formal">Formal</option>
              <option value="date">Date Night</option>
              <option value="party">Party</option>
              <option value="weekend">Weekend</option>
            </select>
            <select className="w-full p-3 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent">
              <option value="">Select season...</option>
              <option value="spring">Spring</option>
              <option value="summer">Summer</option>
              <option value="fall">Fall</option>
              <option value="winter">Winter</option>
              <option value="all">All Seasons</option>
            </select>
            <button className="w-full py-3 bg-accent text-white rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
              <Shuffle className="w-4 h-4" />
              Generate Outfits
            </button>
          </div>
        </div>

        {/* Recommendations */}
        <div className="space-y-4">
          <h2 className="font-bold text-lg">Your Recommendations</h2>
          
          {aiRecommendations.map((rec) => (
            <div key={rec.id} className="bg-card rounded-xl border border-border overflow-hidden">
              {/* Recommendation Header */}
              <div className="p-4 border-b border-border flex items-center justify-between">
                <div>
                  <h3 className="font-bold">{rec.title}</h3>
                  <p className="text-xs text-muted-foreground">{rec.occasion} • {rec.season}</p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-accent/10 rounded-full">
                  <span className="text-accent font-bold text-sm">{rec.matchScore}%</span>
                  <span className="text-xs text-muted-foreground">match</span>
                </div>
              </div>

              {/* Outfit Items */}
              <div className="p-4">
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {rec.items.map((item, index) => (
                    <div key={index} className="flex-shrink-0 w-24">
                      <div className="aspect-square bg-muted rounded-lg mb-2 overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="text-xs font-medium truncate">{item.name}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="p-4 border-t border-border flex gap-2">
                <button className="flex-1 py-2 bg-accent text-white rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity">
                  Save Look
                </button>
                <button className="p-2 border border-border rounded-lg hover:bg-muted transition-colors">
                  <Heart className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Premium CTA */}
        <div className="mt-6 p-4 bg-accent/10 rounded-xl border border-accent/20">
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-accent mt-0.5" />
            <div>
              <h4 className="font-semibold text-sm mb-1">Want More?</h4>
              <p className="text-xs text-muted-foreground mb-3">
                Upgrade to Premium for unlimited AI styling recommendations and personalized style drops.
              </p>
              <button className="px-4 py-2 bg-accent text-white rounded-full text-xs font-semibold hover:opacity-90 transition-opacity">
                Upgrade Now
              </button>
            </div>
          </div>
        </div>
      </main>

      <Navigation />
    </div>
  );
}
