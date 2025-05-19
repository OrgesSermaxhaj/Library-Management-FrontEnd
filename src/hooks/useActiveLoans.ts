import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { loanService, Loan } from '@/services/loans';
import { toast } from 'sonner';

export { type Loan } from '@/services/loans';

export function useActiveLoans() {
  const queryClient = useQueryClient();

  const { data: loans = [], isLoading, error } = useQuery({
    queryKey: ['activeLoans'],
    queryFn: loanService.getActiveLoans
  });

  const returnLoan = useMutation({
    mutationFn: (loanId: string) => loanService.returnBook(loanId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activeLoans'] });
      toast.success('Book returned successfully');
    },
    onError: (error) => {
      toast.error('Failed to return book');
      console.error('Return book error:', error);
    }
  });

  return {
    loans,
    isLoading,
    error: error ? 'Failed to load active loans' : null,
    returnLoan: returnLoan.mutate
  };
}
