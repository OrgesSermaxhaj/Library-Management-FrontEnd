import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Review, NewComment } from "@/types/review";
import { reviewsService } from "@/services/reviews";
import { useAuth } from "@/contexts/AuthContext";
import api from "@/lib/api";

// Extended Review type with book details
interface ReviewWithBookDetails extends Review {
  bookTitle: string;
  authorName: string;
}

export const useReviews = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Fetch all reviews
  const { 
    data: allReviews = [], 
    isLoading: isLoadingReviews,
    error: reviewsError 
  } = useQuery({
    queryKey: ['reviews'],
    queryFn: async () => {
      const reviews = await reviewsService.getAllReviews();
      // Fetch book details for each review
      const reviewsWithDetails = await Promise.all(
        reviews.map(async (review) => {
          try {
            const bookResponse = await api.get(`/books/${review.bookId}`);
            return {
              ...review,
              bookTitle: bookResponse.data.title,
              authorName: bookResponse.data.author,
              isMyReview: review.userId === user?.id
            };
          } catch (error) {
            console.error(`Error fetching book details for review ${review.id}:`, error);
            return {
              ...review,
              bookTitle: 'Unknown Book',
              authorName: 'Unknown Author',
              isMyReview: review.userId === user?.id
            };
          }
        })
      );
      return reviewsWithDetails;
    },
    enabled: !!user
  });

  // Filter reviews for the current user
  const myReviews = allReviews.filter(review => review.userId === user?.id);

  // Add review mutation
  const addReviewMutation = useMutation({
    mutationFn: async (review: Omit<Review, 'id'>) => {
      const newReview = await reviewsService.createReview(review);
      // Fetch book details for the new review
      const bookResponse = await api.get(`/books/${review.bookId}`);
      return {
        ...newReview,
        bookTitle: bookResponse.data.title,
        authorName: bookResponse.data.author,
        isMyReview: true
      };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
    }
  });

  // Update review mutation
  const updateReviewMutation = useMutation({
    mutationFn: async ({ id, review }: { id: string; review: Partial<Review> }) => {
      const updatedReview = await reviewsService.updateReview(id, review);
      // Fetch book details for the updated review
      const bookResponse = await api.get(`/books/${updatedReview.bookId}`);
      return {
        ...updatedReview,
        bookTitle: bookResponse.data.title,
        authorName: bookResponse.data.author,
        isMyReview: true
      };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
    }
  });

  // Delete review mutation
  const deleteReviewMutation = useMutation({
    mutationFn: (id: string) => reviewsService.deleteReview(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
    }
  });

  // Add comment mutation
  const addCommentMutation = useMutation({
    mutationFn: async ({ reviewId, comment }: { reviewId: string; comment: NewComment }) => {
      const updatedReview = await reviewsService.addComment(reviewId, comment);
      // Fetch book details for the updated review
      const bookResponse = await api.get(`/books/${updatedReview.bookId}`);
      return {
        ...updatedReview,
        bookTitle: bookResponse.data.title,
        authorName: bookResponse.data.author,
        isMyReview: updatedReview.userId === user?.id
      };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
    }
  });

  return {
    myReviews,
    popularReviews: allReviews, // All reviews are shown in popular reviews
    isLoading: isLoadingReviews,
    error: reviewsError,
    addReview: addReviewMutation.mutate,
    updateReview: updateReviewMutation.mutate,
    deleteReview: deleteReviewMutation.mutate,
    addComment: addCommentMutation.mutate,
    isAdding: addReviewMutation.isPending,
    isUpdating: updateReviewMutation.isPending,
    isDeleting: deleteReviewMutation.isPending,
    isAddingComment: addCommentMutation.isPending
  };
};
