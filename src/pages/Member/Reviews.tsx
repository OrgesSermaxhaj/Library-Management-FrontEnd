
import { useState, useEffect } from "react";
import MemberLayout from "@/components/layout/MemberLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Rating } from "@/components/reviews/Rating";
import { useReviews } from "@/hooks/useReviews";
import { BookReview } from "@/components/reviews/BookReview";
import { useAuth } from "@/contexts/AuthContext";
import { v4 as uuidv4 } from 'uuid';
import api from "@/lib/api";

const Reviews = () => {
  const { myReviews, popularReviews, addReview } = useReviews();
  const { user } = useAuth();
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [activeTab, setActiveTab] = useState("my-reviews");

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const [books, setBooks] = useState<{ id: number; title: string; author: string }[]>([]);

  useEffect(() => {
    // Fetch books from the backend
    const fetchBooks = async () => {
      try {
        const response = await api.get('/books');
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };
    fetchBooks();
  }, []);

  const handleSubmitReview = async () => {
    if (!reviewText.trim() || rating === 0) {
      alert('Please provide both a review text and a rating');
      return;
    }

    try {
      // Get the selected book from the dropdown
      const bookSelect = document.querySelector('select') as HTMLSelectElement;
      const selectedBook = bookSelect.value;
      const selectedBookObj = books.find(b => `${b.title} by ${b.author}` === selectedBook);
      
      if (!selectedBookObj) {
        alert('Please select a valid book');
        return;
      }

      // Create the review object
      const review = {
        bookId: selectedBookObj.id,
        userId: user?.id || 0,
        comment: reviewText,
        rating: rating
      };

      // Submit the review
      await addReview(review);
      setReviewText('');
      setRating(0);
      setActiveTab('my-reviews');
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Failed to submit review. Please try again.');
    }
  };

  return (
    <MemberLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Book Reviews</h1>
        
        <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-4">
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
                    onClick={() => setActiveTab("write")}
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
                    <option value="">-- Select a book --</option>
                    {books.map((book) => (
                      <option key={book.id} value={`${book.title} by ${book.author}`}>
                        {book.title} by {book.author}
                      </option>
                    ))}
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
                  <Button onClick={handleSubmitReview}>Submit Review</Button>
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
