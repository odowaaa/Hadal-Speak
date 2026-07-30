export type Language = "en" | "so";

export interface AppSettings {
  language: Language;
  darkMode: boolean;
  notifications: boolean;
  soundEffects: boolean;
  autoPlay: boolean;
}

const STORAGE_KEY = "hadal-speak.settings.v1";

export const defaultSettings: AppSettings = {
  language: "en",
  darkMode: false,
  notifications: true,
  soundEffects: true,
  autoPlay: true
};

export function readSettings(): AppSettings {
  if (typeof window === "undefined") return defaultSettings;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultSettings;
    return { ...defaultSettings, ...(JSON.parse(raw) as Partial<AppSettings>) };
  } catch {
    return defaultSettings;
  }
}

export function writeSettings(settings: AppSettings) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch {
    // localStorage may be unavailable (private browsing, quota, etc.)
  }
}
