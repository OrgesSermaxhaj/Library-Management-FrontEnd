
import { useState } from "react";
import LibrarianLayout from "@/components/layout/LibrarianLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Calendar, BookOpen, RotateCcw } from "lucide-react";
import { Input } from "@/components/ui/input";

const activeLoans = [
  { id: "1", book: "The Great Gatsby", member: "John Doe", borrowDate: "2023-05-10", dueDate: "2023-05-24", status: "active" },
  { id: "2", book: "To Kill a Mockingbird", member: "Jane Smith", borrowDate: "2023-05-12", dueDate: "2023-05-26", status: "overdue" },
  { id: "3", book: "1984", member: "David Johnson", borrowDate: "2023-05-15", dueDate: "2023-05-29", status: "active" },
  { id: "4", book: "Pride and Prejudice", member: "Sarah Wilson", borrowDate: "2023-05-16", dueDate: "2023-05-30", status: "active" },
  { id: "5", book: "The Catcher in the Rye", member: "Michael Brown", borrowDate: "2023-05-08", dueDate: "2023-05-22", status: "overdue" },
];

const loanHistory = [
  { id: "101", book: "Harry Potter and the Philosopher's Stone", member: "John Doe", borrowDate: "2023-04-10", returnDate: "2023-04-24", status: "returned" },
  { id: "102", book: "The Hobbit", member: "Jane Smith", borrowDate: "2023-04-12", returnDate: "2023-04-23", status: "returned" },
  { id: "103", book: "The Lord of the Rings", member: "David Johnson", borrowDate: "2023-04-15", returnDate: "2023-04-28", status: "returned" },
  { id: "104", book: "The Alchemist", member: "Sarah Wilson", borrowDate: "2023-04-16", returnDate: "2023-04-30", status: "late" },
  { id: "105", book: "The Da Vinci Code", member: "Michael Brown", borrowDate: "2023-04-08", returnDate: "2023-04-25", status: "late" },
];

const LoanManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredActiveLoans = activeLoans.filter(loan => 
    loan.book.toLowerCase().includes(searchQuery.toLowerCase()) ||
    loan.member.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredLoanHistory = loanHistory.filter(loan => 
    loan.book.toLowerCase().includes(searchQuery.toLowerCase()) ||
    loan.member.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <LibrarianLayout>
      <div className="space-y-6">
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

        <Tabs defaultValue="active" className="space-y-4">
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
                          <TableCell className="font-medium">{loan.book}</TableCell>
                          <TableCell>{loan.member}</TableCell>
                          <TableCell>{loan.borrowDate}</TableCell>
                          <TableCell>{loan.dueDate}</TableCell>
                          <TableCell>
                            <Badge 
                              className={loan.status === "overdue" ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300" : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"}>
                              {loan.status === "overdue" ? "Overdue" : "Active"}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="outline" size="sm">Return</Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="history" className="space-y-4">
            <Card>
              <CardHeader className="pb-0">
                <CardTitle className="text-lg font-medium">Loan History</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Book</TableHead>
                      <TableHead>Member</TableHead>
                      <TableHead>Borrow Date</TableHead>
                      <TableHead>Return Date</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredLoanHistory.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                          No loan history found matching your search
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredLoanHistory.map((loan) => (
                        <TableRow key={loan.id}>
                          <TableCell className="font-medium">{loan.book}</TableCell>
                          <TableCell>{loan.member}</TableCell>
                          <TableCell>{loan.borrowDate}</TableCell>
                          <TableCell>{loan.returnDate}</TableCell>
                          <TableCell>
                            <Badge 
                              className={loan.status === "late" ? "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300" : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"}>
                              {loan.status === "late" ? "Returned Late" : "On Time"}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </LibrarianLayout>
  );
};

export default LoanManagement;
