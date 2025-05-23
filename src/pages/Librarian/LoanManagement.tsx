import { useState } from "react";
import LibrarianLayout from "@/components/layout/LibrarianLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Calendar, BookOpen, RotateCcw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { loanService, Loan } from "@/services/loans";
import { toast } from "sonner";
import { format, parseISO } from "date-fns";

const LoanManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const queryClient = useQueryClient();
  
  // Fetch active loans
  const { data: activeLoans = [], isLoading: activeLoansLoading } = useQuery({
    queryKey: ['activeLoans'],
    queryFn: loanService.getActiveLoans,
    refetchInterval: 5000 // Refetch every 5 seconds
  });

  // Fetch loan history
  const { data: loanHistory = [], isLoading: historyLoading } = useQuery({
    queryKey: ['loanHistory'],
    queryFn: loanService.getLoanHistory,
    refetchInterval: 5000 // Refetch every 5 seconds
  });

  // Return book mutation
  const returnLoanMutation = useMutation({
    mutationFn: loanService.returnLoan,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activeLoans'] });
      queryClient.invalidateQueries({ queryKey: ['loanHistory'] });
      toast.success('Book returned successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to return book');
    }
  });

  const handleReturn = async (loanId: number) => {
    try {
      await returnLoanMutation.mutateAsync(loanId);
    } catch (error) {
      console.error('Error returning book:', error);
    }
  };
  
  const filteredActiveLoans = activeLoans.filter(loan => 
    loan.bookTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    loan.userFullName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredLoanHistory = loanHistory.filter(loan => 
    loan.bookTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    loan.userFullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    try {
      return format(parseISO(dateString), 'MMM dd, yyyy');
    } catch (error) {
      return 'Invalid Date';
    }
  };

  const getStatusBadge = (loan: Loan) => {
    if (loan.status === 'ACTIVE') {
      return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">Active</Badge>;
    }
    
    if (loan.returnStatus === 'ON_TIME') {
      return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">Returned On Time</Badge>;
    }
    
    if (loan.returnStatus === 'LATE') {
      return <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300">Returned Late</Badge>;
    }
    
    return <Badge>{loan.returnStatus}</Badge>;
  };

  return (
    <LibrarianLayout>
      <div className="space-y-6 lg:ml-[250px] p-4 md:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Loan Management</h1>
          <Button className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            New Loan
          </Button>
        </div>
        
        <div className="flex items-center mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by book title or member name..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <Tabs defaultValue="active">
          <TabsList>
            <TabsTrigger value="active" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Active Loans
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2">
              <RotateCcw className="h-4 w-4" />
              Loan History
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="active" className="space-y-4">
            <Card>
              <CardHeader className="pb-0">
                <CardTitle className="text-lg font-medium">Active Loans</CardTitle>
              </CardHeader>
              <CardContent>
                {activeLoansLoading ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Book</TableHead>
                        <TableHead>Member</TableHead>
                        <TableHead>Borrow Date</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredActiveLoans.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                            No active loans found matching your search
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredActiveLoans.map((loan) => (
                          <TableRow key={loan.id}>
                            <TableCell className="font-medium">{loan.bookTitle}</TableCell>
                            <TableCell>{loan.userFullName}</TableCell>
                            <TableCell>{formatDate(loan.loanDate)}</TableCell>
                            <TableCell>{formatDate(loan.dueDate)}</TableCell>
                            <TableCell>{getStatusBadge(loan)}</TableCell>
                            <TableCell className="text-right">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleReturn(loan.id)}
                                disabled={returnLoanMutation.isPending}
                              >
                                {returnLoanMutation.isPending ? 'Returning...' : 'Return'}
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="history" className="space-y-4">
            <Card>
              <CardHeader className="pb-0">
                <CardTitle className="text-lg font-medium">Loan History</CardTitle>
              </CardHeader>
              <CardContent>
                {historyLoading ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Book</TableHead>
                        <TableHead>Member</TableHead>
                        <TableHead>Borrow Date</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead>Return Date</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredLoanHistory.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                            No loan history found matching your search
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredLoanHistory.map((loan) => (
                          <TableRow key={loan.id}>
                            <TableCell className="font-medium">{loan.bookTitle}</TableCell>
                            <TableCell>{loan.userFullName}</TableCell>
                            <TableCell>{formatDate(loan.loanDate)}</TableCell>
                            <TableCell>{formatDate(loan.dueDate)}</TableCell>
                            <TableCell>{loan.returnDate ? formatDate(loan.returnDate) : 'N/A'}</TableCell>
                            <TableCell>{getStatusBadge(loan)}</TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </LibrarianLayout>
  );
};

export default LoanManagement;
