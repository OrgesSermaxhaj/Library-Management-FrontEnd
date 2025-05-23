import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Book, Clock, AlertCircle, User } from "lucide-react";
import { format, isToday, parseISO } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { loanService } from "@/services/loans";
import { reservationService } from "@/services/reservations";

interface Activity {
  id: string;
  type: 'LOAN' | 'RETURN' | 'RESERVATION';
  description: string;
  timestamp: string;
  memberName: string;
}

const TodaysActivity = () => {
  // Fetch active loans
  const { data: activeLoans = [], isLoading: loansLoading } = useQuery({
    queryKey: ['activeLoans'],
    queryFn: loanService.getActiveLoans,
  });

  // Fetch reservations
  const { data: reservations = [], isLoading: reservationsLoading } = useQuery({
    queryKey: ['reservations'],
    queryFn: reservationService.getReservations,
  });

  // Combine and sort activities
  const activities: Activity[] = [
    ...activeLoans.map(loan => ({
      id: `loan-${loan.id}`,
      type: 'LOAN' as const,
      description: `Book borrowed: ${loan.bookTitle}`,
      timestamp: loan.loanDate,
      memberName: loan.userFullName
    })),
    ...reservations.map(reservation => ({
      id: `reservation-${reservation.id}`,
      type: 'RESERVATION' as const,
      description: `Book reserved: ${reservation.title}`,
      timestamp: reservation.loanDate,
      memberName: reservation.userFullName
    }))
  ].filter(activity => isToday(parseISO(activity.timestamp)))
   .sort((a, b) => parseISO(b.timestamp).getTime() - parseISO(a.timestamp).getTime());

  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'LOAN':
        return <Book className="h-4 w-4" />;
      case 'RETURN':
        return <Clock className="h-4 w-4" />;
      case 'RESERVATION':
        return <User className="h-4 w-4" />;
    }
  };

  if (loansLoading || reservationsLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Today's Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Today's Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.length === 0 ? (
            <p className="text-gray-500 text-center">No activities today</p>
          ) : (
            activities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className="mt-1">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.description}</p>
                  <p className="text-xs text-gray-500">
                    {activity.memberName} • {format(parseISO(activity.timestamp), 'h:mm a')}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TodaysActivity;
