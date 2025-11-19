import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { QuizOption } from "@/components/QuizOption";
import { ProgressBar } from "@/components/ProgressBar";
import { quizQuestions } from "@/data/quizData";
import { Trophy, RotateCcw, Play } from "lucide-react";

type QuizState = "start" | "playing" | "finished";

const Index = () => {
  const [quizState, setQuizState] = useState<QuizState>("start");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);

  const handleStartQuiz = () => {
    setQuizState("playing");
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setAnswered(false);
  };

  const handleSelectAnswer = (index: number) => {
    if (answered) return;
    setSelectedAnswer(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;
    
    setAnswered(true);
    
    if (selectedAnswer === quizQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setAnswered(false);
      } else {
        setQuizState("finished");
      }
    }, 1500);
  };

  const getScoreMessage = () => {
    const percentage = (score / quizQuestions.length) * 100;
    if (percentage === 100) return "Perfect! You're a genius! 🎉";
    if (percentage >= 80) return "Excellent work! 🌟";
    if (percentage >= 60) return "Good job! 👍";
    if (percentage >= 40) return "Not bad! Keep practicing! 💪";
    return "Keep learning! You'll do better next time! 📚";
  };

  if (quizState === "start") {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background to-muted">
        <Card className="w-full max-w-2xl p-8 md:p-12 text-center shadow-2xl">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary-glow mb-6">
              <Trophy className="w-10 h-10 text-primary-foreground" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              Quiz Master
            </h1>
            <p className="text-lg text-muted-foreground max-w-md mx-auto">
              Test your knowledge with {quizQuestions.length} challenging questions. Are you ready?
            </p>
          </div>
          
          <Button
            onClick={handleStartQuiz}
            size="lg"
            className="bg-gradient-to-r from-primary to-primary-glow hover:opacity-90 transition-opacity text-lg px-8 py-6 h-auto"
          >
            <Play className="w-5 h-5 mr-2" />
            Start Quiz
          </Button>
        </Card>
      </div>
    );
  }

  if (quizState === "finished") {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background to-muted">
        <Card className="w-full max-w-2xl p-8 md:p-12 text-center shadow-2xl">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary-glow mb-6 animate-bounce">
              <Trophy className="w-10 h-10 text-primary-foreground" />
            </div>
            <h2 className="text-4xl font-bold mb-4">Quiz Complete!</h2>
            <p className="text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              {score}/{quizQuestions.length}
            </p>
            <p className="text-xl text-muted-foreground mb-2">
              {getScoreMessage()}
            </p>
            <p className="text-muted-foreground">
              You got {Math.round((score / quizQuestions.length) * 100)}% correct
            </p>
          </div>

          <Button
            onClick={handleStartQuiz}
            size="lg"
            className="bg-gradient-to-r from-primary to-primary-glow hover:opacity-90 transition-opacity text-lg px-8 py-6 h-auto"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Restart Quiz
          </Button>
        </Card>
      </div>
    );
  }

  const question = quizQuestions[currentQuestion];

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background to-muted">
      <Card className="w-full max-w-3xl p-6 md:p-8 shadow-2xl">
        <div className="mb-8">
          <ProgressBar current={currentQuestion + 1} total={quizQuestions.length} />
        </div>

        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">
            {question.question}
          </h2>

          <div className="space-y-3">
            {question.options.map((option, index) => (
              <QuizOption
                key={index}
                option={option}
                index={index}
                selected={selectedAnswer === index}
                answered={answered}
                isCorrect={index === question.correctAnswer}
                onClick={() => handleSelectAnswer(index)}
              />
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            onClick={handleSubmitAnswer}
            disabled={selectedAnswer === null || answered}
            size="lg"
            className="bg-gradient-to-r from-primary to-primary-glow hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {answered ? "Next Question..." : "Submit Answer"}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Index;
