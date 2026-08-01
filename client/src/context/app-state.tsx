import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Lesson, UserProgress } from "@shared/schema";
import { lessonsData, getLessonsByLevel } from "@/lib/lessons-data";
import * as progressStore from "@/lib/progress-store";
import { defaultSettings, readSettings, writeSettings, type AppSettings, type Language } from "@/lib/settings-store";

interface AppState extends AppSettings {
  toggleLanguage: () => void;
  setLanguage: (language: Language) => void;
  toggleDarkMode: () => void;
  toggleNotifications: () => void;
  toggleSoundEffects: () => void;
  toggleAutoPlay: () => void;

  progress: UserProgress[];
  isLessonCompleted: (lessonId: string) => boolean;
  isLevelUnlocked: (level: number) => boolean;
  isLessonUnlocked: (lesson: Lesson) => boolean;
  getResumeLesson: (level: number) => Lesson | undefined;
  completeLesson: (lessonId: string, quizScore?: number | null) => void;
  resetProgress: () => void;

  completedLessonsCount: number;
  totalLessonsCount: number;
  overallProgressPercent: number;
  averageQuizScore: number;
  streak: number;
  weeklyCompletion: boolean[];
  completedThisWeek: number;
}

const AppStateContext = createContext<AppState | null>(null);

function computeStreak(progress: UserProgress[]): number {
  const completedDays = new Set(
    progress
      .filter((p) => p.completed && p.completedAt)
      .map((p) => new Date(p.completedAt as string).toDateString())
  );

  const cursor = new Date();
  if (!completedDays.has(cursor.toDateString())) {
    cursor.setDate(cursor.getDate() - 1);
  }

  let streak = 0;
  while (completedDays.has(cursor.toDateString())) {
    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

function computeWeeklyCompletion(progress: UserProgress[]): boolean[] {
  const completedDays = new Set(
    progress
      .filter((p) => p.completed && p.completedAt)
      .map((p) => new Date(p.completedAt as string).toDateString())
  );

  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());

  const days: boolean[] = [];
  for (let i = 0; i < 7; i++) {
    const day = new Date(startOfWeek);
    day.setDate(startOfWeek.getDate() + i);
    days.push(completedDays.has(day.toDateString()));
  }
  return days;
}

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<AppSettings>(defaultSettings);
  const [progress, setProgress] = useState<UserProgress[]>([]);

  useEffect(() => {
    setSettings(readSettings());
    setProgress(progressStore.getAllProgress());
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", settings.darkMode);
  }, [settings.darkMode]);

  useEffect(() => {
    const onProgressUpdated = () => setProgress(progressStore.getAllProgress());
    window.addEventListener("hadal-speak:progress-updated", onProgressUpdated);
    return () => window.removeEventListener("hadal-speak:progress-updated", onProgressUpdated);
  }, []);

  const updateSettings = useCallback((updates: Partial<AppSettings>) => {
    setSettings((prev) => {
      const next = { ...prev, ...updates };
      writeSettings(next);
      return next;
    });
  }, []);

  const setLanguage = useCallback((language: Language) => updateSettings({ language }), [updateSettings]);
  const toggleLanguage = useCallback(
    () => updateSettings({ language: settings.language === "en" ? "so" : "en" }),
    [settings.language, updateSettings]
  );
  const toggleDarkMode = useCallback(() => updateSettings({ darkMode: !settings.darkMode }), [settings.darkMode, updateSettings]);
  const toggleNotifications = useCallback(
    () => updateSettings({ notifications: !settings.notifications }),
    [settings.notifications, updateSettings]
  );
  const toggleSoundEffects = useCallback(
    () => updateSettings({ soundEffects: !settings.soundEffects }),
    [settings.soundEffects, updateSettings]
  );
  const toggleAutoPlay = useCallback(() => updateSettings({ autoPlay: !settings.autoPlay }), [settings.autoPlay, updateSettings]);

  const isLessonCompleted = useCallback(
    (lessonId: string) => progress.some((p) => p.lessonId === lessonId && p.completed),
    [progress]
  );

  // Levels unlock progressively: level N requires every lesson in level N-1
  // to be completed first. Lessons within a level unlock one at a time, in
  // order, so learners always encounter them "one after the other" rather
  // than being able to skip ahead to unfinished material.
  const isLevelUnlocked = useCallback(
    (level: number) => {
      if (level <= 1) return true;
      const previousLevelLessons = getLessonsByLevel(level - 1);
      return previousLevelLessons.length > 0 && previousLevelLessons.every((l) => isLessonCompleted(l.id));
    },
    [isLessonCompleted]
  );

  const isLessonUnlocked = useCallback(
    (lesson: Lesson) => {
      if (!isLevelUnlocked(lesson.level)) return false;
      if (lesson.lessonNumber <= 1) return true;
      const previousLesson = getLessonsByLevel(lesson.level).find((l) => l.lessonNumber === lesson.lessonNumber - 1);
      return previousLesson ? isLessonCompleted(previousLesson.id) : true;
    },
    [isLevelUnlocked, isLessonCompleted]
  );

  const getResumeLesson = useCallback(
    (level: number) => {
      const levelLessons = getLessonsByLevel(level);
      return levelLessons.find((l) => !isLessonCompleted(l.id)) ?? levelLessons[levelLessons.length - 1];
    },
    [isLessonCompleted]
  );

  const completeLesson = useCallback((lessonId: string, quizScore: number | null = null) => {
    progressStore.completeLesson(lessonId, quizScore);
    setProgress(progressStore.getAllProgress());
  }, []);

  const resetProgress = useCallback(() => {
    progressStore.resetProgress();
    setProgress([]);
  }, []);

  const derived = useMemo(() => {
    const completed = progress.filter((p) => p.completed);
    const totalLessonsCount = lessonsData.length;
    const completedLessonsCount = completed.length;
    const overallProgressPercent = totalLessonsCount > 0 ? Math.round((completedLessonsCount / totalLessonsCount) * 100) : 0;
    const scored = completed.filter((p) => typeof p.quizScore === "number");
    const averageQuizScore =
      scored.length > 0 ? Math.round(scored.reduce((sum, p) => sum + (p.quizScore ?? 0), 0) / scored.length) : 0;
    const weeklyCompletion = computeWeeklyCompletion(progress);

    return {
      totalLessonsCount,
      completedLessonsCount,
      overallProgressPercent,
      averageQuizScore,
      streak: computeStreak(progress),
      weeklyCompletion,
      completedThisWeek: weeklyCompletion.filter(Boolean).length
    };
  }, [progress]);

  const value: AppState = {
    ...settings,
    setLanguage,
    toggleLanguage,
    toggleDarkMode,
    toggleNotifications,
    toggleSoundEffects,
    toggleAutoPlay,
    progress,
    isLessonCompleted,
    isLevelUnlocked,
    isLessonUnlocked,
    getResumeLesson,
    completeLesson,
    resetProgress,
    ...derived
  };

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState(): AppState {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error("useAppState must be used within an AppStateProvider");
  }
  return context;
}
