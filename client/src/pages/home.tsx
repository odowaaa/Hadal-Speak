import { useLocation } from "wouter";
import { Sprout, Mountain, Crown, Target, Check } from "lucide-react";
import Header from "../components/header";
import LevelCard from "../components/level-card";
import BottomNav from "../components/bottom-nav";
import StudyStreak from "../components/study-streak";
import LessonProgressBar from "../components/lesson-progress-bar";
import { useAppState } from "@/context/app-state";
import { getLessonsByLevel } from "@/lib/lessons-data";

export default function Home() {
  const [, setLocation] = useLocation();
  const {
    language,
    toggleLanguage,
    isLessonCompleted,
    isLevelUnlocked,
    getResumeLesson,
    completedLessonsCount,
    totalLessonsCount,
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

  const handleLevelSelect = (level: number) => {
    const resumeLesson = getResumeLesson(level);
    if (resumeLesson) {
      setLocation(`/lesson/${level}/${resumeLesson.id}`);
    }
  };

  return (
    <div className="min-h-screen bg-background transition-colors duration-200">
      <Header
        user={{ id: "local", username: "demo", language }}
        onLanguageToggle={toggleLanguage}
      />

      <main className="max-w-md mx-auto px-4 py-6 space-y-6 pb-24">
        {/* Study Streak */}
        <StudyStreak
          streak={streak}
          weeklyGoal={5}
          completedThisWeek={completedThisWeek}
          language={language}
        />

        {/* Progress Overview */}
        <div className="bg-card rounded-2xl p-6 shadow-sm border border-border transition-colors duration-200">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            {language === 'en' ? 'Learning Progress' : 'Horumarinta Waxbarasho'}
          </h2>
          <LessonProgressBar
            totalLessons={totalLessonsCount}
            completedLessons={completedLessonsCount}
            language={language}
          />
        </div>

        {/* Level Selection */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-foreground">
            {language === 'en' ? 'Choose Your Level' : 'Dooro Heerkaaga'}
          </h2>

          <LevelCard
            level={1}
            title={language === 'en' ? 'Level 1: Beginner' : 'Heer 1: Bilaabaha'}
            description={language === 'en' ? 'Basic greetings, introductions, daily phrases' : 'Salaan asaasi ah, is-aqoontin, weedho maalinta'}
            icon={Sprout}
            progress={level1Progress}
            completedLessons={level1Lessons.filter((l) => isLessonCompleted(l.id)).length}
            totalLessons={level1Lessons.length}
            bgColor="bg-green-100"
            iconColor="text-green-600"
            progressColor="bg-green-500"
            badgeColor="bg-green-100 text-green-700"
            isLocked={false}
            onSelect={() => handleLevelSelect(1)}
            language={language}
          />

          <LevelCard
            level={2}
            title={language === 'en' ? 'Level 2: Intermediate' : 'Heer 2: Dhexdhexaad'}
            description={language === 'en' ? 'Conversations, work, shopping, health topics' : 'Wada hadal, shaqo, wax iibsiga, arrimaha caafimaadka'}
            icon={Mountain}
            progress={level2Progress}
            completedLessons={level2Lessons.filter((l) => isLessonCompleted(l.id)).length}
            totalLessons={level2Lessons.length}
            bgColor="bg-blue-100"
            iconColor="text-blue-600"
            progressColor="bg-blue-500"
            badgeColor="bg-blue-100 text-blue-700"
            isLocked={!isLevelUnlocked(2)}
            lockedReason={language === 'en' ? 'Complete Level 1 to unlock' : 'Dhammayso Heerka 1 si aad u furto'}
            onSelect={() => handleLevelSelect(2)}
            language={language}
          />

          <LevelCard
            level={3}
            title={language === 'en' ? 'Level 3: Advanced' : 'Heer 3: Sare'}
            description={language === 'en' ? 'Storytelling, opinions, formal communication' : 'Sheeko sheegid, fikrado, xiriir rasmi ah'}
            icon={Crown}
            progress={level3Progress}
            completedLessons={level3Lessons.filter((l) => isLessonCompleted(l.id)).length}
            totalLessons={level3Lessons.length}
            bgColor="bg-purple-100"
            iconColor="text-purple-600"
            progressColor="bg-purple-500"
            badgeColor="bg-purple-100 text-purple-700"
            isLocked={!isLevelUnlocked(3)}
            lockedReason={language === 'en' ? 'Complete Level 2 to unlock' : 'Dhammayso Heerka 2 si aad u furto'}
            onSelect={() => handleLevelSelect(3)}
            language={language}
          />
        </div>

        {/* Daily Goals */}
        <div className="bg-gradient-to-r from-cultural to-blue-500 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">
              {language === 'en' ? "Today's Goal" : 'Hadafka Maanta'}
            </h2>
            <Target className="h-6 w-6 opacity-80" />
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-blue-100">
                {language === 'en' ? 'Complete 1 lesson' : '1 cashar dhammayso'}
              </span>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                  <Check className="h-3 w-3 text-white" />
                </div>
                <span className="text-sm font-medium">
                  {completedThisWeek > 0
                    ? (language === 'en' ? 'Done!' : 'La dhammaystiray!')
                    : (language === 'en' ? 'Not yet' : 'Wali maya')}
                </span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-blue-100">
                {language === 'en' ? 'Practice speaking' : 'Ku celceli hadalka'}
              </span>
              <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-blue-100">
                {language === 'en' ? 'Score 80% on quiz' : 'Imtixaanka 80% ka hel'}
              </span>
              <div className="w-6 h-6 bg-white/20 rounded-full"></div>
            </div>
          </div>
        </div>
      </main>

      <BottomNav currentPage="home" language={language} />
    </div>
  );
}
