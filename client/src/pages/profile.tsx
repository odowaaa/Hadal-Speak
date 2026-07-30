import { useState } from "react";
import { useLocation } from "wouter";
import { ArrowLeft, Settings, Globe, Moon, Sun, Bell, HelpCircle, LogOut, Cog, UserCircle2, GraduationCap, Trophy, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import Header from "../components/header";
import BottomNav from "../components/bottom-nav";
import AdvancedSettings from "../components/advanced-settings";
import AboutModal from "../components/about-modal";
import { useLessonReminders } from "../hooks/use-lesson-reminders";
import { useAppState } from "@/context/app-state";

export default function Profile() {
  const [, setLocation] = useLocation();
  const {
    language,
    toggleLanguage,
    darkMode,
    toggleDarkMode,
    notifications,
    toggleNotifications,
    soundEffects,
    toggleSoundEffects,
    autoPlay,
    toggleAutoPlay,
    completedLessonsCount,
    averageQuizScore,
    streak,
    resetProgress
  } = useAppState();

  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);
  const [showAbout, setShowAbout] = useState(false);

  const { reminderSettings, updateReminderSettings } = useLessonReminders();

  const handleResetProgress = () => {
    const confirmed = window.confirm(
      language === 'en'
        ? 'This will erase all your lesson progress and quiz scores. Are you sure?'
        : 'Tani waxay tirtiri doontaa dhammaan horumarkaaga iyo dhibcaha imtixaanka. Ma hubtaa?'
    );
    if (confirmed) {
      resetProgress();
    }
  };

  const profileStats = [
    {
      label: language === 'en' ? 'Lessons Completed' : 'Casharrada la dhammaystiray',
      value: `${completedLessonsCount}`,
      icon: '📚'
    },
    {
      label: language === 'en' ? 'Current Streak' : 'Joogitaanka hadda',
      value: `${streak} ${language === 'en' ? 'days' : 'maalmood'}`,
      icon: '🔥'
    },
    {
      label: language === 'en' ? 'Quiz Average' : 'Celceliska imtixaanka',
      value: `${averageQuizScore}%`,
      icon: '🎯'
    }
  ];

  const menuItems = [
    {
      icon: Globe,
      label: language === 'en' ? 'Language Preference' : 'Doorashada Luqadda',
      value: language === 'en' ? 'English' : 'Soomaali',
      action: toggleLanguage,
      type: 'action' as const
    },
    {
      icon: Bell,
      label: language === 'en' ? 'Notifications' : 'Ogeysiisyada',
      value: notifications,
      action: toggleNotifications,
      type: 'toggle' as const
    },
    {
      icon: darkMode ? Sun : Moon,
      label: language === 'en' ? 'Dark Mode' : 'Muuqaalka Madow',
      value: darkMode,
      action: toggleDarkMode,
      type: 'toggle' as const
    },
    {
      icon: Settings,
      label: language === 'en' ? 'Sound Effects' : 'Saameynta Dhawaqa',
      value: soundEffects,
      action: toggleSoundEffects,
      type: 'toggle' as const
    },
    {
      icon: Settings,
      label: language === 'en' ? 'Auto-play Audio' : 'Dhawaq-toos-u-ciyaarista',
      value: autoPlay,
      action: toggleAutoPlay,
      type: 'toggle' as const
    },
    {
      icon: Bell,
      label: language === 'en' ? 'Lesson Reminders' : 'Xusuusinta Cashar',
      value: reminderSettings.enabled,
      action: () => updateReminderSettings({ enabled: !reminderSettings.enabled }),
      type: 'toggle' as const
    },
    {
      icon: Cog,
      label: language === 'en' ? 'Advanced Settings' : 'Dejinta Horumarsan',
      value: '',
      action: () => setShowAdvancedSettings(!showAdvancedSettings),
      type: 'action' as const
    }
  ];

  const supportItems = [
    {
      icon: HelpCircle,
      label: language === 'en' ? 'Help & Support' : 'Caawino & Taageerada',
      action: () => {
        const message = language === 'en'
          ? 'Hello! I need help with Hadal English app.'
          : 'Salaan! Waxaan u baahan ahay caawimo app-ka Hadal English.';
        window.open(`https://wa.me/252616538992?text=${encodeURIComponent(message)}`, '_blank');
      }
    },
    {
      icon: Settings,
      label: language === 'en' ? 'About Hadal English' : 'Ku saabsan Hadal English',
      action: () => setShowAbout(true)
    },
    {
      icon: Settings,
      label: language === 'en' ? 'Privacy Policy' : 'Siyaasadda Sirta',
      action: () => setLocation('/privacy-policy')
    },
    {
      icon: LogOut,
      label: language === 'en' ? 'Reset Progress' : 'Dib u deji horumarinta',
      action: handleResetProgress,
      danger: true
    }
  ];

  return (
    <div className="min-h-screen bg-background dark:bg-background transition-colors duration-200">
      <Header
        user={{ id: "local", username: "demo", language }}
        onLanguageToggle={toggleLanguage}
      />

      <main className="max-w-md mx-auto px-4 py-6 space-y-6 pb-24">
        {/* Header */}
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLocation('/')}
            className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors duration-200"
          >
            <ArrowLeft className="h-4 w-4 text-muted-foreground" />
          </Button>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-foreground">
              {language === 'en' ? 'Profile' : 'Wasiirka'}
            </h2>
            <p className="text-sm text-muted-foreground">
              {language === 'en' ? 'Manage your learning experience' : 'Maamul waayo-aragnimada waxbarashadaada'}
            </p>
          </div>
        </div>

        {/* Profile Info */}
        <Card className="p-6 shadow-sm border-border bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 transition-colors duration-200">
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                <UserCircle2 className="h-12 w-12 text-white" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-3 border-white flex items-center justify-center">
                <GraduationCap className="h-3 w-3 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="text-xl font-bold text-foreground">
                  {language === 'en' ? 'Learner' : 'Ardayga'}
                </h3>
                <Trophy className="h-4 w-4 text-yellow-500" />
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                {language === 'en' ? 'English Language Student' : 'Ardayga Luqadda Ingiriisiga'}
              </p>
              <div className="flex items-center space-x-2">
                <span className="text-xs px-3 py-1 bg-green-100 text-green-700 rounded-full font-medium">
                  {language === 'en' ? 'Active Learner' : 'Ardayga Firfircoon'}
                </span>
                <span className="text-xs px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">
                  {language === 'en' ? `${streak} Day Streak` : `${streak} Maalmood oo Joogto ah`}
                </span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            {profileStats.map((stat, index) => (
              <div key={index} className="text-center p-3 bg-muted dark:bg-gray-800 rounded-lg transition-colors duration-200">
                <div className="text-2xl mb-1">{stat.icon}</div>
                <p className="text-lg font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Settings */}
        <Card className="p-6 shadow-sm border-border bg-card transition-colors duration-200">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            {language === 'en' ? 'Settings' : 'Dejinta'}
          </h3>
          <div className="space-y-4">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="flex items-center justify-between py-2">
                  <div className="flex items-center space-x-3">
                    <Icon className="h-5 w-5 text-muted-foreground" />
                    <span className="text-foreground">{item.label}</span>
                  </div>
                  {item.type === 'toggle' ? (
                    <Switch
                      checked={Boolean(item.value)}
                      onCheckedChange={item.action}
                    />
                  ) : (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={item.action}
                      className="text-primary"
                    >
                      {typeof item.value === 'string' && item.value ? item.value : 'Change'}
                    </Button>
                  )}
                </div>
              );
            })}
          </div>
        </Card>

        {/* Support & Info */}
        <Card className="p-6 shadow-sm border-border bg-card transition-colors duration-200">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            {language === 'en' ? 'Support & Information' : 'Taageerada & Macluumaadka'}
          </h3>
          <div className="space-y-3">
            {supportItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <Button
                  key={index}
                  variant="ghost"
                  onClick={item.action}
                  className={`w-full justify-start p-3 h-auto transition-colors duration-200 ${
                    item.danger ? 'text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20' : 'text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  {item.label}
                </Button>
              );
            })}
          </div>
        </Card>

        {/* Advanced Settings */}
        {showAdvancedSettings && (
          <AdvancedSettings
            language={language}
            onClose={() => setShowAdvancedSettings(false)}
          />
        )}

        {/* App Info */}
        <Card className="p-4 shadow-sm border-border bg-card text-center transition-colors duration-200">
          <div className="text-cultural mb-2 flex justify-center">
            <MessageCircle className="h-7 w-7" />
          </div>
          <h4 className="font-semibold text-foreground">Hadal English</h4>
          <p className="text-xs text-muted-foreground mt-1">
            {language === 'en' ? 'Version 1.0.0' : 'Nooca 1.0.0'}
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            {language === 'en'
              ? 'Made with ❤️ for Somali speakers learning English'
              : 'Lagu sameeyay ❤️ dadka Soomaaliyeed ee baraysa Ingiriisiga'
            }
          </p>
          <div className="mt-3 pt-2 border-t border-border space-y-1">
            <button
              onClick={() => window.open('https://wa.me/252616538992', '_blank')}
              className="text-xs text-green-600 hover:text-green-700 transition-colors flex items-center justify-center"
            >
              <span className="mr-1">📱</span>
              {language === 'en' ? 'Contact Developer' : 'La xiriir Horumariyaha'}
            </button>
            <button
              onClick={() => window.open('mailto:odowaa1996@gmail.com', '_blank')}
              className="text-xs text-blue-600 hover:text-blue-700 transition-colors flex items-center justify-center"
            >
              <span className="mr-1">✉️</span>
              odowaa1996@gmail.com
            </button>
          </div>
        </Card>

        <AboutModal
          isOpen={showAbout}
          onClose={() => setShowAbout(false)}
          language={language}
        />
      </main>

      <BottomNav currentPage="profile" language={language} />
    </div>
  );
}
