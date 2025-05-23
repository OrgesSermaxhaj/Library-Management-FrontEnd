import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';
import { loanService, Loan } from '@/services/loans';
import api from '@/lib/api';
import { format, parseISO, differenceInDays } from 'date-fns';

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

// Fine service
const fineService = {
  getUserFines: async (userId: number) => {
    const response = await api.get(`/fines/user/${userId}`);
    return response.data;
  }
};

export function useFinesHistory() {
  const { user } = useAuth();

  // Fetch loan history
  const { data: loanHistory = [], isLoading: isLoadingLoans, error: loanError } = useQuery({
    queryKey: ['loanHistory'],
    queryFn: loanService.getLoanHistory,
  });

  // Fetch user fines
  const { data: fines = [], isLoading: isLoadingFines, error: fineError } = useQuery({
    queryKey: ['userFines', user?.id],
    queryFn: () => fineService.getUserFines(user?.id || 0),
    enabled: !!user?.id
  });

  // Process loan history into history records
  const history: LoanHistoryRecord[] = loanHistory.map(loan => ({
    id: loan.id.toString(),
    title: loan.bookTitle,
    author: loan.authorName,
    borrowDate: loan.loanDate,
    returnDate: loan.returnDate || '',
    status: loan.returnStatus === 'LATE' ? 'overdue' : 'returned'
  }));

  // Process fines into fine records
  const fineRecords: FineRecord[] = loanHistory
    .filter(loan => loan.returnStatus === 'LATE')
    .map(loan => {
      const matchingFine = fines.find(fine => fine.issuedDate === loan.returnDate);
      const dueDate = parseISO(loan.dueDate);
      const returnDate = loan.returnDate ? parseISO(loan.returnDate) : new Date();
      const daysLate = differenceInDays(returnDate, dueDate);

      return {
        id: loan.id.toString(),
        amount: 10.00, // Fixed $10 fine amount
        date: loan.returnDate || '',
        title: loan.bookTitle,
        status: matchingFine?.paid ? 'paid' : 'unpaid',
        daysLate: Math.max(0, daysLate)
      };
    });

  // Calculate total unpaid fines
  const totalUnpaid = fineRecords
    .filter(fine => fine.status === 'unpaid')
    .reduce((sum, fine) => sum + fine.amount, 0);

  const finesHistory: FinesHistory = {
    totalUnpaid,
    fines: fineRecords,
    history
  };

  return {
    finesHistory,
    isLoading: isLoadingLoans || isLoadingFines,
    error: loanError || fineError,
    payFine: () => {
      // This is a no-op since fines must be paid at the library desk
      console.log('Fines must be paid at the library desk');
    }
  };
}
