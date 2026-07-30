import { useState } from "react";
import { useLocation } from "wouter";
import { ArrowLeft, Mic, Volume2, RotateCcw, BookOpen, Share2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Header from "../components/header";
import BottomNav from "../components/bottom-nav";
import VoiceRecorder from "../components/voice-recorder";
import AudioPlayer from "../components/audio-player";
import VocabularyFlashcard from "../components/vocabulary-flashcard";
import PronunciationGuide from "../components/pronunciation-guide";
import { useAppState } from "@/context/app-state";
import { lessonsData } from "@/lib/lessons-data";

// Populated when the OS "Share to..." menu sends text here — see
// manifest.json `share_target`.
function readSharedText(): string | null {
  const params = new URLSearchParams(window.location.search);
  const text = params.get("shared_text") || params.get("shared_title");
  return text && text.trim().length > 0 ? text.trim() : null;
}

export default function Practice() {
  const [, setLocation] = useLocation();
  const { language, toggleLanguage } = useAppState();
  const [currentPracticeIndex, setCurrentPracticeIndex] = useState(0);
  const [practiceMode, setPracticeMode] = useState<'speaking' | 'vocabulary' | 'pronunciation'>('speaking');
  const [sharedText, setSharedText] = useState<string | null>(() => readSharedText());

  const dismissSharedText = () => {
    setSharedText(null);
    window.history.replaceState(null, "", "/practice");
  };

  const allLessons = lessonsData;
  const currentLesson = allLessons[currentPracticeIndex];

  const handleNext = () => {
    if (currentPracticeIndex < allLessons.length - 1) {
      setCurrentPracticeIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPracticeIndex > 0) {
      setCurrentPracticeIndex((prev) => prev - 1);
    }
  };

  const handleRandom = () => {
    const randomIndex = Math.floor(Math.random() * allLessons.length);
    setCurrentPracticeIndex(randomIndex);
  };

  if (!currentLesson) {
    return (
      <div className="min-h-screen bg-background">
        <Header user={{ id: "local", username: "demo", language }} onLanguageToggle={toggleLanguage} />
        <div className="max-w-md mx-auto px-4 py-6 pb-24">
          <div className="text-center">
            <p className="text-muted-foreground">
              {language === 'en' ? 'No lessons available yet.' : 'Wali ma jiraan cashar.'}
            </p>
          </div>
        </div>
        <BottomNav currentPage="practice" language={language} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background transition-colors duration-200">
      <Header
        user={{ id: "local", username: "demo", language }}
        onLanguageToggle={toggleLanguage}
      />

      <main className="max-w-md mx-auto px-4 py-6 space-y-6 pb-24">
        {/* Header */}
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLocation('/')}
            className="p-2 rounded-lg bg-muted hover:bg-muted/80"
          >
            <ArrowLeft className="h-4 w-4 text-muted-foreground" />
          </Button>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-foreground">
              {language === 'en' ? 'Speaking Practice' : 'Ku Celceli Hadalka'}
            </h2>
            <p className="text-sm text-muted-foreground">
              {language === 'en' ?
                `Practice ${currentPracticeIndex + 1} of ${allLessons.length}` :
                `Ku celi ${currentPracticeIndex + 1} oo ka mid ah ${allLessons.length}`
              }
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRandom}
            className="p-2 rounded-lg bg-muted hover:bg-muted/80"
            title={language === 'en' ? 'Random lesson' : 'Cashar aan la filanayn'}
          >
            <RotateCcw className="h-4 w-4 text-muted-foreground" />
          </Button>
        </div>

        {/* Shared Text (from the OS "Share to..." menu) */}
        {sharedText && (
          <Card className="p-4 bg-green-50 border-green-200 space-y-3">
            <div className="flex items-start justify-between">
              <h4 className="text-sm font-semibold text-green-800 flex items-center">
                <Share2 className="h-4 w-4 mr-2" />
                {language === 'en' ? 'Shared text' : 'Qoraal la wadaagay'}
              </h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={dismissSharedText}
                className="p-1 h-7 w-7 text-green-700 hover:bg-green-100"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-start justify-between gap-2">
              <p className="text-lg font-medium text-green-900">{sharedText}</p>
              <AudioPlayer text={sharedText} language="en" />
            </div>
            <VoiceRecorder targetText={sharedText} language={language} />
          </Card>
        )}

        {/* Practice Mode Selector */}
        <div className="grid grid-cols-3 gap-2 p-1 bg-muted rounded-lg">
          <Button
            variant={practiceMode === 'speaking' ? 'default' : 'ghost'}
            onClick={() => setPracticeMode('speaking')}
            className="text-xs"
          >
            <Mic className="h-3 w-3 mr-1" />
            {language === 'en' ? 'Speaking' : 'Hadal'}
          </Button>
          <Button
            variant={practiceMode === 'vocabulary' ? 'default' : 'ghost'}
            onClick={() => setPracticeMode('vocabulary')}
            className="text-xs"
          >
            <BookOpen className="h-3 w-3 mr-1" />
            {language === 'en' ? 'Vocab' : 'Erayada'}
          </Button>
          <Button
            variant={practiceMode === 'pronunciation' ? 'default' : 'ghost'}
            onClick={() => setPracticeMode('pronunciation')}
            className="text-xs"
          >
            <Volume2 className="h-3 w-3 mr-1" />
            {language === 'en' ? 'Sounds' : 'Dhawaqa'}
          </Button>
        </div>

        {/* Practice Content */}
        {practiceMode === 'speaking' && (
          <Card className="p-6 shadow-sm border border-border space-y-6">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Mic className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">{currentLesson.title}</h3>
            <span className="text-xs px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">
              {language === 'en' ? `Level ${currentLesson.level}` : `Heer ${currentLesson.level}`}
            </span>
          </div>

          {/* English Text */}
          <div className="bg-blue-50 rounded-xl p-4">
            <div className="flex items-start justify-between mb-2">
              <h4 className="text-sm font-medium text-blue-900">
                {language === 'en' ? 'Practice saying:' : 'Ku celi dhididda:'}
              </h4>
              <AudioPlayer text={currentLesson.english} language="en" />
            </div>
            <p className="text-lg font-medium text-blue-900">{currentLesson.english}</p>
          </div>

          {/* Somali Translation */}
          <div className="bg-cultural/10 rounded-xl p-4">
            <div className="flex items-start justify-between mb-2">
              <h4 className="text-sm font-medium text-cultural">
                {language === 'en' ? 'Translation:' : 'Turjumaada:'}
              </h4>
              <AudioPlayer text={currentLesson.somali} language="so" />
            </div>
            <p className="text-lg font-medium text-cultural">{currentLesson.somali}</p>
          </div>

          {/* Voice Practice */}
          <VoiceRecorder
            targetText={currentLesson.english}
            language={language}
          />

          {/* Key Words */}
          <div className="bg-muted rounded-xl p-4">
            <h4 className="text-sm font-medium text-foreground mb-3">
              {language === 'en' ? 'Key Words' : 'Erayada Muhiimka ah'}
            </h4>
            <div className="grid grid-cols-1 gap-2">
              {Object.entries(currentLesson.keyWords).map(([english, somali]) => (
                <div key={english} className="flex justify-between items-center text-sm">
                  <span className="text-foreground font-medium">{english}</span>
                  <span className="text-muted-foreground">=</span>
                  <span className="text-cultural font-medium">{somali}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
        )}

        {/* Vocabulary Practice */}
        {practiceMode === 'vocabulary' && (
          <div className="space-y-6">
            {/* Header */}
            <div className="text-center space-y-2">
              <h3 className="text-xl font-bold text-foreground">
                {language === 'en' ? 'Vocabulary Practice' : 'Ku Celceli Erayada'}
              </h3>
              <p className="text-sm text-muted-foreground">
                {language === 'en'
                  ? `Learn ${Object.keys(currentLesson.keyWords).length} key words from "${currentLesson.title}"`
                  : `Baro ${Object.keys(currentLesson.keyWords).length} eray oo muhiim ah oo ka mid ah "${currentLesson.title}"`
                }
              </p>
            </div>

            {/* Lesson Context */}
            <Card className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
              <div className="text-center space-y-2">
                <h4 className="text-sm font-medium text-blue-800">
                  {language === 'en' ? 'From this lesson:' : 'Casharkan ka soo baxay:'}
                </h4>
                <p className="text-blue-900 font-medium">{currentLesson.english}</p>
                <p className="text-purple-700">{currentLesson.somali}</p>
              </div>
            </Card>

            {/* Vocabulary Cards */}
            <div className="space-y-4">
              {Object.entries(currentLesson.keyWords).map(([english, somali], index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-muted-foreground">
                      {language === 'en' ? `Word ${index + 1} of ${Object.keys(currentLesson.keyWords).length}` : `Erayga ${index + 1} ee ${Object.keys(currentLesson.keyWords).length}`}
                    </span>
                  </div>
                  <VocabularyFlashcard
                    englishWord={english}
                    somaliWord={somali}
                    example={`"${currentLesson.english}"`}
                    somaliExample={`"${currentLesson.somali}"`}
                    language={language}
                  />
                </div>
              ))}
            </div>

            {/* Study Tips */}
            <Card className="p-4 bg-yellow-50 border-yellow-200">
              <h4 className="text-sm font-semibold text-yellow-800 mb-2">
                {language === 'en' ? 'Study Tips:' : 'Tilmaamaha Waxbarasho:'}
              </h4>
              <ul className="space-y-1 text-sm text-yellow-700">
                <li>• {language === 'en' ? 'Practice saying each word out loud' : 'Ku celi eray kasta oo cod dheer'}</li>
                <li>• {language === 'en' ? 'Use the flip feature to test yourself' : 'Isticmaal "Rogaal" si aad is tijaabiso'}</li>
                <li>• {language === 'en' ? 'Listen to pronunciation multiple times' : 'Dhegeyso dhawaqa mar badan'}</li>
              </ul>
            </Card>
          </div>
        )}

        {/* Pronunciation Practice */}
        {practiceMode === 'pronunciation' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground text-center">
              {language === 'en' ? 'Pronunciation Practice' : 'Ku Celceli Dhawaqa'}
            </h3>
            {Object.entries(currentLesson.keyWords).slice(0, 2).map(([english, somali], index) => (
              <PronunciationGuide
                key={index}
                word={english}
                phonetic={english.toLowerCase().replace(/[aeiou]/g, (vowel) => {
                  const phonetics: Record<string, string> = { 'a': 'eɪ', 'e': 'iː', 'i': 'aɪ', 'o': 'oʊ', 'u': 'uː' };
                  return phonetics[vowel] || vowel;
                })}
                tips={[
                  language === 'en'
                    ? `In Somali, this is pronounced as "${somali}"`
                    : `Af-Soomaaliga, waxaa loo dhahaa "${somali}"`,
                  language === 'en'
                    ? 'Break it down into syllables'
                    : 'U kala qaybi erayada',
                  language === 'en'
                    ? 'Practice slowly at first'
                    : 'Marka hore si tartiib ah u ku celi'
                ]}
                language={language}
              />
            ))}
          </div>
        )}

        {/* Navigation */}
        <div className="flex space-x-3">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentPracticeIndex === 0}
            className="flex-1"
          >
            {language === 'en' ? 'Previous' : 'Hore'}
          </Button>
          <Button
            onClick={handleNext}
            disabled={currentPracticeIndex === allLessons.length - 1}
            className="flex-1"
          >
            {language === 'en' ? 'Next' : 'Xiga'}
          </Button>
        </div>
      </main>

      <BottomNav currentPage="practice" language={language} />
    </div>
  );
}
