import { useState } from "react";
import LibrarianLayout from "@/components/layout/LibrarianLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { reservationService, ReservationStatus, Reservation } from "@/services/reservations";
import { toast } from "sonner";
import { format, isValid, parseISO } from "date-fns";

const Reservations = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<ReservationStatus | "all">("all");
  const queryClient = useQueryClient();

  // Fetch all reservations
  const { data: reservations = [], isLoading, error } = useQuery<Reservation[]>({
    queryKey: ['reservations'],
    queryFn: reservationService.getReservations,
    retry: 1,
    refetchInterval: 5000 // Refetch every 5 seconds to keep data fresh
  });

  // Update reservation status mutation
  const updateStatusMutation = useMutation({
    mutationFn: async ({ reservationId, status }: { reservationId: number; status: ReservationStatus }) => {
      return await reservationService.updateReservationStatus(reservationId.toString(), status);
    },
    onSuccess: (_, variables) => {
      // Invalidate both reservations and books queries to ensure UI is updated
      queryClient.invalidateQueries({ queryKey: ['reservations'] });
      queryClient.invalidateQueries({ queryKey: ['books'] });
      
      // Show appropriate success message based on the new status
      if (variables.status === 'APPROVED') {
        toast.success('Reservation approved. Book quantity has been updated.');
      } else if (variables.status === 'REJECTED') {
        toast.success('Reservation rejected.');
      } else if (variables.status === 'CANCELLED') {
        toast.success('Reservation cancelled.');
      } else {
        toast.success('Reservation status updated successfully');
      }
    },
    onError: (error: any) => {
      console.error('Update status error:', error);
      toast.error(error.message || 'Failed to update reservation status');
    }
  });

  const filteredReservations = (reservations as Reservation[]).filter(reservation => {
    if (!reservation) return false;
    
    const title = reservation.title?.toLowerCase() || '';
    const userFullName = reservation.userFullName?.toLowerCase() || '';
    const searchLower = searchQuery.toLowerCase();
    
    const matchesSearch = title.includes(searchLower) || userFullName.includes(searchLower);
    const matchesStatus = statusFilter === "all" || 
                         (reservation.status && reservation.status.toUpperCase() === statusFilter.toUpperCase());
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status.toUpperCase()) {
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

  const handleStatusUpdate = async (reservationId: number, newStatus: ReservationStatus) => {
    if (!reservationId) {
      toast.error('Invalid reservation ID');
      return;
    }

    try {
      await updateStatusMutation.mutateAsync({ 
        reservationId, 
        status: newStatus 
      });
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const getActionButton = (reservation: Reservation) => {
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
        return (
          <div className="flex gap-2 justify-end">
            <Button 
              variant="destructive" 
              size="sm"
              onClick={() => handleStatusUpdate(reservation.id, "CANCELLED")}
              disabled={updateStatusMutation.isPending}
            >
              {updateStatusMutation.isPending ? 'Updating...' : 'Cancel'}
            </Button>
          </div>
        );

      case "CANCELLED":
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
        return null;
    }
  };

  const formatDate = (dateString: string | undefined | null) => {
    if (!dateString) return 'N/A';
    try {
      const date = parseISO(dateString);
      return isValid(date) ? format(date, 'MMM dd, yyyy') : 'Invalid Date';
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid Date';
    }
  };

  if (isLoading) {
    return (
      <LibrarianLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
        </div>
      </LibrarianLayout>
    );
  }

  if (error) {
    return (
      <LibrarianLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-red-500">Failed to load reservations. Please try again.</div>
        </div>
      </LibrarianLayout>
    );
  }

  return (
    <LibrarianLayout>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Reservation Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input
                  placeholder="Search by book title or member name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as ReservationStatus | "all")}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="APPROVED">Approved</SelectItem>
                  <SelectItem value="CANCELLED">Cancelled</SelectItem>
                  <SelectItem value="REJECTED">Rejected</SelectItem>
                  <SelectItem value="COMPLETED">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Book</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Member</TableHead>
                    <TableHead>Reservation Date</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReservations.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                        No reservations found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredReservations.map((reservation) => (
                      <TableRow key={reservation.id}>
                        <TableCell>{reservation.title}</TableCell>
                        <TableCell>{reservation.authorName}</TableCell>
                        <TableCell>{reservation.userFullName}</TableCell>
                        <TableCell>{formatDate(reservation.loanDate)}</TableCell>
                        <TableCell>{formatDate(reservation.dueDate)}</TableCell>
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
