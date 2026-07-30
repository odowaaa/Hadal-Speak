import { useState } from "react";
import { Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AudioPlayerProps {
  text: string;
  language: 'en' | 'so';
}

export default function AudioPlayer({ text, language }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const playAudio = async () => {
    if (!('speechSynthesis' in window)) {
      console.warn('Speech synthesis not supported in this browser');
      // Don't show alert, just provide visual feedback
      setIsPlaying(true);
      setTimeout(() => setIsPlaying(false), 1000);
      return;
    }

    setIsPlaying(true);
    
    // Stop any ongoing speech
    window.speechSynthesis.cancel();
    
    // Wait for voices to load if they haven't yet
    let voices = window.speechSynthesis.getVoices();
    if (voices.length === 0) {
      await new Promise(resolve => {
        const timeout = setTimeout(() => resolve([]), 2000); // 2 second timeout
        window.speechSynthesis.onvoiceschanged = () => {
          clearTimeout(timeout);
          voices = window.speechSynthesis.getVoices();
          resolve(voices);
        };
        // Trigger voice loading in some browsers
        window.speechSynthesis.speak(new SpeechSynthesisUtterance(''));
      });
      voices = window.speechSynthesis.getVoices(); // Get voices again after loading
    }
    
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Enhanced language settings with better voice selection
    if (language === 'en') {
      utterance.lang = 'en-US';
      utterance.rate = 0.85;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;
      
      // Find the best English voice
      const englishVoice = voices.find(voice => 
        voice.lang.includes('en') && !voice.name.includes('Google')
      ) || voices.find(voice => voice.lang.includes('en'));
      
      if (englishVoice) {
        utterance.voice = englishVoice;
      }
    } else {
      // For Somali, use a clear pronunciation approach
      utterance.lang = 'en-US'; // Use English voice with slower rate for clarity
      utterance.rate = 0.6; // Much slower for Somali words
      utterance.pitch = 0.9;
      utterance.volume = 1.0;
      
      // Try to find a female voice for better pronunciation
      const femaleVoice = voices.find(voice => 
        voice.lang.includes('en') && voice.name.toLowerCase().includes('female')
      ) || voices.find(voice => 
        voice.lang.includes('en') && voice.name.toLowerCase().includes('samantha')
      ) || voices.find(voice => voice.lang.includes('en'));
      
      if (femaleVoice) {
        utterance.voice = femaleVoice;
      }
    }
    
    utterance.onend = () => {
      setIsPlaying(false);
    };
    
    utterance.onerror = (event) => {
      console.warn('Speech synthesis error:', event.error);
      setIsPlaying(false);
    };
    
    // Add a small delay to ensure proper voice loading and start speaking
    setTimeout(() => {
      try {
        window.speechSynthesis.speak(utterance);
        console.log('Playing audio for:', text, 'Language:', language);
      } catch (error) {
        console.warn('Error speaking:', error);
        setIsPlaying(false);
      }
    }, 150);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={playAudio}
      disabled={isPlaying}
      className="p-1 rounded-md hover:bg-blue-100 transition-colors"
    >
      <Volume2 className="h-4 w-4 text-blue-600" />
    </Button>
  );
}
