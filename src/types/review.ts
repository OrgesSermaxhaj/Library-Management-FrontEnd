
export interface Comment {
  user: string;
  text: string;
  date: string;
}

export interface Review {
  id: string;
  bookTitle: string;
  author: string;
  rating: number;
  content: string;
  date: string;
  comments?: Comment[];
  isMyReview?: boolean;
}
