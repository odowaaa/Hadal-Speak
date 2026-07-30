import { Volume2, Mic, CheckCircle, XCircle } from "lucide-react";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AudioPlayer from "./audio-player";

interface PronunciationGuideProps {
  word: string;
  phonetic: string;
  tips: string[];
  language: 'en' | 'so';
}

export default function PronunciationGuide({ 
  word, 
  phonetic, 
  tips, 
  language 
}: PronunciationGuideProps) {
  const [isListening, setIsListening] = useState(false);
  const [feedback, setFeedback] = useState<'good' | 'needs-work' | null>(null);
  
  const handlePractice = () => {
    setIsListening(true);
    // Simulate listening for pronunciation (in real app, would use speech recognition)
    setTimeout(() => {
      setIsListening(false);
      setFeedback(Math.random() > 0.3 ? 'good' : 'needs-work');
      setTimeout(() => setFeedback(null), 3000);
    }, 2000);
  };
  
  return (
    <Card className="p-6 bg-purple-50 border-purple-200">
      <div className="space-y-4">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-purple-900 mb-2">
            {language === 'en' ? 'Pronunciation Guide' : 'Hagaha Dhawaqa'}
          </h3>
          
          <div className="space-y-2">
            <div className="flex items-center justify-center space-x-3">
              <span className="text-2xl font-bold text-purple-800">{word}</span>
              <AudioPlayer text={word} language="en" />
            </div>
            
            <div className="text-purple-600 font-mono text-lg">
              /{phonetic}/
            </div>
          </div>
        </div>
        
        {/* Tips */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-purple-800">
            {language === 'en' ? 'Pronunciation Tips:' : 'Tilmaamaha Dhawaqa:'}
          </h4>
          <ul className="space-y-1">
            {tips.map((tip, index) => (
              <li key={index} className="text-sm text-purple-700 flex items-start space-x-2">
                <span className="text-purple-500 mt-1">•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Practice Section */}
        <div className="border-t border-purple-200 pt-4">
          <div className="text-center space-y-3">
            <Button
              onClick={handlePractice}
              disabled={isListening}
              className={`w-full ${isListening ? 'animate-pulse' : ''}`}
              variant={isListening ? "destructive" : "default"}
            >
              {isListening ? (
                <>
                  <Mic className="h-4 w-4 mr-2" />
                  {language === 'en' ? 'Listening...' : 'Waan dhageysanayaa...'}
                </>
              ) : (
                <>
                  <Mic className="h-4 w-4 mr-2" />
                  {language === 'en' ? 'Practice Pronunciation' : 'Ku Celceli Dhawaqa'}
                </>
              )}
            </Button>
            
            {feedback && (
              <div className={`p-3 rounded-lg flex items-center justify-center space-x-2 ${
                feedback === 'good' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-orange-100 text-orange-800'
              }`}>
                {feedback === 'good' ? (
                  <>
                    <CheckCircle className="h-4 w-4" />
                    <span className="text-sm font-medium">
                      {language === 'en' ? 'Great pronunciation!' : 'Dhawaq wanaagsan!'}
                    </span>
                  </>
                ) : (
                  <>
                    <XCircle className="h-4 w-4" />
                    <span className="text-sm font-medium">
                      {language === 'en' ? 'Try again, focus on the tips' : 'Mar kale isku day, tilmaamaha diirada saari'}
                    </span>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}