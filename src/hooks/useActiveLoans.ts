import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { loanService } from '@/services/loans';
import { toast } from 'sonner';

export function useActiveLoans(userId?: number) {
  const queryClient = useQueryClient();

  const { data: loans = [], isLoading, error } = useQuery({
    queryKey: ['activeLoans', userId],
    queryFn: () => loanService.getActiveLoans(),
    enabled: !!userId,
    retry: 1,
  });

  const returnLoanMutation = useMutation({
    mutationFn: loanService.returnBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activeLoans'] });
      toast.success('Book returned successfully');
    },
    onError: (error: any) => {
      console.error('Failed to return book:', error);
      toast.error(error.response?.data?.message || 'Failed to return book');
    },
  });

  // Handle query errors
  if (error) {
    console.error('Failed to fetch active loans:', error);
    toast.error((error as any).response?.data?.message || 'Failed to load active loans');
  }

  return {
    loans,
    isLoading,
    error: error ? (error as any).response?.data?.message || 'Failed to load active loans' : null,
    returnLoan: returnLoanMutation.mutate,
    isReturning: returnLoanMutation.isPending
  };
}
