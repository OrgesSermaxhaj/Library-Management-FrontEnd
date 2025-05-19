
import { useState } from "react";
import { Review } from "@/types/review";

export function useReviews() {
  const [myReviews] = useState<Review[]>([
    {
      id: "1",
      bookTitle: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      rating: 4,
      content: "A fascinating exploration of the American Dream through the lens of wealth, love, and disillusionment. Fitzgerald's prose is beautiful and evocative.",
      date: "2023-03-12",
      isMyReview: true
    },
    {
      id: "2",
      bookTitle: "To Kill a Mockingbird",
      author: "Harper Lee",
      rating: 5,
      content: "A powerful and moving story about racial injustice and moral growth. Scout's perspective offers both innocence and insight that makes the narrative especially compelling.",
      date: "2023-02-05",
      isMyReview: true,
      comments: [
        {
          user: "Librarian",
          text: "Wonderful review! We have a book club discussing this next month if you're interested.",
          date: "2023-02-06"
        }
      ]
    }
  ]);

  const [popularReviews] = useState<Review[]>([
    {
      id: "101",
      bookTitle: "The Silent Patient",
      author: "Alex Michaelides",
      rating: 5,
      content: "An incredible psychological thriller with a twist I never saw coming. The exploration of trauma and therapy is nuanced and gripping.",
      date: "2023-04-10",
      comments: [
        {
          user: "Jane D.",
          text: "I completely agree! I couldn't put it down.",
          date: "2023-04-11"
        },
        {
          user: "Mark T.",
          text: "The ending blew my mind. Best thriller I've read this year.",
          date: "2023-04-12"
        }
      ]
    },
    {
      id: "102",
      bookTitle: "Project Hail Mary",
      author: "Andy Weir",
      rating: 5,
      content: "As good as The Martian, if not better. The science is fascinating, the alien encounter is unique, and the main character's journey is both intellectual and emotional.",
      date: "2023-03-28",
      comments: [
        {
          user: "Sci-Fi Lover",
          text: "Completely agree. The friendship that develops is so well written!",
          date: "2023-03-29"
        }
      ]
    },
    {
      id: "103",
      bookTitle: "Where the Crawdads Sing",
      author: "Delia Owens",
      rating: 4,
      content: "A beautiful and haunting novel that combines a coming-of-age story with a mystery. The descriptions of the marsh and wildlife are vivid and immersive.",
      date: "2023-04-02"
    }
  ]);

  return { myReviews, popularReviews };
}
