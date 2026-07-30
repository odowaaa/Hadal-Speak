import { Info, Globe, Users } from "lucide-react";
import { Card } from "@/components/ui/card";

interface CulturalTipsProps {
  tips: string[];
  language: 'en' | 'so';
}

export default function CulturalTips({ tips, language }: CulturalTipsProps) {
  return (
    <Card className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Globe className="h-5 w-5 text-blue-600" />
          <h3 className="text-sm font-semibold text-blue-800">
            {language === 'en' ? 'Cultural Context' : 'Xiriirka Dhaqanka'}
          </h3>
        </div>
        
        <div className="space-y-2">
          {tips.map((tip, index) => (
            <div key={index} className="flex items-start space-x-2">
              <Info className="h-3 w-3 text-blue-500 mt-1 flex-shrink-0" />
              <p className="text-sm text-blue-700">{tip}</p>
            </div>
          ))}
        </div>
        
        <div className="flex items-center space-x-1 text-xs text-blue-600 mt-3">
          <Users className="h-3 w-3" />
          <span>
            {language === 'en' 
              ? 'Understanding culture helps with communication'
              : 'Fahamka dhaqanku wuxuu caawiyaa isgaarsiinta'
            }
          </span>
        </div>
      </div>
    </Card>
  );
}