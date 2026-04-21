import Navigation from '@/components/Navigation';
import { Trophy, Award, Flame, TrendingUp, Medal, Star } from 'lucide-react';

const badges = [
  {
    id: 1,
    name: 'Fashion Pioneer',
    description: 'Post your first outfit',
    icon: Medal,
    earned: true,
    earnedAt: '2 days ago',
  },
  {
    id: 2,
    name: 'Style Influencer',
    description: 'Reach 1000 followers',
    icon: Star,
    earned: true,
    earnedAt: '1 week ago',
  },
  {
    id: 3,
    name: 'Challenge Champion',
    description: 'Win a style challenge',
    icon: Trophy,
    earned: false,
    progress: 2,
    total: 5,
  },
  {
    id: 4,
    name: 'Community Builder',
    description: 'Create a popular group',
    icon: Award,
    earned: false,
    progress: 0,
    total: 1,
  },
  {
    id: 5,
    name: 'Premium Stylist',
    description: 'Subscribe for 3 months',
    icon: Star,
    earned: false,
    progress: 1,
    total: 3,
  },
];

const leaderboard = [
  {
    rank: 1,
    username: 'style_queen',
    points: 15420,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Queen',
  },
  {
    rank: 2,
    username: 'fashion_guru',
    points: 12890,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Guru',
  },
  {
    rank: 3,
    username: 'trendsetter',
    points: 11200,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Trend',
  },
  {
    rank: 4,
    username: 'you',
    points: 8750,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=You',
    isCurrentUser: true,
  },
  {
    rank: 5,
    username: 'chic_lover',
    points: 8230,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Chic',
  },
];

export default function AchievementsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background pb-16">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-lg mx-auto px-4 py-3">
          <h1 className="text-xl font-bold">Achievements</h1>
        </div>
      </header>

      <main className="flex-1 max-w-lg mx-auto w-full p-4">
        {/* Stats Overview */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-accent/10 p-4 rounded-xl border border-accent/20 text-center">
            <Flame className="w-6 h-6 text-accent mx-auto mb-2" />
            <p className="text-2xl font-bold">7</p>
            <p className="text-xs text-muted-foreground">Day Streak</p>
          </div>
          <div className="bg-accent/10 p-4 rounded-xl border border-accent/20 text-center">
            <Trophy className="w-6 h-6 text-accent mx-auto mb-2" />
            <p className="text-2xl font-bold">8,750</p>
            <p className="text-xs text-muted-foreground">Total Points</p>
          </div>
          <div className="bg-accent/10 p-4 rounded-xl border border-accent/20 text-center">
            <Award className="w-6 h-6 text-accent mx-auto mb-2" />
            <p className="text-2xl font-bold">2</p>
            <p className="text-xs text-muted-foreground">Badges</p>
          </div>
        </div>

        {/* Badges Section */}
        <section className="mb-6">
          <h2 className="font-bold text-lg mb-3 flex items-center gap-2">
            <Award className="w-5 h-5 text-accent" />
            Your Badges
          </h2>
          <div className="space-y-3">
            {badges.map((badge) => {
              const Icon = badge.icon;
              return (
                <div
                  key={badge.id}
                  className={`p-4 rounded-xl border ${
                    badge.earned
                      ? 'bg-accent border-accent'
                      : 'bg-card border-border opacity-60'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-3 rounded-lg ${badge.earned ? 'bg-accent' : 'bg-muted'}`}>
                      <Icon className={`w-6 h-6 ${badge.earned ? 'text-white' : 'text-muted-foreground'}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm">{badge.name}</h3>
                      <p className="text-xs text-muted-foreground mb-2">{badge.description}</p>
                      {badge.earned ? (
                        <p className="text-xs text-accent">Earned {badge.earnedAt}</p>
                      ) : (
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-accent h-2 rounded-full transition-all"
                            style={{ width: `${((badge.progress || 0) / (badge.total || 1)) * 100}%` }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Leaderboard Section */}
        <section>
          <h2 className="font-bold text-lg mb-3 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-accent" />
            Leaderboard
          </h2>
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            {leaderboard.map((user) => (
              <div
                key={user.rank}
                className={`flex items-center gap-3 p-4 border-b border-border last:border-b-0 ${
                  user.isCurrentUser ? 'bg-accent/5' : ''
                }`}
              >
                <div className="w-8 h-8 flex items-center justify-center font-bold text-sm">
                  {user.rank === 1 && '🥇'}
                  {user.rank === 2 && '🥈'}
                  {user.rank === 3 && '🥉'}
                  {user.rank > 3 && user.rank}
                </div>
                <img
                  src={user.avatar}
                  alt={user.username}
                  className="w-10 h-10 rounded-full bg-muted"
                />
                <div className="flex-1">
                  <p className="font-semibold text-sm">{user.username}</p>
                </div>
                <p className="font-bold text-sm text-accent">{user.points.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Navigation />
    </div>
  );
}
