
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useReservations, Reservation } from "@/hooks/useReservations";
import { format, parseISO } from "date-fns";
import { Clock } from "lucide-react";

const ReservationItem = ({ reservation, onCancel }: { reservation: Reservation; onCancel: (id: string) => void }) => {
  const availableDate = parseISO(reservation.estimatedAvailability);
  
  return (
    <div className="flex items-center gap-4 p-4 border-b last:border-0 border-gray-100 dark:border-gray-800">
      <div className="h-16 w-12 bg-gray-200 dark:bg-gray-700 rounded overflow-hidden flex-shrink-0">
        {reservation.coverImage ? (
          <img src={reservation.coverImage} alt={reservation.title} className="h-full w-full object-cover" />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-gray-400">
            <BookIcon size={24} />
          </div>
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-gray-900 dark:text-gray-100 truncate">{reservation.title}</h4>
        <p className="text-sm text-gray-500 dark:text-gray-400">{reservation.author}</p>
        <div className="flex items-center mt-1 text-xs">
          <Clock size={12} className="mr-1" />
          <span className="text-amber-600 dark:text-amber-400">
            Position: #{reservation.position} • Est. Available: {format(availableDate, "MMM dd")}
          </span>
        </div>
      </div>
      
      <Button 
        variant="ghost" 
        size="sm"
        className="text-red-500 hover:text-red-600 hover:bg-red-50"
        onClick={() => onCancel(reservation.id)}
      >
        Cancel
      </Button>
    </div>
  );
};

const BookIcon = ({ size }: { size: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
  </svg>
);

const ReservationsCard = () => {
  const { reservations, isLoading, error, cancelReservation } = useReservations();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl flex items-center justify-between">
          <span>My Reservations</span>
          <span className="text-sm bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200 px-2 py-1 rounded-full">
            {reservations.length} Books
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
          <div className="p-6 text-center text-red-500">{error}</div>
        ) : reservations.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            <p>You have no active reservations.</p>
            <Button className="mt-4" variant="outline" onClick={() => window.location.href = '/search'}>
              Browse Books
            </Button>
          </div>
        ) : (
          <div>
            {reservations.map(reservation => (
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
