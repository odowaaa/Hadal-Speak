import { useLocation } from "wouter";
import { ArrowLeft, BookOpen, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Header from "../components/header";
import BottomNav from "../components/bottom-nav";
import { useAppState } from "@/context/app-state";
import { getLessonsByLevel } from "@/lib/lessons-data";

export default function Lessons() {
  const [, setLocation] = useLocation();
  const { language, toggleLanguage, isLessonCompleted } = useAppState();

  const allLessons = [...getLessonsByLevel(1), ...getLessonsByLevel(2), ...getLessonsByLevel(3)];

  const getLevelColor = (level: number) => {
    switch (level) {
      case 1: return "bg-green-100 text-green-700";
      case 2: return "bg-blue-100 text-blue-700";
      case 3: return "bg-purple-100 text-purple-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getLevelName = (level: number) => {
    if (language === 'en') {
      switch (level) {
        case 1: return "Beginner";
        case 2: return "Intermediate";
        case 3: return "Advanced";
        default: return "Unknown";
      }
    } else {
      switch (level) {
        case 1: return "Bilaabaha";
        case 2: return "Dhexdhexaad";
        case 3: return "Sare";
        default: return "La garanayo";
      }
    }
  };

  return (
    <div className="min-h-screen bg-background transition-colors duration-200">
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
            className="p-2 rounded-lg bg-muted hover:bg-muted/80"
          >
            <ArrowLeft className="h-4 w-4 text-muted-foreground" />
          </Button>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-foreground">
              {language === 'en' ? 'All Lessons' : 'Dhammaan Casharrada'}
            </h2>
            <p className="text-sm text-muted-foreground">
              {language === 'en' ? `${allLessons.length} lessons available` : `${allLessons.length} cashar la heli karo`}
            </p>
          </div>
        </div>

        {/* Lessons List */}
        <div className="space-y-4">
          {allLessons.map((lesson) => (
            <Card key={lesson.id} className="p-4 shadow-sm border border-border">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    {isLessonCompleted(lesson.id) ? (
                      <Check className="h-5 w-5 text-green-600" />
                    ) : (
                      <BookOpen className="h-5 w-5 text-blue-600" />
                    )}
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-foreground">{lesson.title}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${getLevelColor(lesson.level)}`}>
                      {language === 'en' ? `Level ${lesson.level}` : `Heer ${lesson.level}`} - {getLevelName(lesson.level)}
                    </span>
                  </div>

                  <p className="text-sm text-muted-foreground mb-2">{lesson.english}</p>
                  <p className="text-sm text-cultural mb-3">{lesson.somali}</p>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {language === 'en' ? `Lesson ${lesson.lessonNumber}` : `Cashar ${lesson.lessonNumber}`}
                    </span>

                    <Button
                      onClick={() => setLocation(`/lesson/${lesson.level}/${lesson.id}`)}
                      size="sm"
                      className="text-xs"
                    >
                      {isLessonCompleted(lesson.id)
                        ? (language === 'en' ? 'Review' : 'Dib u eeg')
                        : (language === 'en' ? 'Start' : 'Bilow')
                      }
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>

      <BottomNav currentPage="lessons" language={language} />
    </div>
  );
}
