import Navigation from '@/components/Navigation';
import { Image as ImageIcon, X, Sparkles } from 'lucide-react';

export default function PostPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background pb-16">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-xl font-bold">New Post</h1>
          <button className="px-4 py-2 bg-accent text-white rounded-full text-sm font-semibold hover:opacity-90 transition-opacity">
            Share
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-lg mx-auto w-full p-4">
        {/* Image Upload Area */}
        <div className="aspect-square bg-muted rounded-2xl border-2 border-dashed border-border flex flex-col items-center justify-center mb-4 cursor-pointer hover:border-accent transition-colors">
          <ImageIcon className="w-16 h-16 text-muted-foreground mb-4" />
          <p className="text-muted-foreground text-center px-4">
            Tap to add photos or videos
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            PNG, JPG up to 10MB
          </p>
        </div>

        {/* Caption Input */}
        <div className="mb-4">
          <textarea
            placeholder="Write a caption... #fashion #ootd"
            className="w-full p-4 bg-card border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent resize-none"
            rows={4}
          />
        </div>

        {/* Style Tags */}
        <div className="mb-4">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-accent" />
            Style Tags
          </h3>
          <div className="flex flex-wrap gap-2">
            {['Casual', 'Formal', 'Streetwear', 'Minimalist', 'Vintage', 'Bohemian'].map((tag) => (
              <button
                key={tag}
                className="px-4 py-2 bg-muted rounded-full text-sm hover:bg-accent hover:text-white transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Advanced Options */}
        <div className="space-y-3">
          <div className="p-4 bg-card rounded-xl border border-border">
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-sm">Auto-remove background</span>
              <div className="relative">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-muted peer-focus:ring-2 peer-focus:ring-accent rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent" />
              </div>
            </label>
          </div>

          <div className="p-4 bg-card rounded-xl border border-border">
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-sm">Premium content (subscribers only)</span>
              <div className="relative">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-muted peer-focus:ring-2 peer-focus:ring-accent rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent" />
              </div>
            </label>
          </div>
        </div>

        {/* AI Styling Suggestion */}
        <div className="mt-6 p-4 bg-accent/10 rounded-xl border border-accent/20">
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-accent mt-0.5" />
            <div>
              <h4 className="font-semibold text-sm mb-1">AI Styling Tip</h4>
              <p className="text-xs text-muted-foreground">
                Upgrade to Premium to get AI-powered outfit recommendations and style suggestions based on your wardrobe!
              </p>
            </div>
          </div>
        </div>
      </main>

      <Navigation />
    </div>
  );
}
