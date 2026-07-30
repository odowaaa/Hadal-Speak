import type { UserProgress } from "@shared/schema";

const STORAGE_KEY = "hadal-speak.progress.v1";

type ProgressMap = Record<string, UserProgress>;

function readAll(): ProgressMap {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ProgressMap) : {};
  } catch {
    return {};
  }
}

function writeAll(data: ProgressMap) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    // Notify other hook instances (e.g. other components) in this tab.
    window.dispatchEvent(new Event("hadal-speak:progress-updated"));
  } catch {
    // localStorage may be unavailable (private browsing, quota, etc.)
  }
}

export function getAllProgress(): UserProgress[] {
  return Object.values(readAll());
}

export function getLessonProgress(lessonId: string): UserProgress | undefined {
  return readAll()[lessonId];
}

export function completeLesson(lessonId: string, quizScore: number | null = null): UserProgress {
  const all = readAll();
  const entry: UserProgress = {
    lessonId,
    completed: true,
    quizScore,
    completedAt: new Date().toISOString()
  };
  all[lessonId] = entry;
  writeAll(all);
  return entry;
}

export function resetProgress() {
  writeAll({});
}
