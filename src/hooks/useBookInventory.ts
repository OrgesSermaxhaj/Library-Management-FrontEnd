
import { useState, useEffect } from "react";

interface Book {
  id: string;
  title: string;
  author: string;
  stock: number;
  loans: number;
}

export const useBookInventory = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      try {
        const dummyBooks: Book[] = [
          {
            id: "book1",
            title: "The Great Gatsby",
            author: "F. Scott Fitzgerald",
            stock: 3,
            loans: 2
          },
          {
            id: "book2",
            title: "To Kill a Mockingbird",
            author: "Harper Lee",
            stock: 0,
            loans: 5
          },
          {
            id: "book3",
            title: "1984",
            author: "George Orwell",
            stock: 7,
            loans: 1
          },
          {
            id: "book4",
            title: "Pride and Prejudice",
            author: "Jane Austen",
            stock: 2,
            loans: 0
          },
          {
            id: "book5",
            title: "The Catcher in the Rye",
            author: "J.D. Salinger",
            stock: 4,
            loans: 3
          }
        ];
        
        setBooks(dummyBooks);
        setIsLoading(false);
      } catch (err) {
        setError(err as Error);
        setIsLoading(false);
      }
    }, 700);
  }, []);

  return { books, isLoading, error };
};
