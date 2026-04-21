import Navigation from '@/components/Navigation';
import { Heart, MessageCircle, Share2 } from 'lucide-react';

const mockPosts = [
  {
    id: 1,
    username: 'fashionista_alex',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800',
    caption: 'Summer vibes 🌞 #fashion #ootd',
    likes: 234,
    comments: 45,
  },
  {
    id: 2,
    username: 'style_queen',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Queen',
    image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800',
    caption: 'Date night outfit ✨ #elegant #style',
    likes: 567,
    comments: 89,
  },
  {
    id: 3,
    username: 'urban_chic',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Urban',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800',
    caption: 'Street style essentials 🏙️ #streetwear',
    likes: 189,
    comments: 32,
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background pb-16">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-lg mx-auto px-4 py-3">
          <h1 
            className="text-white text-2xl font-['Satisfy',cursive tracking-tight"
            style={{ 
              letterSpacing: '-0.3px',
              lineHeight: 1,
              textRendering: 'optimizeLegibility',
              WebkitFontSmoothing: 'antialiased'
            }}
          >
            Style Snap
          </h1>
        </div>
      </header>

      {/* Feed */}
      <main className="flex-1 max-w-lg mx-auto w-full">
        {mockPosts.map((post) => (
          <article key={post.id} className="border-b border-border">
            {/* Post Header */}
            <div className="flex items-center gap-3 p-4">
              <img
                src={post.avatar}
                alt={post.username}
                className="w-10 h-10 rounded-full bg-muted"
              />
              <div>
                <h3 className="font-semibold text-sm">{post.username}</h3>
                <p className="text-xs text-muted-foreground">2 hours ago</p>
              </div>
            </div>

            {/* Post Image */}
            <div className="aspect-square bg-muted">
              <img
                src={post.image}
                alt={post.caption}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Post Actions */}
            <div className="p-4">
              <div className="flex items-center gap-4 mb-3">
                <button className="text-foreground hover:text-accent transition-colors">
                  <Heart className="w-6 h-6" />
                </button>
                <button className="text-foreground hover:text-accent transition-colors">
                  <MessageCircle className="w-6 h-6" />
                </button>
                <button className="text-foreground hover:text-accent transition-colors">
                  <Share2 className="w-6 h-6" />
                </button>
              </div>
              <p className="font-semibold text-sm mb-1">{post.likes} likes</p>
              <p className="text-sm">
                <span className="font-semibold">{post.username}</span> {post.caption}
              </p>
              <button className="text-muted-foreground text-sm mt-2">
                View all {post.comments} comments
              </button>
            </div>
          </article>
        ))}
      </main>

      <Navigation />
    </div>
  );
}
