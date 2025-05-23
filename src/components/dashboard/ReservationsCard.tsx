import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useReservations } from "@/hooks/useReservations";
import { Reservation } from "@/services/reservations";
import { Calendar, BookOpen } from "lucide-react";
import { format, parseISO } from "date-fns";

const ReservationItem = ({ 
  reservation, 
  onCancel 
}: { 
  reservation: Reservation; 
  onCancel: (id: number) => void;
}) => {
  const dueDate = parseISO(reservation.dueDate);
  
  return (
    <div className="flex items-center gap-4 p-4 border-b last:border-0 border-gray-100 dark:border-gray-800">
      <div className="h-16 w-12 bg-gray-200 dark:bg-gray-700 rounded overflow-hidden flex-shrink-0">
        <div className="h-full w-full flex items-center justify-center text-gray-400">
          <BookOpen size={24} />
        </div>
      </div>
      
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-gray-900 dark:text-gray-100 truncate">{reservation.title}</h4>
        <p className="text-sm text-gray-500 dark:text-gray-400">{reservation.authorName}</p>
        <div className="flex items-center mt-1 text-xs">
          <Calendar size={12} className="mr-1" />
          <span className="text-gray-500 dark:text-gray-400">
            Due: {format(dueDate, "MMM dd, yyyy")}
          </span>
        </div>
      </div>
      
      <Button 
        variant="outline" 
        size="sm"
        onClick={() => onCancel(Number(reservation.id))}
      >
        Cancel
      </Button>
    </div>
  );
};

const ReservationsCard = () => {
  const { reservations, isLoading, error, cancelReservation } = useReservations();
  
  // Filter out cancelled reservations
  const activeReservations = reservations.filter(r => r.status !== 'CANCELLED');
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl flex items-center justify-between">
          <span>My Reservations</span>
          <span className="text-sm bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200 px-2 py-1 rounded-full">
            {activeReservations.length} Books
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {isLoading ? (
          <div className="p-6 text-center">
            <div className="animate-spin h-6 w-6 border-2 border-amber-600 border-t-transparent rounded-full mx-auto"></div>
            <p className="mt-2 text-sm text-gray-500">Loading your reservations...</p>
          </div>
        ) : error ? (
          <div className="p-6 text-center text-red-500">{error.toString()}</div>
        ) : activeReservations.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            <p>You have no active reservations.</p>
            <Button className="mt-4" variant="outline" onClick={() => window.location.href = '/member/search'}>
              Browse Books
            </Button>
          </div>
        ) : (
          <div>
            {activeReservations.map(reservation => (
              <ReservationItem 
                key={reservation.id} 
                reservation={reservation} 
                onCancel={cancelReservation} 
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ReservationsCard;
