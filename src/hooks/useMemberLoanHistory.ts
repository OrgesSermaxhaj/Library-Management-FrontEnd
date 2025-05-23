import { useQuery } from '@tanstack/react-query';
import { loanService, Loan } from '@/services/loans';
import { useAuth } from '@/contexts/AuthContext';

export function useMemberLoanHistory() {
  const { user } = useAuth();

  // Fetch active loans
  const { data: activeLoans = [], isLoading: activeLoansLoading, error: activeLoansError } = useQuery<Loan[]>({
    queryKey: ['activeLoans', user?.id],
    queryFn: loanService.getActiveLoans,
    enabled: !!user?.id,
  });

  // Fetch loan history
  const { data: loanHistory = [], isLoading: historyLoading, error: historyError } = useQuery<Loan[]>({
    queryKey: ['loanHistory', user?.id],
    queryFn: loanService.getLoanHistory,
    enabled: !!user?.id,
  });

  // Filter active loans for current user
  const userActiveLoans = activeLoans.filter(loan => loan.userId === user?.id);

  // Filter loan history for current user
  const userLoanHistory = loanHistory.filter(loan => loan.userId === user?.id);

  return {
    activeLoans: userActiveLoans,
    loanHistory: userLoanHistory,
    isLoading: activeLoansLoading || historyLoading,
    error: activeLoansError || historyError
  };
} 