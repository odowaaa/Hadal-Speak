import { useLocation } from "wouter";
import { Trophy, Target, Calendar, Award, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Header from "../components/header";
import BottomNav from "../components/bottom-nav";
import StudyStreak from "../components/study-streak";
import LessonProgressBar from "../components/lesson-progress-bar";
import { useAppState } from "@/context/app-state";
import { getLessonById, getLessonsByLevel } from "@/lib/lessons-data";
import { ArrowLeft } from "lucide-react";

export default function Progress() {
  const [, setLocation] = useLocation();
  const {
    language,
    toggleLanguage,
    progress,
    isLessonCompleted,
    completedLessonsCount,
    totalLessonsCount,
    overallProgressPercent,
    averageQuizScore,
    streak,
    completedThisWeek
  } = useAppState();

  const level1Lessons = getLessonsByLevel(1);
  const level2Lessons = getLessonsByLevel(2);
  const level3Lessons = getLessonsByLevel(3);

  const getProgressForLevel = (lessons: typeof level1Lessons) => {
    if (lessons.length === 0) return 0;
    const completedCount = lessons.filter((lesson) => isLessonCompleted(lesson.id)).length;
    return Math.round((completedCount / lessons.length) * 100);
  };

  const level1Progress = getProgressForLevel(level1Lessons);
  const level2Progress = getProgressForLevel(level2Lessons);
  const level3Progress = getProgressForLevel(level3Lessons);

  const recentCompletions = progress
    .filter((p) => p.completed && p.completedAt)
    .sort((a, b) => new Date(b.completedAt as string).getTime() - new Date(a.completedAt as string).getTime())
    .slice(0, 3);

  const achievements = [
    {
      id: 'first_lesson',
      title: language === 'en' ? 'First Steps' : 'Tillaabada Hore',
      description: language === 'en' ? 'Complete your first lesson' : 'Dhammayso casharkaaga kowaad',
      achieved: completedLessonsCount > 0,
      icon: Trophy
    },
    {
      id: 'level_1_complete',
      title: language === 'en' ? 'Beginner Graduate' : 'Qalin-jabinta Bilaabaha',
      description: language === 'en' ? 'Complete Level 1' : 'Dhammayso Heerka 1',
      achieved: level1Progress === 100,
      icon: Award
    },
    {
      id: 'streak_5',
      title: language === 'en' ? 'Consistent Learner' : 'Barasho Joogto ah',
      description: language === 'en' ? '5 day learning streak' : '5 maalmood barashada joogto ah',
      achieved: streak >= 5,
      icon: Calendar
    },
    {
      id: 'half_complete',
      title: language === 'en' ? 'Halfway Hero' : 'Geesi Badhkii',
      description: language === 'en' ? 'Complete 50% of all lessons' : 'Dhammayso 50% dhammaan casharrada',
      achieved: overallProgressPercent >= 50,
      icon: Target
    }
  ];

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
              {language === 'en' ? 'Your Progress' : 'Horumaarkaaga'}
            </h2>
            <p className="text-sm text-muted-foreground">
              {language === 'en' ? 'Track your learning journey' : 'La soco socdaalka waxbarashada'}
            </p>
          </div>
        </div>

        {/* Study Streak */}
        <StudyStreak
          streak={streak}
          weeklyGoal={5}
          completedThisWeek={completedThisWeek}
          language={language}
        />

        {/* Overall Progress */}
        <Card className="p-6 shadow-sm border border-border">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            {language === 'en' ? 'Overall Progress' : 'Horumarinta Guud'}
          </h3>
          <LessonProgressBar
            totalLessons={totalLessonsCount}
            completedLessons={completedLessonsCount}
            language={language}
          />
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4 text-center bg-blue-50 border-blue-200">
            <BookOpen className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <p className="text-xl font-bold text-blue-900">{completedLessonsCount}</p>
            <p className="text-xs text-blue-700">
              {language === 'en' ? 'Lessons Done' : 'Casharrada la dhammaystiray'}
            </p>
          </Card>

          <Card className="p-4 text-center bg-green-50 border-green-200">
            <Trophy className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <p className="text-xl font-bold text-green-900">{averageQuizScore}%</p>
            <p className="text-xs text-green-700">
              {language === 'en' ? 'Average Score' : 'Dhibcaha Celceliska'}
            </p>
          </Card>
        </div>

        {/* Level Progress */}
        <Card className="p-6 shadow-sm border border-border">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            {language === 'en' ? 'Level Progress' : 'Horumarinta Heerka'}
          </h3>
          <div className="space-y-4">
            {[
              { level: 1, name: language === 'en' ? 'Beginner' : 'Bilaabaha', progress: level1Progress, color: 'bg-green-500' },
              { level: 2, name: language === 'en' ? 'Intermediate' : 'Dhexdhexaad', progress: level2Progress, color: 'bg-blue-500' },
              { level: 3, name: language === 'en' ? 'Advanced' : 'Sare', progress: level3Progress, color: 'bg-purple-500' }
            ].map((levelData) => (
              <div key={levelData.level} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-foreground">
                    {language === 'en' ? `Level ${levelData.level}` : `Heer ${levelData.level}`} - {levelData.name}
                  </span>
                  <span className="text-muted-foreground">{levelData.progress}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className={`${levelData.color} h-2 rounded-full transition-all duration-300`}
                    style={{ width: `${levelData.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Achievements */}
        <Card className="p-6 shadow-sm border border-border">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            {language === 'en' ? 'Achievements' : 'Guulaha'}
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {achievements.map((achievement) => {
              const Icon = achievement.icon;
              return (
                <div
                  key={achievement.id}
                  className={`p-3 rounded-lg border text-center ${
                    achievement.achieved
                      ? 'bg-yellow-50 border-yellow-200'
                      : 'bg-muted border-border opacity-50'
                  }`}
                >
                  <div className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center mb-2 ${
                    achievement.achieved
                      ? 'bg-yellow-100'
                      : 'bg-muted'
                  }`}>
                    <Icon className={`h-5 w-5 ${
                      achievement.achieved
                        ? 'text-yellow-600'
                        : 'text-muted-foreground'
                    }`} />
                  </div>
                  <h4 className="text-xs font-medium text-foreground mb-1">{achievement.title}</h4>
                  <p className="text-xs text-muted-foreground">{achievement.description}</p>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Recent Activity */}
        {recentCompletions.length > 0 && (
          <Card className="p-6 shadow-sm border border-border">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              {language === 'en' ? 'Recent Activity' : 'Hawlaha Dhowaanta'}
            </h3>
            <div className="space-y-3">
              {recentCompletions.map((completion) => {
                const lesson = getLessonById(completion.lessonId);
                if (!lesson) return null;

                return (
                  <div key={completion.lessonId} className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <Trophy className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{lesson.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {language === 'en' ? 'Score:' : 'Dhibcaha:'} {completion.quizScore || 0}%
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {completion.completedAt ? new Date(completion.completedAt).toLocaleDateString() : ''}
                    </span>
                  </div>
                );
              })}
            </div>
          </Card>
        )}
      </main>

      <BottomNav currentPage="progress" language={language} />
    </div>
  );
}
