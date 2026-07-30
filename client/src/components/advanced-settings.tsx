import { useState } from "react";
import { Settings, Volume2, Mic, Bell, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";

interface AdvancedSettingsProps {
  language: 'en' | 'so';
  onClose: () => void;
}

export default function AdvancedSettings({ language, onClose }: AdvancedSettingsProps) {
  const [audioSettings, setAudioSettings] = useState({
    speechSpeed: 80,
    speechVolume: 100,
    autoPlay: true,
    voiceGender: 'female' as 'male' | 'female',
  });

  const [learningSettings, setLearningSettings] = useState({
    difficultyLevel: 'adaptive' as 'easy' | 'normal' | 'hard' | 'adaptive',
    pronunciationSensitivity: 70,
    culturalTips: true,
    repetitionMode: true,
  });

  const [notificationSettings, setNotificationSettings] = useState({
    dailyReminders: true,
    streakAlerts: true,
    achievementNotifications: true,
    studyTimeReminder: '18:00',
  });

  const handleAudioChange = (key: string, value: any) => {
    const newSettings = { ...audioSettings, [key]: value };
    setAudioSettings(newSettings);
    console.log('Audio settings updated:', { audio: newSettings });
  };

  const handleLearningChange = (key: string, value: any) => {
    const newSettings = { ...learningSettings, [key]: value };
    setLearningSettings(newSettings);
    console.log('Learning settings updated:', { learning: newSettings });
  };

  const handleNotificationChange = (key: string, value: any) => {
    const newSettings = { ...notificationSettings, [key]: value };
    setNotificationSettings(newSettings);
    console.log('Notification settings updated:', { notifications: newSettings });
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto bg-card border-border transition-colors duration-200">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Settings className="h-5 w-5 text-blue-600" />
              <h2 className="text-xl font-bold text-foreground">
                {language === 'en' ? 'Advanced Settings' : 'Dejinta Horumarsan'}
              </h2>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-muted transition-colors duration-200"
            >
              <X className="h-4 w-4 text-muted-foreground" />
            </Button>
          </div>

          <div className="space-y-6">
            {/* Audio Settings */}
            <Card className="p-4 bg-card border-border transition-colors duration-200">
              <div className="flex items-center space-x-2 mb-4">
                <Volume2 className="h-5 w-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-foreground">
                  {language === 'en' ? 'Audio Settings' : 'Dejinta Dhawaqa'}
                </h3>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium text-foreground">
                      {language === 'en' ? 'Speech Speed' : 'Xawaaraha Hadalka'}
                    </label>
                    <span className="text-sm text-muted-foreground">{audioSettings.speechSpeed}%</span>
                  </div>
                  <Slider
                    value={[audioSettings.speechSpeed]}
                    onValueChange={(value) => handleAudioChange('speechSpeed', value[0])}
                    max={150}
                    min={50}
                    step={10}
                    className="w-full"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium text-foreground">
                      {language === 'en' ? 'Volume' : 'Codka'}
                    </label>
                    <span className="text-sm text-muted-foreground">{audioSettings.speechVolume}%</span>
                  </div>
                  <Slider
                    value={[audioSettings.speechVolume]}
                    onValueChange={(value) => handleAudioChange('speechVolume', value[0])}
                    max={100}
                    min={0}
                    step={5}
                    className="w-full"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-foreground">
                    {language === 'en' ? 'Auto-play Audio' : 'Dhawaq-toos-u-ciyaarista'}
                  </label>
                  <Switch
                    checked={audioSettings.autoPlay}
                    onCheckedChange={(value) => handleAudioChange('autoPlay', value)}
                  />
                </div>
              </div>
            </Card>

            {/* Learning Settings */}
            <Card className="p-4 bg-card border-border transition-colors duration-200">
              <div className="flex items-center space-x-2 mb-4">
                <Mic className="h-5 w-5 text-green-600" />
                <h3 className="text-lg font-semibold text-foreground">
                  {language === 'en' ? 'Learning Settings' : 'Dejinta Waxbarasho'}
                </h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-foreground">
                    {language === 'en' ? 'Cultural Tips' : 'Tilmaamaha Dhaqanka'}
                  </label>
                  <Switch
                    checked={learningSettings.culturalTips}
                    onCheckedChange={(value) => handleLearningChange('culturalTips', value)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-foreground">
                    {language === 'en' ? 'Repetition Mode' : 'Habka Ku-celinta'}
                  </label>
                  <Switch
                    checked={learningSettings.repetitionMode}
                    onCheckedChange={(value) => handleLearningChange('repetitionMode', value)}
                  />
                </div>
              </div>
            </Card>

            {/* Notification Settings */}
            <Card className="p-4 bg-card border-border transition-colors duration-200">
              <div className="flex items-center space-x-2 mb-4">
                <Bell className="h-5 w-5 text-purple-600" />
                <h3 className="text-lg font-semibold text-foreground">
                  {language === 'en' ? 'Notifications' : 'Ogeysiisyada'}
                </h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-foreground">
                    {language === 'en' ? 'Daily Study Reminders' : 'Xusuusinta Waxbarasho ee Maalinta'}
                  </label>
                  <Switch
                    checked={notificationSettings.dailyReminders}
                    onCheckedChange={(value) => handleNotificationChange('dailyReminders', value)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-foreground">
                    {language === 'en' ? 'Streak Alerts' : 'Digniinta Joogitaanka'}
                  </label>
                  <Switch
                    checked={notificationSettings.streakAlerts}
                    onCheckedChange={(value) => handleNotificationChange('streakAlerts', value)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-foreground">
                    {language === 'en' ? 'Achievement Notifications' : 'Ogeysiinta Guulaha'}
                  </label>
                  <Switch
                    checked={notificationSettings.achievementNotifications}
                    onCheckedChange={(value) => handleNotificationChange('achievementNotifications', value)}
                  />
                </div>
              </div>
            </Card>

            {/* Close Button */}
            <div className="pt-4 border-t border-border">
              <Button
                onClick={onClose}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                {language === 'en' ? 'Save Settings' : 'Kaydi Dejinta'}
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}