import { Languages, User, UserCircle2, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  user: {
    id: string;
    username: string;
    language: string;
  };
  onLanguageToggle: () => void;
}

export default function Header({ user, onLanguageToggle }: HeaderProps) {
  return (
    <header className="bg-card shadow-sm border-b border-border">
      <div className="max-w-md mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-700 rounded-xl flex items-center justify-center shadow-md">
              <span className="text-white text-lg font-bold">H</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Hadal English</h1>
              <p className="text-xs text-muted-foreground">
                {user.language === 'en' ? 'Learn English' : 'Barashada Ingiriisiga'}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={onLanguageToggle}
              className="p-2 rounded-lg bg-muted hover:bg-muted"
            >
              <Languages className="h-4 w-4 text-muted-foreground" />
            </Button>
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-md">
                <UserCircle2 className="h-6 w-6 text-white" />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                <GraduationCap className="h-2 w-2 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
