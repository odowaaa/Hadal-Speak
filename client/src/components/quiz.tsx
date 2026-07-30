import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { QuizQuestion } from "@shared/schema";
import { HelpCircle, Trophy } from "lucide-react";

interface QuizProps {
  questions: QuizQuestion[];
  onComplete: (score: number) => void;
  language: string;
}

export default function Quiz({ questions, onComplete, language }: QuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  if (questions.length === 0) return null;

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNext = () => {
    if (selectedAnswer === null) return;

    const newAnswers = [...answers, selectedAnswer];
    setAnswers(newAnswers);

    if (isLastQuestion) {
      // Calculate score
      const score = newAnswers.reduce((acc, answer, index) => {
        return acc + (answer === questions[index].correctAnswer ? 1 : 0);
      }, 0);
      
      setIsCompleted(true);
      onComplete(score);
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
    }
  };

  const handleRetake = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setAnswers([]);
    setShowResult(false);
    setIsCompleted(false);
  };

  if (isCompleted) {
    const score = answers.reduce((acc, answer, index) => {
      return acc + (answer === questions[index].correctAnswer ? 1 : 0);
    }, 0);
    const percentage = Math.round((score / questions.length) * 100);

    return (
      <Card className="p-6 shadow-sm border border-border">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
            <Trophy className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-xl font-bold text-foreground">
            {language === 'en' ? 'Quiz Complete!' : 'Imtixaanka la dhammaystiray!'}
          </h3>
          <p className="text-muted-foreground">
            {language === 'en' ? `You scored ${percentage}% (${score}/${questions.length})` : `Waxaad hesatay ${percentage}% (${score}/${questions.length})`}
          </p>
          <Button onClick={handleRetake} variant="outline" className="mt-4">
            {language === 'en' ? 'Retake Quiz' : 'Dib u qaado'}
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 shadow-sm border border-border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground flex items-center">
          <HelpCircle className="text-red-500 mr-2 h-5 w-5" />
          {language === 'en' ? 'Quick Quiz' : 'Imtixaan Dheeraad ah'}
        </h3>
        <span className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded-full font-medium">
          {currentQuestionIndex + 1}/{questions.length}
        </span>
      </div>
      
      <div className="space-y-4">
        <p className="text-foreground font-medium">{currentQuestion.question}</p>
        
        {/* Quiz Options */}
        <div className="space-y-2">
          {currentQuestion.options.map((option, index) => (
            <Button
              key={index}
              variant="outline"
              onClick={() => handleAnswerSelect(index)}
              className={`w-full text-left p-3 rounded-lg border transition-colors ${
                selectedAnswer === index
                  ? 'border-primary bg-blue-50'
                  : 'border-border hover:border-primary hover:bg-blue-50'
              }`}
            >
              <span className="font-medium">{String.fromCharCode(65 + index)}.</span> {option}
            </Button>
          ))}
        </div>
        
        <Button
          onClick={handleNext}
          disabled={selectedAnswer === null}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-4 rounded-xl transition-colors"
        >
          {isLastQuestion 
            ? (language === 'en' ? 'Submit Quiz' : 'Gudbi Jawaabta')
            : (language === 'en' ? 'Next Question' : 'Su\'aasha Xigta')
          }
        </Button>
      </div>
    </Card>
  );
}
