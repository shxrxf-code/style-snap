import Navigation from '@/components/Navigation';
import { Search, TrendingUp, Hash } from 'lucide-react';

const trendingHashtags = [
  { name: '#summerfashion', count: '125K posts' },
  { name: '#minimaliststyle', count: '89K posts' },
  { name: '#streetwear', count: '67K posts' },
  { name: '#ootd', count: '234K posts' },
  { name: '#sustainablefashion', count: '45K posts' },
];

const explorePosts = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400',
    username: 'fashion_weekly',
    likes: '2.3K',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400',
    username: 'style_daily',
    likes: '1.8K',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=400',
    username: 'chic_looks',
    likes: '3.1K',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400',
    username: 'urban_style',
    likes: '1.5K',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400',
    username: 'elegant_vibes',
    likes: '2.7K',
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400',
    username: 'summer_love',
    likes: '4.2K',
  },
];

export default function ExplorePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background pb-16">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-lg mx-auto px-4 py-3">
          <h1 className="text-xl font-bold mb-3">Explore</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search styles, users, hashtags..."
              className="w-full pl-10 pr-4 py-2 bg-muted rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-lg mx-auto w-full">
        {/* Trending Section */}
        <section className="p-4 border-b border-border">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-5 h-5 text-accent" />
            <h2 className="font-bold">Trending Now</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {trendingHashtags.map((tag) => (
              <button
                key={tag.name}
                className="px-4 py-2 bg-muted rounded-full text-sm hover:bg-accent hover:text-white transition-colors"
              >
                {tag.name}
              </button>
            ))}
          </div>
        </section>

        {/* Categories */}
        <section className="p-4 border-b border-border">
          <h2 className="font-bold mb-3">Categories</h2>
          <div className="grid grid-cols-2 gap-2">
            {['Streetwear', 'Formal', 'Casual', 'Vintage', 'Minimalist', 'Bohemian'].map((category) => (
              <button
                key={category}
                className="p-3 bg-card border border-border rounded-xl text-sm font-medium hover:border-accent transition-colors"
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {/* Explore Grid */}
        <section className="p-4">
          <h2 className="font-bold mb-3">Discover</h2>
          <div className="grid grid-cols-3 gap-1">
            {explorePosts.map((post) => (
              <div key={post.id} className="aspect-square relative group">
                <img
                  src={post.image}
                  alt={`Post by ${post.username}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="text-white text-xs">
                    <p className="font-semibold">{post.username}</p>
                    <p>{post.likes} likes</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Navigation />
    </div>
  );
}
