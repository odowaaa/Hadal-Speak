import { Card } from "@/components/ui/card";
import { Lock, ChevronRight, Clock, type LucideIcon } from "lucide-react";

interface LevelCardProps {
  level: number;
  title: string;
  description: string;
  icon: LucideIcon;
  progress: number;
  completedLessons: number;
  totalLessons: number;
  bgColor: string;
  iconColor: string;
  progressColor: string;
  badgeColor: string;
  isLocked: boolean;
  lockedReason?: string;
  onSelect: () => void;
  language: string;
}

export default function LevelCard({
  title,
  description,
  icon: Icon,
  progress,
  completedLessons,
  totalLessons,
  bgColor,
  iconColor,
  progressColor,
  badgeColor,
  isLocked,
  lockedReason,
  onSelect,
  language
}: LevelCardProps) {
  return (
    <Card 
      className={`p-6 shadow-sm border border-border hover:shadow-md transition-shadow cursor-pointer ${isLocked ? 'opacity-75' : ''}`}
      onClick={!isLocked ? onSelect : undefined}
    >
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <div className={`w-12 h-12 ${bgColor} rounded-xl flex items-center justify-center`}>
            {isLocked ? (
              <Lock className={`${iconColor} h-5 w-5`} />
            ) : (
              <Icon className={`${iconColor} h-5 w-5`} />
            )}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-foreground">{title}</h3>
            {isLocked ? (
              <span className="text-xs px-2 py-1 bg-muted text-muted-foreground rounded-full font-medium">
                {language === 'en' ? 'Locked' : 'Xiran'}
              </span>
            ) : (
              <span className={`text-xs px-2 py-1 ${badgeColor} rounded-full font-medium`}>
                {completedLessons}/{totalLessons} {language === 'en' ? 'Complete' : 'Dhammaan'}
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground mb-3">{description}</p>
          {isLocked && lockedReason ? (
            <p className="text-xs text-muted-foreground mb-3 flex items-center">
              <Lock className="h-3 w-3 mr-1 flex-shrink-0" />
              {lockedReason}
            </p>
          ) : (
            <div className="flex items-center space-x-4 text-xs text-muted-foreground">
              <span className="inline-flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                {language === 'en' ? '5-15 min/lesson' : '5-15 daqiiqo/cashar'}
              </span>
            </div>
          )}
          <div className="mt-3 w-full bg-muted rounded-full h-1.5">
            <div 
              className={`${progressColor} h-1.5 rounded-full transition-all duration-300`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        {isLocked ? (
          <Lock className="text-muted-foreground mt-2 h-4 w-4" />
        ) : (
          <ChevronRight className="text-muted-foreground mt-2 h-4 w-4" />
        )}
      </div>
    </Card>
  );
}
