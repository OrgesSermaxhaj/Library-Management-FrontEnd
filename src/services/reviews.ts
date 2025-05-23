import api from "@/lib/api";
import { Review, Comment, NewComment } from "@/types/review";

export const reviewsService = {
  // Get all reviews
  getAllReviews: async (): Promise<Review[]> => {
    const response = await api.get("/reviews");
    return response.data;
  },

  // Get popular reviews
  getPopularReviews: async (): Promise<Review[]> => {
    const response = await api.get("/reviews/popular");
    return response.data;
  },

  // Get user's reviews
  getMyReviews: async (): Promise<Review[]> => {
    const response = await api.get("/reviews/my");
    return response.data;
  },

  // Create a new review
  createReview: async (review: Omit<Review, 'id'>): Promise<Review> => {
    const response = await api.post("/reviews", review);
    return response.data;
  },

  // Update an existing review
  updateReview: async (id: string, review: Partial<Review>): Promise<Review> => {
    const response = await api.put(`/reviews/${id}`, review);
    return response.data;
  },

  // Delete a review
  deleteReview: async (id: string): Promise<void> => {
    await api.delete(`/reviews/${id}`);
  },

  // Add a comment to a review
  addComment: async (reviewId: string, comment: NewComment): Promise<Review> => {
    const response = await api.post(`/reviews/${reviewId}/comments`, {
      ...comment,
      date: new Date().toISOString()
    });
    return response.data;
  },
};
