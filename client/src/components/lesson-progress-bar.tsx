import { CheckCircle, Circle, Lock } from "lucide-react";

interface LessonProgressBarProps {
  totalLessons: number;
  completedLessons: number;
  currentLesson?: number;
  language: 'en' | 'so';
}

export default function LessonProgressBar({ 
  totalLessons, 
  completedLessons, 
  currentLesson, 
  language 
}: LessonProgressBarProps) {
  const progress = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;
  
  return (
    <div className="space-y-3">
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">
          {language === 'en' ? 'Lesson Progress' : 'Horumarinta Casharrada'}
        </span>
        <span className="font-medium text-foreground">
          {completedLessons}/{totalLessons} {language === 'en' ? 'completed' : 'la dhammaystiray'}
        </span>
      </div>
      
      <div className="w-full bg-muted rounded-full h-2">
        <div 
          className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-500" 
          style={{ width: `${progress}%` }}
        />
      </div>
      
      <div className="flex justify-between items-center">
        <div className="flex space-x-1">
          {Array.from({ length: Math.min(totalLessons, 10) }, (_, index) => {
            const lessonNumber = index + 1;
            const isCompleted = lessonNumber <= completedLessons;
            const isCurrent = lessonNumber === currentLesson;
            const isLocked = lessonNumber > completedLessons + 1;
            
            return (
              <div
                key={index}
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  isCompleted 
                    ? 'bg-green-500 text-white'
                    : isCurrent
                    ? 'bg-blue-500 text-white'
                    : isLocked
                    ? 'bg-muted text-muted-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {isCompleted ? (
                  <CheckCircle className="h-3 w-3" />
                ) : isLocked ? (
                  <Lock className="h-3 w-3" />
                ) : (
                  lessonNumber
                )}
              </div>
            );
          })}
          {totalLessons > 10 && (
            <span className="text-xs text-muted-foreground self-center">+{totalLessons - 10}</span>
          )}
        </div>
        
        <div className="text-right">
          <p className="text-lg font-bold text-foreground">{Math.round(progress)}%</p>
          <p className="text-xs text-muted-foreground">
            {language === 'en' ? 'Complete' : 'Dhammaan'}
          </p>
        </div>
      </div>
    </div>
  );
}