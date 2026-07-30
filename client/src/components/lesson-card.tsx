import { Card } from "@/components/ui/card";
import AudioPlayer from "./audio-player";
import VoiceRecorder from "./voice-recorder";
import { Lesson } from "@shared/schema";

interface LessonCardProps {
  lesson: Lesson;
  isCompleted: boolean;
  language: string;
}

export default function LessonCard({ lesson, isCompleted, language }: LessonCardProps) {
  return (
    <Card className="p-6 shadow-sm border border-border space-y-6">
      {/* Lesson Title */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">{lesson.title}</h3>
        {isCompleted && (
          <span className="text-xs px-3 py-1 bg-green-100 text-green-700 rounded-full font-medium">
            {language === 'en' ? 'Completed' : 'La dhammaystiray'}
          </span>
        )}
      </div>

      {/* Main Content */}
      <div className="space-y-4">
        {/* English Sentence */}
        <div className="bg-blue-50 rounded-xl p-4">
          <div className="flex items-start justify-between mb-2">
            <h4 className="text-sm font-medium text-blue-900">English</h4>
            <AudioPlayer text={lesson.english} language="en" />
          </div>
          <p className="text-lg font-medium text-blue-900">{lesson.english}</p>
        </div>

        {/* Somali Translation */}
        <div className="bg-cultural/10 rounded-xl p-4">
          <div className="flex items-start justify-between mb-2">
            <h4 className="text-sm font-medium text-cultural">Somali (Af-Soomaali)</h4>
            <AudioPlayer text={lesson.somali} language="so" />
          </div>
          <p className="text-lg font-medium text-cultural">{lesson.somali}</p>
        </div>

        {/* Key Vocabulary */}
        <div className="bg-muted rounded-xl p-4">
          <h4 className="text-sm font-medium text-foreground mb-3">
            {language === 'en' ? 'Key Words' : 'Erayada Muhiimka ah'}
          </h4>
          <div className="grid grid-cols-1 gap-3">
            {Object.entries(lesson.keyWords).map(([english, somali]) => (
              <div key={english} className="flex justify-between items-center">
                <span className="text-foreground font-medium">{english}</span>
                <span className="text-muted-foreground">=</span>
                <span className="text-cultural font-medium">{somali}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Voice Practice */}
        <VoiceRecorder 
          targetText={lesson.english}
          language={language}
        />
      </div>
    </Card>
  );
}
