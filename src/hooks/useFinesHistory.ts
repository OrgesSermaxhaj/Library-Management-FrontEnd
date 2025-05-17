
import { useState, useEffect } from 'react';

export interface FineRecord {
  id: string;
  amount: number;
  date: string;
  title: string;
  status: 'paid' | 'unpaid';
  daysLate: number;
}

export interface LoanHistoryRecord {
  id: string;
  title: string;
  author: string;
  borrowDate: string;
  returnDate: string;
  status: 'returned' | 'overdue' | 'lost';
}

export interface FinesHistory {
  totalUnpaid: number;
  fines: FineRecord[];
  history: LoanHistoryRecord[];
}

export function useFinesHistory() {
  const [finesHistory, setFinesHistory] = useState<FinesHistory | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    // Simulate API call
    const fetchFinesHistory = () => {
      setIsLoading(true);
      
      // Dummy data
      setTimeout(() => {
        const dummyFinesHistory: FinesHistory = {
          totalUnpaid: 12.50,
          fines: [
            {
              id: "fine-1",
              amount: 7.50,
              date: "2025-04-10",
              title: "The Silent Patient",
              status: 'unpaid',
              daysLate: 15
            },
            {
              id: "fine-2",
              amount: 5.00,
              date: "2025-03-22",
              title: "Dune",
              status: 'unpaid',
              daysLate: 10
            },
            {
              id: "fine-3",
              amount: 3.75,
              date: "2025-02-15",
              title: "The Great Gatsby",
              status: 'paid',
              daysLate: 7
            }
          ],
          history: [
            {
              id: "hist-1",
              title: "The Silent Patient",
              author: "Alex Michaelides",
              borrowDate: "2025-03-15",
              returnDate: "2025-04-10",
              status: 'overdue'
            },
            {
              id: "hist-2",
              title: "Dune",
              author: "Frank Herbert",
              borrowDate: "2025-03-01",
              returnDate: "2025-03-22",
              status: 'returned'
            },
            {
              id: "hist-3",
              title: "The Great Gatsby",
              author: "F. Scott Fitzgerald",
              borrowDate: "2025-01-28",
              returnDate: "2025-02-15",
              status: 'returned'
            },
            {
              id: "hist-4",
              title: "The Alchemist",
              author: "Paulo Coelho",
              borrowDate: "2024-12-10",
              returnDate: "2024-12-31",
              status: 'returned'
            }
          ]
        };
        
        setFinesHistory(dummyFinesHistory);
        setIsLoading(false);
        setError(null);
      }, 500);
    };
    
    fetchFinesHistory();
  }, []);
  
  const payFine = (fineId: string) => {
    if (finesHistory) {
      const updatedFines = finesHistory.fines.map(fine => 
        fine.id === fineId ? {...fine, status: 'paid' as const} : fine
      );
      
      const totalUnpaid = updatedFines
        .filter(fine => fine.status === 'unpaid')
        .reduce((sum, fine) => sum + fine.amount, 0);
      
      setFinesHistory({
        ...finesHistory,
        fines: updatedFines,
        totalUnpaid
      });
    }
  };
  
  return { finesHistory, isLoading, error, payFine };
}
