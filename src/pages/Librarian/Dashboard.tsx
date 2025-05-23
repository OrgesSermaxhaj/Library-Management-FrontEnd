import LibrarianLayout from "@/components/layout/LibrarianLayout";
import { Book, Library, Package, Calendar, UserCog, ClipboardList } from "lucide-react";
import { useStats } from "@/hooks/useStats";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { loanService } from "@/services/loans";
import { reservationService, ReservationStatus } from "@/services/reservations";
import { isAfter, parseISO, isToday, format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { toast } from "sonner";
import StatsCard from "@/components/dashboard/StatsCard";
import TodaysActivity from "@/components/dashboard/TodaysActivity";
import { useNavigate } from 'react-router-dom';

const LibrarianDashboard = () => {
  const { stats, isLoading: statsLoading } = useStats();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  
  // Fetch active loans
  const { data: activeLoans = [], isLoading: activeLoansLoading } = useQuery({
    queryKey: ['activeLoans'],
    queryFn: loanService.getActiveLoans,
    refetchInterval: 5000
  });

  // Fetch reservations
  const { data: reservations = [], isLoading: reservationsLoading } = useQuery({
    queryKey: ['reservations'],
    queryFn: reservationService.getReservations,
    refetchInterval: 5000
  });

  // Calculate overdue loans (status 'LATE')
  const overdueLoans = activeLoans.filter(loan => 
    loan.status && loan.status.toUpperCase() === 'LATE'
  );

  // Calculate today's reservations
  const todayReservations = reservations.filter(r => 
    r.status === 'APPROVED' &&
    isToday(parseISO(r.loanDate))
  );

  // Calculate approved reservations (for 'Books Reserved Today')
  const approvedReservations = reservations.filter(r => 
    r.status === 'APPROVED' &&
    isToday(parseISO(r.loanDate))
  );

  // Update reservation status mutation
  const updateStatusMutation = useMutation({
    mutationFn: async ({ reservationId, status }: { reservationId: number; status: ReservationStatus }) => {
      return await reservationService.updateReservationStatus(reservationId, status);
    },
    onSuccess: (_, variables) => {
      // Invalidate all relevant queries to ensure UI is updated
      queryClient.invalidateQueries({ queryKey: ['reservations'] });
      queryClient.invalidateQueries({ queryKey: ['activeLoans'] });
      queryClient.invalidateQueries({ queryKey: ['books'] });
      queryClient.invalidateQueries({ queryKey: ['stats'] }); // Invalidate stats to update counts
      
      if (variables.status === 'APPROVED') {
        toast.success('Reservation approved and ready for pickup');
      } else if (variables.status === 'REJECTED') {
        toast.success('Reservation rejected');
      } else if (variables.status === 'CANCELLED') {
        toast.success('Reservation cancelled');
      }
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update reservation status');
    }
  });

  const handleApproveReservation = (reservationId: number) => {
    updateStatusMutation.mutate({ reservationId, status: 'APPROVED' });
  };

  const handleRejectReservation = (reservationId: number) => {
    updateStatusMutation.mutate({ reservationId, status: 'REJECTED' });
  };
  
  const renderContent = () => {
    if (statsLoading || activeLoansLoading || reservationsLoading) {
      return (
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      );
    }

    if (!stats) {
      return (
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500">Failed to load dashboard data</p>
        </div>
      );
    }

    return (
      <div className="space-y-6 p-4 md:p-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">Librarian Dashboard</h1>
        {/* Stats Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          {/* Total Books */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex items-center justify-between">
            <div>
              <div className="text-gray-500 text-sm mb-1">Total Books</div>
              <div className="text-3xl font-bold text-gray-900 dark:text-gray-100">{stats.totalBooks.value}</div>
            </div>
            <Book className="w-10 h-10 text-indigo-400" />
          </div>
          {/* Currently Borrowed */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex items-center justify-between">
            <div>
              <div className="text-gray-500 text-sm mb-1">Currently Borrowed</div>
              <div className="text-3xl font-bold text-gray-900 dark:text-gray-100">{activeLoans.length}</div>
            </div>
            <Library className="w-10 h-10 text-indigo-400" />
          </div>
        </div>
        {/* Management Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          {/* Loan Management */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex items-center justify-between cursor-pointer hover:shadow-md transition" onClick={() => navigate('/librarian/loans')}>
            <div>
              <div className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-1">Loan Management</div>
              <div className="text-gray-500 text-sm">Manage book loans, returns, and overdue items</div>
            </div>
            <UserCog className="w-10 h-10 text-indigo-400" />
          </div>
          {/* Reservations */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex items-center justify-between cursor-pointer hover:shadow-md transition" onClick={() => navigate('/librarian/reservations')}>
            <div>
              <div className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-1">Reservations</div>
              <div className="text-gray-500 text-sm">View and manage book reservations</div>
            </div>
            <ClipboardList className="w-10 h-10 text-indigo-400" />
          </div>
        </div>
        {/* Books Borrowed Today */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Books Borrowed Today</h2>
          <div className="space-y-4">
            {activeLoans.filter(loan => isToday(parseISO(loan.loanDate))).length === 0 ? (
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
                No books borrowed today
              </p>
            ) : (
              activeLoans
                .filter(loan => isToday(parseISO(loan.loanDate)))
                .map(loan => (
                  <div key={loan.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div>
                      <p className="font-medium">{loan.bookTitle}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{loan.userFullName}</p>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {format(parseISO(loan.loanDate), 'h:mm a')}
                    </span>
                  </div>
                ))
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <LibrarianLayout>
      {renderContent()}
    </LibrarianLayout>
  );
};

export default LibrarianDashboard;
