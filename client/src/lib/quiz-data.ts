import type { QuizQuestion } from "@shared/schema";
import { lessonsData } from "./lessons-data";

// Small seeded PRNG (mulberry32) so quiz option order/distractors are
// stable across renders and app restarts, but still differ lesson to lesson.
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hashString(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = (hash * 31 + value.charCodeAt(i)) | 0;
  }
  return hash;
}

function shuffle<T>(items: T[], random: () => number): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

// Pool of every Somali translation across all lessons, used to build
// plausible wrong answers instead of literal placeholder strings.
const allSomaliWords = Array.from(
  new Set(lessonsData.flatMap((lesson) => Object.values(lesson.keyWords)))
);

function buildQuestion(
  lessonId: string,
  englishWord: string,
  somaliWord: string,
  index: number
): QuizQuestion {
  const random = mulberry32(hashString(`${lessonId}-${englishWord}-${index}`));

  const distractorPool = allSomaliWords.filter((word) => word !== somaliWord);
  const distractors = shuffle(distractorPool, random).slice(0, 2);
  const options = shuffle([somaliWord, ...distractors], random);

  return {
    id: `${lessonId}-quiz-${index}`,
    lessonId,
    question: `How do you say "${englishWord}" in Somali?`,
    options,
    correctAnswer: options.indexOf(somaliWord)
  };
}

const MAX_QUESTIONS_PER_LESSON = 4;

export const quizByLessonId: Record<string, QuizQuestion[]> = Object.fromEntries(
  lessonsData.map((lesson) => {
    const entries = Object.entries(lesson.keyWords).slice(0, MAX_QUESTIONS_PER_LESSON);
    const questions = entries.map(([english, somali], index) =>
      buildQuestion(lesson.id, english, somali, index)
    );
    return [lesson.id, questions];
  })
);

export function getQuizForLesson(lessonId: string): QuizQuestion[] {
  return quizByLessonId[lessonId] ?? [];
}
