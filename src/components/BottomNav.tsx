import { Home, Search, PlusCircle, MessageSquare, User } from 'lucide-react';
import { Badge } from './ui/badge';

interface BottomNavProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  unreadMessages?: number;
}

export function BottomNav({ currentPage, onNavigate, unreadMessages = 0 }: BottomNavProps) {
  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'browse', icon: Search, label: 'Search' },
    { id: 'add-tool', icon: PlusCircle, label: 'Add Tool' },
    { id: 'messages', icon: MessageSquare, label: 'Messages', badge: unreadMessages },
    { id: 'dashboard', icon: User, label: 'Account' },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t z-50 safe-area-inset-bottom">
      <div className="grid grid-cols-5 h-16">
        {navItems.map((item) => {
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center justify-center gap-1 transition-colors relative ${
                isActive ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <item.icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : ''}`} />
              <span className="text-xs">{item.label}</span>
              {item.badge && item.badge > 0 && (
                <Badge className="absolute top-2 right-1/4 bg-red-500 h-4 px-1 text-xs min-w-4">
                  {item.badge > 9 ? '9+' : item.badge}
                </Badge>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
