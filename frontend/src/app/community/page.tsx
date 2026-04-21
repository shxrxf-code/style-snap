import Navigation from '@/components/Navigation';
import { Users, Trophy, MessageSquare, Plus } from 'lucide-react';

const groups = [
  {
    id: 1,
    name: 'Streetwear Enthusiasts',
    description: 'For those who love urban fashion and street style',
    members: 12453,
    image: 'https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=400',
    category: 'Streetwear',
  },
  {
    id: 2,
    name: 'Minimalist Fashion',
    description: 'Less is more - clean lines and simple aesthetics',
    members: 8932,
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400',
    category: 'Minimalist',
  },
  {
    id: 3,
    name: 'Sustainable Style',
    description: 'Eco-friendly fashion and ethical choices',
    members: 6789,
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400',
    category: 'Sustainable',
  },
];

const activeChallenges = [
  {
    id: 1,
    title: 'Glow Up Week',
    description: 'Share your best transformation looks',
    participants: 2341,
    reward: '500 points + Exclusive Badge',
    daysLeft: 3,
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400',
  },
  {
    id: 2,
    title: 'Summer Essentials',
    description: 'Show us your must-have summer pieces',
    participants: 1892,
    reward: '300 points',
    daysLeft: 5,
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400',
  },
];

export default function CommunityPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background pb-16">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-lg mx-auto px-4 py-3">
          <h1 className="text-xl font-bold">Community</h1>
        </div>
      </header>

      <main className="flex-1 max-w-lg mx-auto w-full">
        {/* Quick Actions */}
        <div className="p-4 flex gap-3">
          <button className="flex-1 p-4 bg-accent text-white rounded-xl font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
            <Plus className="w-5 h-5" />
            Create Group
          </button>
          <button className="flex-1 p-4 bg-card border-2 border-border rounded-xl font-semibold hover:border-accent transition-colors flex items-center justify-center gap-2">
            <Trophy className="w-5 h-5" />
            Challenges
          </button>
        </div>

        {/* Active Challenges */}
        <section className="px-4 mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-lg flex items-center gap-2">
              <Trophy className="w-5 h-5 text-accent" />
              Active Challenges
            </h2>
          </div>
          <div className="space-y-3">
            {activeChallenges.map((challenge) => (
              <div key={challenge.id} className="bg-card rounded-xl border border-border overflow-hidden">
                <div className="flex">
                  <div className="w-24 h-24 flex-shrink-0">
                    <img
                      src={challenge.image}
                      alt={challenge.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 p-3">
                    <h3 className="font-bold text-sm mb-1">{challenge.title}</h3>
                    <p className="text-xs text-muted-foreground mb-2">{challenge.description}</p>
                    <div className="flex items-center gap-3 text-xs">
                      <span className="text-accent font-medium">{challenge.participants} participants</span>
                      <span className="text-muted-foreground">{challenge.daysLeft} days left</span>
                    </div>
                  </div>
                </div>
                <div className="p-3 border-t border-border bg-muted/30">
                  <p className="text-xs font-medium text-accent">🏆 {challenge.reward}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Groups */}
        <section className="px-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-lg flex items-center gap-2">
              <Users className="w-5 h-5 text-accent" />
              Popular Groups
            </h2>
          </div>
          <div className="space-y-3">
            {groups.map((group) => (
              <div key={group.id} className="bg-card rounded-xl border border-border overflow-hidden">
                <div className="flex">
                  <div className="w-24 h-24 flex-shrink-0">
                    <img
                      src={group.image}
                      alt={group.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 p-3">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="font-bold text-sm">{group.name}</h3>
                      <span className="px-2 py-0.5 bg-accent/10 text-accent rounded-full text-xs">
                        {group.category}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{group.description}</p>
                    <div className="flex items-center gap-2 text-xs">
                      <Users className="w-3 h-3 text-muted-foreground" />
                      <span className="text-muted-foreground">{group.members.toLocaleString()} members</span>
                    </div>
                  </div>
                </div>
                <div className="p-3 border-t border-border flex gap-2">
                  <button className="flex-1 py-2 bg-accent text-white rounded-lg text-xs font-semibold hover:opacity-90 transition-opacity">
                    Join
                  </button>
                  <button className="flex-1 py-2 border border-border rounded-lg text-xs font-semibold hover:bg-muted transition-colors flex items-center justify-center gap-1">
                    <MessageSquare className="w-3 h-3" />
                    View
                  </button>
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
