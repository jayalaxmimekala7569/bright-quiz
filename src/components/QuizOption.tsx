import { cn } from "@/lib/utils";

interface QuizOptionProps {
  option: string;
  index: number;
  selected: boolean;
  answered: boolean;
  isCorrect?: boolean;
  onClick: () => void;
}

export const QuizOption = ({ 
  option, 
  index, 
  selected, 
  answered, 
  isCorrect, 
  onClick 
}: QuizOptionProps) => {
  const letters = ['A', 'B', 'C', 'D'];
  
  const getOptionStyle = () => {
    if (!answered) {
      return selected 
        ? "border-primary bg-primary/10 shadow-md" 
        : "border-border hover:border-primary/50 hover:shadow-sm";
    }
    
    if (selected) {
      return isCorrect 
        ? "border-success bg-success/10" 
        : "border-destructive bg-destructive/10";
    }
    
    return "border-border opacity-60";
  };

  return (
    <button
      onClick={onClick}
      disabled={answered}
      className={cn(
        "w-full p-4 rounded-lg border-2 text-left transition-all duration-300",
        "flex items-center gap-4 group",
        getOptionStyle()
      )}
    >
      <span
        className={cn(
          "flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300",
          !answered && !selected && "bg-muted text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary",
          !answered && selected && "bg-primary text-primary-foreground",
          answered && selected && isCorrect && "bg-success text-success-foreground",
          answered && selected && !isCorrect && "bg-destructive text-destructive-foreground",
          answered && !selected && "bg-muted text-muted-foreground"
        )}
      >
        {letters[index]}
      </span>
      <span className="font-medium">{option}</span>
    </button>
  );
};
