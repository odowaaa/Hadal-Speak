import { Home, Book, Mic, TrendingUp, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

interface BottomNavProps {
  currentPage: string;
  language: string;
}

export default function BottomNav({ currentPage, language }: BottomNavProps) {
  const [, setLocation] = useLocation();

  const navItems = [
    {
      id: 'home',
      icon: Home,
      label: language === 'en' ? 'Home' : 'Guriga',
      path: '/'
    },
    {
      id: 'lessons',
      icon: Book,
      label: language === 'en' ? 'Lessons' : 'Casharro',
      path: '/lessons'
    },
    {
      id: 'practice',
      icon: Mic,
      label: language === 'en' ? 'Practice' : 'Ku celi',
      path: '/practice'
    },
    {
      id: 'progress',
      icon: TrendingUp,
      label: language === 'en' ? 'Progress' : 'Horumar',
      path: '/progress'
    },
    {
      id: 'profile',
      icon: User,
      label: language === 'en' ? 'Profile' : 'Profile',
      path: '/profile'
    }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border py-2">
      <div className="max-w-md mx-auto px-4">
        <div className="flex justify-around">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            
            return (
              <Button
                key={item.id}
                variant="ghost"
                onClick={() => setLocation(item.path)}
                className={`flex flex-col items-center py-2 px-3 ${
                  isActive ? 'text-primary' : 'text-muted-foreground hover:text-muted-foreground'
                }`}
              >
                <Icon className="h-5 w-5 mb-1" />
                <span className="text-xs font-medium">{item.label}</span>
              </Button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
