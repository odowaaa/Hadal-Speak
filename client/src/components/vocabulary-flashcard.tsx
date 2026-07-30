import { useState } from "react";
import { RotateCcw, Volume2, BookOpen } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AudioPlayer from "./audio-player";

interface VocabularyFlashcardProps {
  englishWord: string;
  somaliWord: string;
  example?: string;
  somaliExample?: string;
  language: 'en' | 'so';
}

export default function VocabularyFlashcard({ 
  englishWord, 
  somaliWord, 
  example, 
  somaliExample, 
  language 
}: VocabularyFlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };
  
  return (
    <Card className="mb-4 overflow-hidden shadow-sm border border-border">
      <div className="p-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-4 w-4 text-blue-600" />
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              {language === 'en' ? 'Vocabulary Card' : 'Kaartar Erayada'}
            </span>
          </div>
          <Button
            onClick={handleFlip}
            variant="ghost"
            size="sm"
            className="text-xs text-blue-600 hover:bg-blue-50"
          >
            <RotateCcw className="h-3 w-3 mr-1" />
            {language === 'en' ? 'Flip' : 'Rogaal'}
          </Button>
        </div>

        {!isFlipped ? (
          /* English Side */
          <div className="space-y-4">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-3 mb-2">
                <h3 className="text-3xl font-bold text-blue-900">{englishWord}</h3>
                <AudioPlayer text={englishWord} language="en" />
              </div>
              <p className="text-sm text-blue-600 font-medium">English</p>
            </div>
            
            {example && (
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                <p className="text-sm text-blue-800">
                  <span className="font-medium">Example: </span>
                  {example}
                </p>
              </div>
            )}
            
            <div className="text-center">
              <p className="text-xs text-muted-foreground">
                {language === 'en' ? 'Click "Flip" to see Somali translation' : 'Riix "Rogaal" si aad u aragto turjumaada Soomaaliga'}
              </p>
            </div>
          </div>
        ) : (
          /* Somali Side */
          <div className="space-y-4">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-3 mb-2">
                <h3 className="text-3xl font-bold text-orange-700">{somaliWord}</h3>
                <AudioPlayer text={somaliWord} language="so" />
              </div>
              <p className="text-sm text-orange-600 font-medium">Soomaali</p>
            </div>
            
            {somaliExample && (
              <div className="bg-orange-50 rounded-lg p-4 border border-orange-100">
                <p className="text-sm text-orange-800">
                  <span className="font-medium">Tusaale: </span>
                  {somaliExample}
                </p>
              </div>
            )}
            
            <div className="text-center">
              <p className="text-xs text-muted-foreground">
                {language === 'en' ? 'Click "Flip" to see English word' : 'Riix "Rogaal" si aad u aragto erayga Ingiriisiga'}
              </p>
            </div>
          </div>
        )}

        {/* Bottom Navigation */}
        <div className="mt-6 pt-4 border-t border-border">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <span className="text-xs text-muted-foreground">
                {englishWord} = {somaliWord}
              </span>
            </div>
            <div className="flex space-x-2">
              <AudioPlayer text={englishWord} language="en" />
              <AudioPlayer text={somaliWord} language="so" />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}