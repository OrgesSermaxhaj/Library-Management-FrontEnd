import { useState, useEffect } from "react";
import { Review, NewComment } from "@/types/review";
import { reviewsService } from "@/services/reviews";
import { useAuth } from "@/contexts/AuthContext";

export const useReviews = () => {
  const [myReviews, setMyReviews] = useState<Review[]>([]);
  const [popularReviews, setPopularReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setIsLoading(true);
        const [myData, popularData] = await Promise.all([
          reviewsService.getMyReviews(),
          reviewsService.getPopularReviews()
        ]);

        // Add isMyReview flag to popular reviews
        const popularWithFlags = popularData.map(review => ({
          ...review,
          isMyReview: review.user === user?.email
        }));

        setMyReviews(myData);
        setPopularReviews(popularWithFlags);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, [user]);

  const addReview = async (review: Omit<Review, 'id'>): Promise<Review> => {
    try {
      const newReview = await reviewsService.createReview(review);
      setMyReviews(prev => [newReview, ...prev]);
      return newReview;
    } catch (error) {
      console.error('Error adding review:', error);
      throw error;
    }
  };

  const updateReview = async (id: string, review: Partial<Review>): Promise<Review> => {
    try {
      const updatedReview = await reviewsService.updateReview(id, review);
      setMyReviews(prev => prev.map(r => r.id === id ? updatedReview : r));
      return updatedReview;
    } catch (error) {
      console.error('Error updating review:', error);
      throw error;
    }
  };

  const deleteReview = async (id: string): Promise<void> => {
    try {
      await reviewsService.deleteReview(id);
      setMyReviews(prev => prev.filter(r => r.id !== id));
    } catch (error) {
      console.error('Error deleting review:', error);
      throw error;
    }
  };

  const addComment = async (reviewId: string, comment: NewComment): Promise<Review> => {
    try {
      const updatedReview = await reviewsService.addComment(reviewId, comment);
      setMyReviews(prev => prev.map(r => r.id === reviewId ? updatedReview : r));
      setPopularReviews(prev => prev.map(r => r.id === reviewId ? updatedReview : r));
      return updatedReview;
    } catch (error) {
      console.error('Error adding comment:', error);
      throw error;
    }
  };

  return {
    myReviews,
    popularReviews,
    isLoading,
    addReview,
    updateReview,
    deleteReview,
    addComment,
  };
};
