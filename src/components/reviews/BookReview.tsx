import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Rating } from "@/components/reviews/Rating";
import { Review } from "@/types/review";

interface BookReviewProps {
  review: Review;
}

export const BookReview = ({ review }: BookReviewProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg">{review.bookTitle}</h3>
            <p className="text-sm text-muted-foreground">{review.authorName}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 mb-2">
          <Rating rating={review.rating} />
          <span className="text-sm text-muted-foreground">
            {new Date(review.date).toLocaleDateString()}
          </span>
        </div>
        <p className="text-sm">{review.comment}</p>
        
        {review.comments && review.comments.length > 0 && (
          <div className="mt-4 pt-4 border-t dark:border-gray-700">
            <h4 className="text-sm font-medium mb-2">Comments ({review.comments.length})</h4>
            <div className="space-y-3">
              {review.comments.map((comment, index) => (
                <div key={index} className="text-xs bg-slate-50 dark:bg-slate-800 p-2 rounded">
                  <div className="font-medium">{comment.userName || `User #${comment.userId}`}</div>
                  <div>{comment.text}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
