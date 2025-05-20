import { useState, useEffect } from "react";
import LibrarianLayout from "@/components/layout/LibrarianLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Clock, Loader2 } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { loanService, ReservationStatus, Reservation } from "@/services/loans";
import { toast } from "sonner";
import { format, isValid, parseISO } from "date-fns";

const Reservations = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<ReservationStatus | "all">("all");
  const queryClient = useQueryClient();

  // Fetch all reservations
  const { data: reservations = [], isLoading, error } = useQuery<Reservation[]>({
    queryKey: ['reservations'],
    queryFn: async () => {
      const data = await loanService.getReservations();
      console.log('Raw reservation data from API:', data);
      return data;
    }
  });

  // Log reservations data when it changes
  useEffect(() => {
    if (reservations.length > 0) {
      console.log('Detailed reservation data:', reservations.map(r => ({
        id: r.id,
        title: r.title,
        memberId: r.memberId,
        memberName: r.memberName,
        rawMemberData: r
      })));
    }
  }, [reservations]);

  // Update reservation status mutation
  const updateStatusMutation = useMutation({
    mutationFn: async ({ reservationId, status }: { reservationId: string; status: ReservationStatus }) => {
      console.log('Updating reservation:', { reservationId, status });
      try {
        const response = await loanService.updateReservationStatus(reservationId, status);
        return response;
      } catch (error: any) {
        console.error('Update error details:', {
          status: error.response?.status,
          data: error.response?.data,
          headers: error.response?.headers
        });
        throw error;
      }
    },
    onSuccess: (data) => {
      console.log('Update successful:', data);
      queryClient.invalidateQueries({ queryKey: ['reservations'] });
      toast.success('Reservation status updated successfully');
    },
    onError: (error: any) => {
      console.error('Update status error:', error);
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          'Failed to update reservation status';
      toast.error(errorMessage);
    }
  });

  // Book pickup mutation
  const pickupMutation = useMutation({
    mutationFn: async (reservationId: string) => {
      console.log('Processing book pickup:', reservationId);
      try {
        const response = await loanService.handleBookPickup(reservationId);
        return response;
      } catch (error: any) {
        console.error('Pickup error details:', {
          status: error.response?.status,
          data: error.response?.data,
          headers: error.response?.headers
        });
        throw error;
      }
    },
    onSuccess: (data) => {
      console.log('Pickup successful:', data);
      queryClient.invalidateQueries({ queryKey: ['reservations'] });
      queryClient.invalidateQueries({ queryKey: ['loans'] });
      toast.success('Book has been checked out successfully');
    },
    onError: (error: any) => {
      console.error('Pickup error:', error);
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          'Failed to process book pickup';
      toast.error(errorMessage);
    }
  });

  const filteredReservations = reservations.filter(reservation => {
    const matchesSearch = reservation.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         reservation.memberName?.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Case-insensitive status comparison
    const matchesStatus = statusFilter === "all" || 
                         reservation.status.toUpperCase() === statusFilter.toUpperCase();
    
    // Debug log for status filtering
    if (statusFilter !== "all") {
      console.log('Status comparison:', {
        reservationStatus: reservation.status,
        filterStatus: statusFilter,
        matches: matchesStatus
      });
    }
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: ReservationStatus) => {
    switch (status) {
      case "APPROVED":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">Ready for Pickup</Badge>;
      case "PENDING":
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">Pending</Badge>;
      case "CANCELLED":
        return <Badge variant="outline" className="text-gray-500 border-gray-500">Cancelled</Badge>;
      case "REJECTED":
        return <Badge variant="destructive">Rejected</Badge>;
      case "COMPLETED":
        return <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">Completed</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const handleStatusUpdate = (reservationId: string, newStatus: ReservationStatus) => {
    console.log('Handling status update:', { reservationId, newStatus });
    if (!reservationId) {
      toast.error('Invalid reservation ID');
      return;
    }
    updateStatusMutation.mutate({ 
      reservationId, 
      status: newStatus 
    });
  };

  const getActionButton = (reservation: Reservation) => {
    // Debug log to see the reservation status
    console.log('Getting action button for reservation:', {
      id: reservation.id,
      status: reservation.status,
      title: reservation.title
    });

    // Convert status to uppercase for comparison
    const status = reservation.status.toUpperCase();

    switch (status) {
      case "PENDING":
        return (
          <div className="flex gap-2 justify-end">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleStatusUpdate(reservation.id, "APPROVED")}
              disabled={updateStatusMutation.isPending}
            >
              {updateStatusMutation.isPending ? 'Updating...' : 'Approve'}
            </Button>
            <Button 
              variant="destructive" 
              size="sm"
              onClick={() => handleStatusUpdate(reservation.id, "REJECTED")}
              disabled={updateStatusMutation.isPending}
            >
              {updateStatusMutation.isPending ? 'Updating...' : 'Reject'}
            </Button>
          </div>
        );

      case "APPROVED":
        console.log('Rendering approved buttons for reservation:', reservation.id);
        return (
          <div className="flex gap-2 justify-end">
            <Button 
              size="sm" 
              onClick={() => pickupMutation.mutate(reservation.id)}
              disabled={pickupMutation.isPending}
              className="bg-green-600 hover:bg-green-700"
            >
              {pickupMutation.isPending ? 'Processing...' : 'Confirm Pickup'}
            </Button>
            <Button 
              variant="destructive" 
              size="sm"
              onClick={() => handleStatusUpdate(reservation.id, "CANCELLED")}
              disabled={updateStatusMutation.isPending}
              className="bg-red-600 hover:bg-red-700"
            >
              {updateStatusMutation.isPending ? 'Updating...' : 'Cancel'}
            </Button>
          </div>
        );

      case "CANCELLED":
        return (
          <div className="flex gap-2 justify-end">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleStatusUpdate(reservation.id, "PENDING")}
              disabled={updateStatusMutation.isPending}
            >
              {updateStatusMutation.isPending ? 'Updating...' : 'Reactivate'}
            </Button>
          </div>
        );

      case "REJECTED":
        return (
          <div className="flex gap-2 justify-end">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleStatusUpdate(reservation.id, "PENDING")}
              disabled={updateStatusMutation.isPending}
            >
              {updateStatusMutation.isPending ? 'Updating...' : 'Reactivate'}
            </Button>
          </div>
        );

      default:
        console.log('No matching status found for:', status);
        return null;
    }
  };

  const formatDate = (dateString: string | undefined | null) => {
    if (!dateString) {
      return 'N/A';
    }
    try {
      const date = parseISO(dateString);
      if (isValid(date)) {
        return format(date, 'MMM d, yyyy');
      }
      return 'Invalid date';
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid date';
    }
  };

  if (error) {
    return (
      <LibrarianLayout>
        <div className="text-red-500">Error loading reservations: {error.message}</div>
      </LibrarianLayout>
    );
  }

  return (
    <LibrarianLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Reservations</h1>
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">
              Last updated: {format(new Date(), 'MMM d, yyyy h:mm a')}
            </span>
          </div>
        </div>

        <Card>
          <CardHeader className="pb-0">
            <CardTitle className="text-lg font-medium">Book Reservations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 my-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by book or member..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select 
                value={statusFilter} 
                onValueChange={(value: ReservationStatus | "all") => setStatusFilter(value)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="APPROVED">Approved</SelectItem>
                  <SelectItem value="CANCELLED">Cancelled</SelectItem>
                  <SelectItem value="REJECTED">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Book</TableHead>
                    <TableHead>Member</TableHead>
                    <TableHead>Reservation Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-10">
                        <div className="flex items-center justify-center">
                          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                          <span className="ml-2 text-muted-foreground">Loading reservations...</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : filteredReservations.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                        No reservations found matching your search criteria
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredReservations.map((reservation) => (
                      <TableRow key={reservation.id}>
                        <TableCell className="font-medium">{reservation.title}</TableCell>
                        <TableCell>
                          {reservation.memberName ? reservation.memberName : 
                           reservation.memberId ? `Member ID: ${reservation.memberId}` : 
                           'Unknown Member'}
                        </TableCell>
                        <TableCell>{formatDate(reservation.reservationDate)}</TableCell>
                        <TableCell>{getStatusBadge(reservation.status)}</TableCell>
                        <TableCell className="text-right">
                          {getActionButton(reservation)}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </LibrarianLayout>
  );
};

export default Reservations;
