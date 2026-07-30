import { useLocation, useParams } from "wouter";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
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
  const { language, toggleLanguage, isLessonCompleted, completeLesson } = useAppState();

  const level = parseInt(params.level || "1");
  const lessonId = params.lessonId || "";

  const levelLessons = getLessonsByLevel(level);
  const currentLesson = getLessonById(lessonId);
  const quizQuestions = getQuizForLesson(lessonId);

  const currentLessonIndex = levelLessons.findIndex((l) => l.id === lessonId);
  const isCompleted = isLessonCompleted(lessonId);

  const handleNext = () => {
    const nextIndex = currentLessonIndex + 1;
    if (nextIndex < levelLessons.length) {
      setLocation(`/lesson/${level}/${levelLessons[nextIndex].id}`);
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

        {/* Navigation */}
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
            disabled={currentLessonIndex === levelLessons.length - 1}
            className="flex-1"
          >
            {language === 'en' ? 'Next' : 'Xiga'}
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>

        {/* Quiz Section */}
        {quizQuestions.length > 0 && (
          <Quiz
            questions={quizQuestions}
            onComplete={handleQuizComplete}
            language={language}
          />
        )}
      </main>

      <BottomNav currentPage="lessons" language={language} />
    </div>
  );
}
