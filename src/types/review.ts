
export interface Comment {
  userId: number;
  text: string;
  date: string;
}

export type NewComment = {
  userId: number;
  text: string;
};

export interface Review {
  id: string;
  bookId: number;
  userId: number;
  comment: string;
  rating: number;
  date: string;
  comments?: Comment[];
  isMyReview?: boolean;
  user?: string; // Optional field for user email
}
