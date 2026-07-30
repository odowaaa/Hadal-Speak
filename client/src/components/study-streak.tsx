import { Calendar, Flame, Target } from "lucide-react";
import { Card } from "@/components/ui/card";

interface StudyStreakProps {
  streak: number;
  weeklyGoal: number;
  completedThisWeek: number;
  language: 'en' | 'so';
}

export default function StudyStreak({ 
  streak, 
  weeklyGoal, 
  completedThisWeek, 
  language 
}: StudyStreakProps) {
  const weekProgress = (completedThisWeek / weeklyGoal) * 100;
  
  const getDayOfWeek = () => {
    const days = language === 'en' 
      ? ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
      : ['Axd', 'Isn', 'Tal', 'Arb', 'Kha', 'Jim', 'Sab'];
    return days;
  };
  
  // Mock data for weekly progress (in real app, this would come from backend)
  const weeklyProgress = [true, true, false, true, false, false, false]; // This week's completion
  const today = new Date().getDay();
  
  return (
    <Card className="p-4 bg-gradient-to-r from-orange-100 to-red-100 border-orange-200">
      <div className="space-y-4">
        {/* Streak Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Flame className="h-5 w-5 text-orange-600" />
            <h3 className="text-sm font-semibold text-orange-800">
              {language === 'en' ? 'Study Streak' : 'Joogitaanka Waxbarasho'}
            </h3>
          </div>
          <div className="text-right">
            <p className="text-xl font-bold text-orange-800">{streak}</p>
            <p className="text-xs text-orange-600">
              {language === 'en' ? 'days' : 'maalmood'}
            </p>
          </div>
        </div>
        
        {/* Weekly Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-orange-700">
              {language === 'en' ? 'This Week' : 'Todobaadkan'}
            </span>
            <span className="text-orange-700">
              {completedThisWeek}/{weeklyGoal} {language === 'en' ? 'lessons' : 'cashar'}
            </span>
          </div>
          
          <div className="flex justify-between space-x-1">
            {getDayOfWeek().map((day, index) => (
              <div key={index} className="text-center flex-1">
                <div className={`w-6 h-6 rounded-full mx-auto mb-1 flex items-center justify-center ${
                  weeklyProgress[index] 
                    ? 'bg-orange-500' 
                    : index === today 
                    ? 'bg-orange-300 border-2 border-orange-500' 
                    : 'bg-orange-200'
                }`}>
                  {weeklyProgress[index] && (
                    <div className="w-2 h-2 bg-card rounded-full"></div>
                  )}
                </div>
                <span className="text-xs text-orange-700">{day}</span>
              </div>
            ))}
          </div>
          
          <div className="w-full bg-orange-200 rounded-full h-1.5">
            <div 
              className="bg-orange-500 h-1.5 rounded-full transition-all duration-300" 
              style={{ width: `${Math.min(weekProgress, 100)}%` }}
            />
          </div>
        </div>
        
        {/* Goal Status */}
        <div className="flex items-center justify-center space-x-2 text-xs text-orange-700">
          <Target className="h-3 w-3" />
          <span>
            {language === 'en' 
              ? `Goal: ${weeklyGoal} lessons per week`
              : `Hadafka: ${weeklyGoal} cashar todobaadkiiba`
            }
          </span>
        </div>
      </div>
    </Card>
  );
}