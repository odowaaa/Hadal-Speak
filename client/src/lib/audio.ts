export class AudioRecorder {
  private mediaRecorder: MediaRecorder | null = null;
  private chunks: Blob[] = [];
  private stream: MediaStream | null = null;

  async startRecording(): Promise<void> {
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.mediaRecorder = new MediaRecorder(this.stream);
      this.chunks = [];

      return new Promise((resolve, reject) => {
        if (!this.mediaRecorder) {
          reject(new Error('MediaRecorder not initialized'));
          return;
        }

        this.mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            this.chunks.push(event.data);
          }
        };

        this.mediaRecorder.onstart = () => {
          resolve();
        };

        this.mediaRecorder.onerror = (event) => {
          reject(event);
        };

        this.mediaRecorder.start();
      });
    } catch (error) {
      throw new Error(`Failed to start recording: ${error}`);
    }
  }

  async stopRecording(): Promise<Blob> {
    return new Promise((resolve, reject) => {
      if (!this.mediaRecorder) {
        reject(new Error('MediaRecorder not initialized'));
        return;
      }

      this.mediaRecorder.onstop = () => {
        const blob = new Blob(this.chunks, { type: 'audio/wav' });
        this.cleanup();
        resolve(blob);
      };

      this.mediaRecorder.stop();
    });
  }

  private cleanup(): void {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }
    this.mediaRecorder = null;
    this.chunks = [];
  }

  isRecording(): boolean {
    return this.mediaRecorder?.state === 'recording';
  }
}

export function playAudioFromBlob(blob: Blob): Promise<void> {
  return new Promise((resolve, reject) => {
    const audio = new Audio();
    const url = URL.createObjectURL(blob);
    
    audio.onended = () => {
      URL.revokeObjectURL(url);
      resolve();
    };
    
    audio.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to play audio'));
    };
    
    audio.src = url;
    audio.play();
  });
}

export function textToSpeech(text: string, language: 'en' | 'so' = 'en'): Promise<void> {
  return new Promise(async (resolve, reject) => {
    if (!('speechSynthesis' in window)) {
      reject(new Error('Speech synthesis not supported'));
      return;
    }

    // Stop any ongoing speech
    window.speechSynthesis.cancel();
    
    // Wait for voices to load
    let voices = window.speechSynthesis.getVoices();
    if (voices.length === 0) {
      await new Promise(voiceResolve => {
        window.speechSynthesis.onvoiceschanged = () => {
          voices = window.speechSynthesis.getVoices();
          voiceResolve(voices);
        };
      });
    }

    const utterance = new SpeechSynthesisUtterance(text);
    
    if (language === 'en') {
      utterance.lang = 'en-US';
      utterance.rate = 0.85;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;
      
      // Find best English voice
      const englishVoice = voices.find(voice => 
        voice.lang.includes('en') && !voice.name.includes('Google')
      ) || voices.find(voice => voice.lang.includes('en'));
      
      if (englishVoice) {
        utterance.voice = englishVoice;
      }
    } else {
      // For Somali, use clear English pronunciation
      utterance.lang = 'en-US';
      utterance.rate = 0.6;
      utterance.pitch = 0.9;
      utterance.volume = 1.0;
      
      // Find a clear voice for Somali pronunciation
      const clearVoice = voices.find(voice => 
        voice.lang.includes('en') && (
          voice.name.toLowerCase().includes('female') ||
          voice.name.toLowerCase().includes('samantha') ||
          voice.name.toLowerCase().includes('karen')
        )
      ) || voices.find(voice => voice.lang.includes('en'));
      
      if (clearVoice) {
        utterance.voice = clearVoice;
      }
    }
    
    utterance.onend = () => resolve();
    utterance.onerror = (event) => {
      console.warn('TTS Error:', event);
      reject(event);
    };
    
    // Small delay for voice loading
    setTimeout(() => {
      window.speechSynthesis.speak(utterance);
    }, 100);
  });
}
