
import { useState, useEffect } from 'react';

export interface Loan {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  dueDate: string;
  isOverdue: boolean;
}

export function useActiveLoans() {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    // Simulate API call
    const fetchLoans = () => {
      setIsLoading(true);
      
      // Dummy data
      setTimeout(() => {
        const dummyLoans: Loan[] = [
          {
            id: "loan-1",
            title: "The Midnight Library",
            author: "Matt Haig",
            coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=100",
            dueDate: "2025-05-25",
            isOverdue: false
          },
          {
            id: "loan-2",
            title: "Atomic Habits",
            author: "James Clear",
            coverImage: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=100",
            dueDate: "2025-05-18",
            isOverdue: true
          },
          {
            id: "loan-3",
            title: "Project Hail Mary",
            author: "Andy Weir",
            coverImage: "https://images.unsplash.com/photo-1629992101753-56d196c8aabb?q=80&w=100",
            dueDate: "2025-06-01",
            isOverdue: false
          }
        ];
        
        setLoans(dummyLoans);
        setIsLoading(false);
        setError(null);
      }, 500);
    };
    
    fetchLoans();
  }, []);
  
  const returnLoan = (loanId: string) => {
    setLoans(prevLoans => prevLoans.filter(loan => loan.id !== loanId));
  };
  
  return { loans, isLoading, error, returnLoan };
}
