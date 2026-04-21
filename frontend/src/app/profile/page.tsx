import Navigation from '@/components/Navigation';
import { Settings, Edit2, Plus } from 'lucide-react';

const wardrobeItems = [
  {
    id: 1,
    name: 'Summer Dress',
    category: 'Dresses',
    brand: 'Zara',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400',
  },
  {
    id: 2,
    name: 'Denim Jacket',
    category: 'Outerwear',
    brand: 'Levi\'s',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400',
  },
  {
    id: 3,
    name: 'White Sneakers',
    category: 'Shoes',
    brand: 'Nike',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
  },
  {
    id: 4,
    name: 'Black T-Shirt',
    category: 'Tops',
    brand: 'H&M',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
  },
];

export default function ProfilePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background pb-16">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-xl font-bold">Profile</h1>
          <button className="text-foreground hover:text-accent transition-colors">
            <Settings className="w-6 h-6" />
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-lg mx-auto w-full">
        {/* Profile Info */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center">
              <span className="text-3xl font-bold text-white">JS</span>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold">Jane Style</h2>
              <p className="text-muted-foreground text-sm">@janestyle</p>
            </div>
            <button className="p-2 rounded-full border border-border hover:bg-muted transition-colors">
              <Edit2 className="w-5 h-5" />
            </button>
          </div>
          
          <p className="text-sm text-muted-foreground mb-4">
            Fashion enthusiast | Minimalist style lover | Sharing my daily looks ✨
          </p>

          <div className="flex gap-6 text-sm">
            <div>
              <span className="font-bold">127</span>
              <span className="text-muted-foreground ml-1">posts</span>
            </div>
            <div>
              <span className="font-bold">2.4K</span>
              <span className="text-muted-foreground ml-1">followers</span>
            </div>
            <div>
              <span className="font-bold">345</span>
              <span className="text-muted-foreground ml-1">following</span>
            </div>
          </div>

          {/* Style Tags */}
          <div className="flex flex-wrap gap-2 mt-4">
            <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-xs font-medium">#minimalist</span>
            <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-xs font-medium">#casual</span>
            <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-xs font-medium">#sustainable</span>
          </div>
        </div>

        {/* Wardrobe Section */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold">My Wardrobe</h3>
            <button className="flex items-center gap-2 text-accent hover:text-accent-secondary transition-colors">
              <Plus className="w-5 h-5" />
              <span className="text-sm font-medium">Add Item</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {wardrobeItems.map((item) => (
              <div key={item.id} className="bg-card rounded-xl overflow-hidden border border-border">
                <div className="aspect-square bg-muted">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3">
                  <h4 className="font-semibold text-sm">{item.name}</h4>
                  <p className="text-xs text-muted-foreground">{item.brand} • {item.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Posts */}
        <div className="p-4">
          <h3 className="text-lg font-bold mb-4">Recent Posts</h3>
          <div className="grid grid-cols-3 gap-1">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="aspect-square bg-muted">
                <img
                  src={`https://images.unsplash.com/photo-${1500000000000 + i * 10000000}?w=300`}
                  alt={`Post ${i}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </main>

      <Navigation />
    </div>
  );
}
