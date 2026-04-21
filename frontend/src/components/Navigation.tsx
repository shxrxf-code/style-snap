'use client';

import { Home, Compass, Plus, User, Crown } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { name: 'Feed', href: '/', icon: Home },
  { name: 'Explore', href: '/explore', icon: Compass },
  { name: 'Post', href: '/post', icon: Plus },
  { name: 'Profile', href: '/profile', icon: User },
  { name: 'Premium', href: '/premium', icon: Crown },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-black border-t border-[#111111] backdrop-blur-md z-50">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto relative">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          const isPost = item.name === 'Post';
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center justify-center w-full h-full transition-all duration-150 ease-in-out ${
                isPost ? 'relative' : ''
              }`}
            >
              {isPost ? (
                // Floating Post button with white background
                <div className="relative -top-3">
                  <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all duration-150 ease-in-out">
                    <Icon className="w-7 h-7 text-black" strokeWidth={2} />
                  </div>
                </div>
              ) : (
                // Regular navigation items with monochrome styling
                <>
                  <Icon 
                    className={`w-6 h-6 mb-1 transition-all duration-150 ease-in-out ${
                      isActive 
                        ? 'text-white scale-110' 
                        : 'text-[#52525B] hover:text-[#737373]'
                    }`}
                    strokeWidth={1.75}
                    style={isActive ? { filter: 'drop-shadow(0 0 6px rgba(255,255,255,0.15))' } : {}}
                  />
                  <span className={`text-xs font-medium transition-all duration-150 ease-in-out ${
                    isActive ? 'text-white' : 'text-[#52525B]'
                  }`}>
                    {item.name}
                  </span>
                </>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
