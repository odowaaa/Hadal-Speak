import { useState, useEffect, useCallback } from "react";
import { Bell, X, Volume2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { textToSpeech } from "@/lib/audio";

interface NotificationReminderProps {
  language: 'en' | 'so';
  onClose: () => void;
  onSnooze: () => void;
}

export default function NotificationReminder({ language, onClose, onSnooze }: NotificationReminderProps) {
  const [hasSpoken, setHasSpoken] = useState(false);

  const reminderMessages = {
    en: {
      title: "Lesson Reminder",
      message: "Hey, what happened? You didn't attend your scheduled lesson.",
      spoken: "Hey, what happened? You didn't attend your scheduled lesson. Let's continue learning together!",
      buttons: {
        startLesson: "Start Lesson Now",
        snooze: "Remind Me Later",
        dismiss: "Not Today"
      }
    },
    so: {
      title: "Xusuusinta Cashar",
      message: "Haye maxaa kugu dhacay? Casharka maadan soo xaadirin.",
      spoken: "Haye maxaa kugu dhacay? Casharka maadan soo xaadirin. Aan sii wadno waxbarashada!",
      buttons: {
        startLesson: "Bilow Casharka Hadda",
        snooze: "I Xusuusi Markale",
        dismiss: "Maanta Maya"
      }
    }
  };

  const currentMessages = reminderMessages[language];

  const speakReminder = useCallback(async () => {
    if (!hasSpoken) {
      try {
        await textToSpeech(currentMessages.spoken, language);
        setHasSpoken(true);
      } catch (error) {
        console.log('Text-to-speech not available:', error);
        setHasSpoken(true);
      }
    }
  }, [currentMessages.spoken, language, hasSpoken]);

  useEffect(() => {
    // Speak the reminder after a short delay
    const timer = setTimeout(() => {
      speakReminder();
    }, 1000);

    return () => clearTimeout(timer);
  }, [speakReminder]);

  const handleStartLesson = () => {
    onClose();
    // Navigate to lessons page
    window.location.hash = '/lessons';
  };

  const handleSnooze = () => {
    onSnooze();
    onClose();
  };

  const handleReplayAudio = () => {
    setHasSpoken(false);
    speakReminder();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-sm bg-card border-border transition-colors duration-200 animate-in fade-in-0 zoom-in-95">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-full">
                <Bell className="h-5 w-5 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                {currentMessages.title}
              </h3>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="p-1 h-8 w-8 rounded-full hover:bg-muted"
            >
              <X className="h-4 w-4 text-muted-foreground" />
            </Button>
          </div>

          {/* Message */}
          <div className="mb-6">
            <p className="text-foreground text-center leading-relaxed">
              {currentMessages.message}
            </p>
            
            {/* Audio replay button */}
            <div className="flex justify-center mt-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleReplayAudio}
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                <Volume2 className="h-3 w-3 mr-1" />
                {language === 'en' ? 'Replay Audio' : 'Dib u ciyaar'}
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2">
            <Button
              onClick={handleStartLesson}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            >
              {currentMessages.buttons.startLesson}
            </Button>
            
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                onClick={handleSnooze}
                className="border-border hover:bg-muted"
              >
                {currentMessages.buttons.snooze}
              </Button>
              <Button
                variant="ghost"
                onClick={onClose}
                className="hover:bg-muted"
              >
                {currentMessages.buttons.dismiss}
              </Button>
            </div>
          </div>

          {/* Learning motivation */}
          <div className="mt-4 p-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg">
            <p className="text-xs text-center text-muted-foreground">
              {language === 'en' 
                ? '💪 Every lesson brings you closer to fluency!'
                : '💪 Cashar kasta wuxuu kuu soo dhoweeyaa ku hadashada!'
              }
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}