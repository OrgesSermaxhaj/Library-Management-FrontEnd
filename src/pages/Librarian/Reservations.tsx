
import { useState } from "react";
import LibrarianLayout from "@/components/layout/LibrarianLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Clock } from "lucide-react";

const reservations = [
  { id: "1", book: "The Great Gatsby", member: "John Doe", date: "2023-05-15", status: "ready" },
  { id: "2", book: "To Kill a Mockingbird", member: "Jane Smith", date: "2023-05-16", status: "pending" },
  { id: "3", book: "1984", member: "David Johnson", date: "2023-05-10", status: "ready" },
  { id: "4", book: "Pride and Prejudice", member: "Sarah Wilson", date: "2023-05-14", status: "pending" },
  { id: "5", book: "The Catcher in the Rye", member: "Michael Brown", date: "2023-05-12", status: "canceled" },
  { id: "6", book: "The Lord of the Rings", member: "Emily Davis", date: "2023-05-11", status: "expired" },
  { id: "7", book: "Harry Potter and the Philosopher's Stone", member: "Robert Miller", date: "2023-05-13", status: "ready" },
];

const Reservations = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredReservations = reservations.filter(reservation => {
    const matchesSearch = reservation.book.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          reservation.member.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || reservation.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ready":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">Ready for Pickup</Badge>;
      case "pending":
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">Pending</Badge>;
      case "canceled":
        return <Badge variant="outline" className="text-gray-500 border-gray-500">Canceled</Badge>;
      case "expired":
        return <Badge variant="destructive">Expired</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getActionButton = (status: string) => {
    if (status === "ready") {
      return <Button size="sm">Check Out</Button>;
    }
    if (status === "pending") {
      return <Button variant="outline" size="sm">Notify</Button>;
    }
    return null;
  };

  return (
    <LibrarianLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Reservations</h1>
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">Last updated: Today, 10:45 AM</span>
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
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="ready">Ready for Pickup</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="canceled">Canceled</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
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
                  {filteredReservations.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                        No reservations found matching your search criteria
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredReservations.map((reservation) => (
                      <TableRow key={reservation.id}>
                        <TableCell className="font-medium">{reservation.book}</TableCell>
                        <TableCell>{reservation.member}</TableCell>
                        <TableCell>{reservation.date}</TableCell>
                        <TableCell>{getStatusBadge(reservation.status)}</TableCell>
                        <TableCell className="text-right">
                          {getActionButton(reservation.status)}
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
