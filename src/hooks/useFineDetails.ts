import { useQuery } from '@tanstack/react-query';
import { format, parseISO } from 'date-fns';
import { loanService, Loan } from '@/services/loans';
import api from '@/lib/api';

interface LoanDto {
  id: number;
  title: string;
  author: string;
  loanDate: string;
  dueDate: string;
  returnDate?: string;
  status: "ACTIVE" | "RETURNED";
  returnStatus: "PENDING" | "ON_TIME" | "LATE";
}

interface FineDto {
  id: number;
  amount: string;
  issuedDate: string;
  paid: boolean;
}

interface FineDetailsRow {
  loanId: number;
  title: string;
  checkoutDate: string;
  dueDate: string;
  returnDate: string;
  fineAmount: string;
  finePaid: boolean;
}

// Fine service
const fineService = {
  getUserFines: async (userId: number): Promise<FineDto[]> => {
    const response = await api.get(`/fines/user/${userId}`);
    return response.data;
  }
};

export function useFineDetails(userId: number) {
  // Fetch loan history
  const { data: loanHistory = [], isLoading: isLoadingLoans, error: loanError } = useQuery({
    queryKey: ['loanHistory'],
    queryFn: loanService.getLoanHistory,
  });

  // Fetch user fines
  const { data: fines = [], isLoading: isLoadingFines, error: fineError } = useQuery({
    queryKey: ['userFines', userId],
    queryFn: () => fineService.getUserFines(userId),
  });

  // Process and combine the data
  const fineDetails: FineDetailsRow[] = loanHistory
    .filter(loan => loan.returnStatus === "LATE")
    .map(loan => {
      const matchingFine = fines.find(fine => 
        fine.issuedDate === loan.returnDate
      );

      return {
        loanId: loan.id,
        title: loan.bookTitle,
        checkoutDate: loan.loanDate,
        dueDate: loan.dueDate,
        returnDate: loan.returnDate || '',
        fineAmount: matchingFine?.amount || "10.00",
        finePaid: matchingFine?.paid ?? false
      };
    });

  const formatDate = (dateString: string) => {
    try {
      return format(parseISO(dateString), 'MMM d, yyyy');
    } catch (error) {
      return 'Invalid Date';
    }
  };

  return {
    fineDetails,
    isLoading: isLoadingLoans || isLoadingFines,
    error: loanError || fineError,
    formatDate
  };
} 