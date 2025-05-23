import { useAuth } from '@/contexts/AuthContext';
import { useActiveLoans } from '@/hooks/useActiveLoans';
import { useReservations } from '@/hooks/useReservations';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { format, isValid, parseISO } from 'date-fns';
import { toast } from 'sonner';
import MemberLayout from "@/components/layout/MemberLayout";
import FinesHistoryCard from "@/components/dashboard/FinesHistoryCard";
import { Loan } from '@/services/loans';
import { Reservation } from '@/services/reservations';

const MAX_TOTAL_ITEMS = 5;

const MemberDashboard = () => {
  const { user } = useAuth();
  const { 
    loans: activeLoans = [], 
    isLoading: loansLoading, 
    error: loansError
  } = useActiveLoans(user?.id);
  
  const { 
    reservations = [], 
    isLoading: reservationsLoading, 
    error: reservationsError
  } = useReservations();

  // Filter out reservations that have become active loans
  const activeReservations = reservations.filter(reservation => 
    !activeLoans.some(loan => loan.bookId === reservation.bookId)
  );

  // Calculate total items (active loans + reservations)
  const totalItems = activeLoans.length + activeReservations.length;

  const formatDate = (dateString: string | undefined | null) => {
    if (!dateString) return 'N/A';
    try {
      const date = parseISO(dateString);
      return isValid(date) ? format(date, 'MMM d, yyyy') : 'Invalid Date';
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid Date';
    }
  };

  return (
    <MemberLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Member Dashboard</h1>
        
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {/* Active Loans Card */}
          <Card className="xl:col-span-2">
            <CardHeader>
              <CardTitle>My Active Loans</CardTitle>
            </CardHeader>
            <CardContent>
              {loansLoading ? (
                <div className="flex justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                </div>
              ) : loansError ? (
                <div className="text-red-500">Failed to load loans</div>
              ) : activeLoans.length === 0 ? (
                <div className="text-center py-4">
                  <p className="text-gray-500 mb-4">No active loans</p>
                  <Button asChild>
                    <Link to="/member/search">Browse Books</Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {activeLoans.map((loan: Loan) => (
                    <div key={loan.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-medium">{loan.bookTitle}</h3>
                        <p className="text-sm text-gray-500">Due: {formatDate(loan.dueDate)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Reservations Card */}
          <Card>
            <CardHeader>
              <CardTitle>My Reservations</CardTitle>
            </CardHeader>
            <CardContent>
              {reservationsLoading ? (
                <div className="flex justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                </div>
              ) : reservationsError ? (
                <div className="text-red-500">Failed to load reservations</div>
              ) : activeReservations.length === 0 ? (
                <div className="text-center py-4">
                  <p className="text-gray-500 mb-4">No active reservations</p>
                  <Button asChild>
                    <Link to="/member/search">Browse Books</Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {activeReservations.map((reservation: Reservation) => (
                    <div key={reservation.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-medium">{reservation.title}</h3>
                        <p className="text-sm text-gray-500">Status: {reservation.status}</p>
                        {reservation.dueDate && (
                          <p className="text-sm text-gray-500">
                            Due: {formatDate(reservation.dueDate)}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Fines History Card taking up 1/3 width on larger screens */}
        <div>
          <FinesHistoryCard />
        </div>
      </div>
    </MemberLayout>
  );
};

export default MemberDashboard;
