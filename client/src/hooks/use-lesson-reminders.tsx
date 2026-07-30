import { useState, useEffect, useCallback } from "react";
import { getAllProgress } from "@/lib/progress-store";

interface LessonReminderSettings {
  enabled: boolean;
  scheduledTime: string; // HH:MM format
  snoozeMinutes: number;
}

interface UseLessonRemindersReturn {
  showReminder: boolean;
  reminderSettings: LessonReminderSettings;
  updateReminderSettings: (settings: Partial<LessonReminderSettings>) => void;
  dismissReminder: () => void;
  snoozeReminder: () => void;
}

function hasCompletedLessonToday(): boolean {
  const today = new Date().toDateString();
  return getAllProgress().some(
    (p) => p.completed && p.completedAt && new Date(p.completedAt).toDateString() === today
  );
}

export function useLessonReminders(): UseLessonRemindersReturn {
  const [showReminder, setShowReminder] = useState(false);
  const [reminderSettings, setReminderSettings] = useState<LessonReminderSettings>({
    enabled: true,
    scheduledTime: "18:00", // Default 6 PM
    snoozeMinutes: 30
  });

  // Load settings from localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem('lessonReminderSettings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setReminderSettings(prev => ({ ...prev, ...parsed }));
      } catch (error) {
        console.log('Error loading reminder settings:', error);
      }
    }
  }, []);

  // Save settings to localStorage
  const updateReminderSettings = useCallback((newSettings: Partial<LessonReminderSettings>) => {
    setReminderSettings(prev => {
      const updated = { ...prev, ...newSettings };
      localStorage.setItem('lessonReminderSettings', JSON.stringify(updated));
      return updated;
    });
  }, []);

  // Check if user should be reminded
  const checkForReminder = useCallback(() => {
    if (!reminderSettings.enabled) return;

    const now = new Date();
    const today = now.toDateString();

    // Never nag a brand-new user before they've had a chance to open the app.
    const firstOpenKey = 'hadalSpeakFirstOpenDate';
    let firstOpenDate = localStorage.getItem(firstOpenKey);
    if (!firstOpenDate) {
      firstOpenDate = today;
      localStorage.setItem(firstOpenKey, firstOpenDate);
    }
    if (firstOpenDate === today) return;

    // Only remind once the user's scheduled study time has actually passed.
    const [scheduledHour, scheduledMinute] = reminderSettings.scheduledTime.split(':').map(Number);
    const scheduledDateTime = new Date();
    scheduledDateTime.setHours(scheduledHour, scheduledMinute, 0, 0);
    const isAfterScheduledTime = now >= scheduledDateTime;

    // Check if we're in snooze period
    const snoozeKey = `lessonReminderSnooze_${today}`;
    const snoozeUntil = localStorage.getItem(snoozeKey);
    const isInSnooze = snoozeUntil && new Date() < new Date(snoozeUntil);

    // Show reminder if:
    // 1. It's after the user's scheduled study time
    // 2. User hasn't completed a lesson today
    // 3. Not in snooze period
    // 4. Haven't already shown the reminder today
    const reminderShownKey = `lessonReminderShown_${today}`;
    const reminderShownToday = localStorage.getItem(reminderShownKey) === 'true';

    if (isAfterScheduledTime && !hasCompletedLessonToday() && !isInSnooze && !reminderShownToday) {
      setShowReminder(true);
      localStorage.setItem(reminderShownKey, 'true');
    }
  }, [reminderSettings]);

  // Check for reminders every minute
  useEffect(() => {
    if (!reminderSettings.enabled) return;

    // Initial check
    checkForReminder();

    // Set up interval to check every minute
    const interval = setInterval(checkForReminder, 60000);

    return () => clearInterval(interval);
  }, [checkForReminder, reminderSettings.enabled]);

  const dismissReminder = useCallback(() => {
    setShowReminder(false);
  }, []);

  const snoozeReminder = useCallback(() => {
    const now = new Date();
    const snoozeUntil = new Date(now.getTime() + reminderSettings.snoozeMinutes * 60000);
    const today = now.toDateString();

    localStorage.setItem(`lessonReminderSnooze_${today}`, snoozeUntil.toISOString());
    localStorage.removeItem(`lessonReminderShown_${today}`); // Allow showing again after snooze
    setShowReminder(false);
  }, [reminderSettings.snoozeMinutes]);

  return {
    showReminder,
    reminderSettings,
    updateReminderSettings,
    dismissReminder,
    snoozeReminder
  };
}
