import { useEffect } from "react";
import { useLocation, useParams } from "wouter";
import { ArrowLeft, ChevronLeft, ChevronRight, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "../components/header";
import LessonCard from "../components/lesson-card";
import Quiz from "../components/quiz";
import BottomNav from "../components/bottom-nav";
import { useAppState } from "@/context/app-state";
import { getLessonById, getLessonsByLevel } from "@/lib/lessons-data";
import { getQuizForLesson } from "@/lib/quiz-data";

export default function LessonPage() {
  const params = useParams<{ level: string; lessonId: string }>();
  const [, setLocation] = useLocation();
  const { language, toggleLanguage, isLessonCompleted, isLessonUnlocked, completeLesson } = useAppState();

  const level = parseInt(params.level || "1");
  const lessonId = params.lessonId || "";

  const levelLessons = getLessonsByLevel(level);
  const currentLesson = getLessonById(lessonId);
  const quizQuestions = getQuizForLesson(lessonId);

  const currentLessonIndex = levelLessons.findIndex((l) => l.id === lessonId);
  const isCompleted = isLessonCompleted(lessonId);
  const unlocked = currentLesson ? isLessonUnlocked(currentLesson) : false;

  // Guard against deep-linking (typed URL, old bookmark, etc.) straight into
  // a lesson the learner hasn't reached yet in the sequential unlock order.
  useEffect(() => {
    if (currentLesson && !unlocked) {
      setLocation("/lessons", { replace: true });
    }
  }, [currentLesson, unlocked, setLocation]);

  const nextLesson = currentLessonIndex >= 0 ? levelLessons[currentLessonIndex + 1] : undefined;
  const canGoNext = !!nextLesson && isLessonUnlocked(nextLesson);

  const handleNext = () => {
    if (nextLesson) {
      setLocation(`/lesson/${level}/${nextLesson.id}`);
    } else {
      setLocation('/');
    }
  };

  const handlePrevious = () => {
    const prevIndex = currentLessonIndex - 1;
    if (prevIndex >= 0) {
      setLocation(`/lesson/${level}/${levelLessons[prevIndex].id}`);
    }
  };

  const handleQuizComplete = (score: number) => {
    const percentage = Math.round((score / quizQuestions.length) * 100);
    completeLesson(lessonId, percentage);
  };

  if (!currentLesson) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">
          {language === 'en' ? 'Lesson not found.' : 'Casharka lama helin.'}
        </p>
      </div>
    );
  }

  if (!unlocked) {
    // Briefly shown while the redirect effect above kicks in.
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <p className="text-muted-foreground flex items-center">
          <Lock className="h-4 w-4 mr-2" />
          {language === 'en' ? 'This lesson is locked.' : 'Casharkan waa xiran yahay.'}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background transition-colors duration-200">
      <Header
        user={{ id: "local", username: "demo", language }}
        onLanguageToggle={toggleLanguage}
      />

      <main className="max-w-md mx-auto px-4 py-6 space-y-6 pb-24">
        {/* Lesson Header */}
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLocation('/')}
            className="p-2 rounded-lg bg-muted hover:bg-muted/80"
          >
            <ArrowLeft className="h-4 w-4 text-muted-foreground" />
          </Button>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-foreground">
              {language === 'en' ? `Level ${level}: ${level === 1 ? 'Beginner' : level === 2 ? 'Intermediate' : 'Advanced'}` : `Heer ${level}`}
            </h2>
            <p className="text-sm text-muted-foreground">
              {language === 'en' ? `Lesson ${currentLessonIndex + 1} of ${levelLessons.length}` : `Cashar ${currentLessonIndex + 1} oo ka mid ah ${levelLessons.length}`}
            </p>
          </div>
        </div>

        {/* Lesson Content */}
        <LessonCard
          lesson={currentLesson}
          isCompleted={isCompleted}
          language={language}
        />

        {/* Quiz Section */}
        {quizQuestions.length > 0 && (
          <Quiz
            questions={quizQuestions}
            onComplete={handleQuizComplete}
            language={language}
          />
        )}

        {/* Navigation - placed after the quiz so "Next" is reachable right
            after finishing it, instead of requiring a scroll back up */}
        <div className="flex space-x-3 pt-4">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentLessonIndex === 0}
            className="flex-1"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            {language === 'en' ? 'Previous' : 'Hore'}
          </Button>
          <Button
            onClick={handleNext}
            disabled={!!nextLesson && !canGoNext}
            className="flex-1"
          >
            {nextLesson
              ? (language === 'en' ? 'Next' : 'Xiga')
              : (language === 'en' ? 'Finish' : 'Dhammee')}
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
        {!!nextLesson && !canGoNext && (
          <p className="text-xs text-center text-muted-foreground -mt-4">
            {language === 'en'
              ? 'Complete the quiz above to unlock the next lesson'
              : 'Dhammayso imtixaanka kor ku yaal si aad u furto casharka xiga'}
          </p>
        )}
      </main>

      <BottomNav currentPage="lessons" language={language} />
    </div>
  );
}
