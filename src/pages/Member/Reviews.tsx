
import { useState } from "react";
import MemberLayout from "@/components/layout/MemberLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Rating } from "@/components/reviews/Rating";
import { useReviews } from "@/hooks/useReviews";
import { BookReview } from "@/components/reviews/BookReview";

const Reviews = () => {
  const { myReviews, popularReviews } = useReviews();
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);

  return (
    <MemberLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Book Reviews</h1>
        
        <Tabs defaultValue="my-reviews" className="space-y-4">
          <TabsList>
            <TabsTrigger value="my-reviews">My Reviews</TabsTrigger>
            <TabsTrigger value="popular">Popular Reviews</TabsTrigger>
            <TabsTrigger value="write">Write a Review</TabsTrigger>
          </TabsList>
          
          <TabsContent value="my-reviews" className="space-y-4">
            {myReviews.length === 0 ? (
              <Card>
                <CardContent className="py-10 text-center">
                  <p className="text-muted-foreground">You haven't written any reviews yet.</p>
                  <Button 
                    variant="link" 
                    className="mt-2"
                    onClick={() => document.querySelector('[data-value="write"]')?.click()}
                  >
                    Write your first review
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {myReviews.map((review) => (
                  <BookReview key={review.id} review={review} isEditable />
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="popular" className="space-y-4">
            <div className="grid gap-4">
              {popularReviews.map((review) => (
                <BookReview key={review.id} review={review} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="write">
            <Card>
              <CardHeader>
                <CardTitle>Write a Review</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium">Select a Book</label>
                  <select className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700">
                    <option>-- Select a recently borrowed book --</option>
                    <option>The Great Gatsby by F. Scott Fitzgerald</option>
                    <option>To Kill a Mockingbird by Harper Lee</option>
                    <option>1984 by George Orwell</option>
                  </select>
                </div>
                
                <div className="space-y-1">
                  <label className="text-sm font-medium">Your Rating</label>
                  <Rating rating={rating} onRatingChange={setRating} editable />
                </div>
                
                <div className="space-y-1">
                  <label className="text-sm font-medium">Your Review</label>
                  <Textarea 
                    placeholder="Write your thoughts about this book..." 
                    className="min-h-[120px]"
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                  />
                </div>
                
                <div className="flex justify-end">
                  <Button>Submit Review</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MemberLayout>
  );
};

export default Reviews;
