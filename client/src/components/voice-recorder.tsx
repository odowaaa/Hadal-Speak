import { useState, useRef } from "react";
import { Mic, Square, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface VoiceRecorderProps {
  targetText: string;
  language: string;
}

export default function VoiceRecorder({ targetText, language }: VoiceRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [hasRecording, setHasRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/wav' });
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        setHasRecording(true);
        
        // Stop all tracks to release microphone
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const playRecording = () => {
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.play().catch(error => {
        console.warn('Error playing recording:', error);
      });
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <Card className="bg-green-50 p-4">
      <h4 className="text-sm font-medium text-green-700 mb-3 flex items-center">
        <Mic className="h-4 w-4 mr-2" />
        {language === 'en' ? 'Speaking Practice' : 'Ku Celceli Hadalka'}
      </h4>
      
      <div className="mb-4 p-3 bg-green-100 rounded-lg">
        <p className="text-sm text-green-800 mb-2">
          {language === 'en' ? 'Practice saying:' : 'Ku celi dhididda:'}
        </p>
        <p className="text-lg font-medium text-green-900">{targetText}</p>
      </div>

      <div className="flex items-center justify-center space-x-4">
        <Button
          onClick={toggleRecording}
          variant={isRecording ? "destructive" : "default"}
          size="lg"
          className={`px-6 py-3 ${isRecording ? 'animate-pulse' : ''}`}
        >
          {isRecording ? (
            <>
              <Square className="h-5 w-5 mr-2" />
              {language === 'en' ? 'Stop Recording' : 'Jooji Duubista'}
            </>
          ) : (
            <>
              <Mic className="h-5 w-5 mr-2" />
              {language === 'en' ? 'Start Recording' : 'Bilow Duubista'}
            </>
          )}
        </Button>

        {hasRecording && (
          <Button
            onClick={playRecording}
            variant="outline"
            size="lg"
            className="px-6 py-3"
          >
            <Play className="h-5 w-5 mr-2" />
            {language === 'en' ? 'Play Back' : 'Dib u ciyaar'}
          </Button>
        )}
      </div>

      {hasRecording && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg text-center">
          <p className="text-sm text-blue-700">
            {language === 'en' 
              ? '✓ Recording saved! Listen and try again to improve.' 
              : '✓ Duubista la keydiyay! Dhegayso oo mar kale isku day si aad u horumarisid.'
            }
          </p>
        </div>
      )}
    </Card>
  );
}
