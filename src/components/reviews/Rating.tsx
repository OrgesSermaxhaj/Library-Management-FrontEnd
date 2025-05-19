
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingProps {
  rating: number;
  onRatingChange?: (rating: number) => void;
  editable?: boolean;
  className?: string;
}

export const Rating = ({ rating, onRatingChange, editable = false, className }: RatingProps) => {
  const stars = Array(5).fill(0);
  
  const handleClick = (index: number) => {
    if (editable && onRatingChange) {
      onRatingChange(index + 1);
    }
  };
  
  return (
    <div className={cn("flex", className)}>
      {stars.map((_, index) => {
        const filled = index < rating;
        return (
          <Star
            key={index}
            className={cn(
              "w-5 h-5 cursor-default transition-colors",
              filled ? "text-yellow-400 fill-yellow-400" : "text-gray-300 dark:text-gray-600",
              editable && "cursor-pointer hover:text-yellow-300"
            )}
            onClick={() => handleClick(index)}
          />
        );
      })}
    </div>
  );
};
