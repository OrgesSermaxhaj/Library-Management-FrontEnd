import { useState } from "react";
import MemberLayout from "@/components/layout/MemberLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, BookOpen, RotateCcw } from "lucide-react";
import { useMemberLoanHistory } from "@/hooks/useMemberLoanHistory";
import { format, parseISO } from "date-fns";

const LoanHistory = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { activeLoans, loanHistory, isLoading, error } = useMemberLoanHistory();
  
  const filteredActiveLoans = activeLoans.filter(loan => 
    loan.bookTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredLoanHistory = loanHistory.filter(loan => 
    loan.bookTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    try {
      return format(parseISO(dateString), 'MMM dd, yyyy');
    } catch (error) {
      return 'Invalid Date';
    }
  };

  const getStatusBadge = (loan: any) => {
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
    <MemberLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">My Loan History</h1>
        
        <div className="relative max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by book title..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Tabs defaultValue="current">
          <TabsList>
            <TabsTrigger value="current" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Current Loans ({filteredActiveLoans.length})
            </TabsTrigger>
            <TabsTrigger value="past" className="flex items-center gap-2">
              <RotateCcw className="h-4 w-4" />
              Past Loans ({filteredLoanHistory.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="current" className="space-y-4">
            <Card>
              <CardHeader className="pb-0">
                <CardTitle className="text-lg font-medium">Books Currently Borrowed</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
                  </div>
                ) : error ? (
                  <div className="text-center py-10 text-red-500">
                    {error.toString()}
                  </div>
                ) : filteredActiveLoans.length === 0 ? (
                  <div className="text-center py-10 text-muted-foreground">
                    You have no current loans matching your search
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Book Title</TableHead>
                        <TableHead>Checkout Date</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredActiveLoans.map((loan) => (
                        <TableRow key={loan.id}>
                          <TableCell className="font-medium">{loan.bookTitle}</TableCell>
                          <TableCell>{formatDate(loan.loanDate)}</TableCell>
                          <TableCell>{formatDate(loan.dueDate)}</TableCell>
                          <TableCell>{getStatusBadge(loan)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="past" className="space-y-4">
            <Card>
              <CardHeader className="pb-0">
                <CardTitle className="text-lg font-medium">Previously Borrowed Books</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
                  </div>
                ) : error ? (
                  <div className="text-center py-10 text-red-500">
                    {error.toString()}
                  </div>
                ) : filteredLoanHistory.length === 0 ? (
                  <div className="text-center py-10 text-muted-foreground">
                    You have no past loans matching your search
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Book Title</TableHead>
                        <TableHead>Checkout Date</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead>Return Date</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredLoanHistory.map((loan) => (
                        <TableRow key={loan.id}>
                          <TableCell className="font-medium">{loan.bookTitle}</TableCell>
                          <TableCell>{formatDate(loan.loanDate)}</TableCell>
                          <TableCell>{formatDate(loan.dueDate)}</TableCell>
                          <TableCell>{loan.returnDate ? formatDate(loan.returnDate) : 'N/A'}</TableCell>
                          <TableCell>{getStatusBadge(loan)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MemberLayout>
  );
};

export default LoanHistory;
