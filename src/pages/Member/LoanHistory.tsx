
import { useState } from "react";
import MemberLayout from "@/components/layout/MemberLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, BookOpen, RotateCcw } from "lucide-react";

const currentLoans = [
  { id: "1", book: "The Great Gatsby", checkoutDate: "2023-05-10", dueDate: "2023-05-24", status: "active" },
  { id: "2", book: "To Kill a Mockingbird", checkoutDate: "2023-05-15", dueDate: "2023-05-29", status: "overdue" },
  { id: "3", book: "1984", checkoutDate: "2023-05-18", dueDate: "2023-06-01", status: "active" },
];

const pastLoans = [
  { id: "101", book: "Harry Potter and the Philosopher's Stone", checkoutDate: "2023-04-01", returnDate: "2023-04-15", status: "returned" },
  { id: "102", book: "The Hobbit", checkoutDate: "2023-04-05", returnDate: "2023-04-19", status: "returned" },
  { id: "103", book: "The Lord of the Rings", checkoutDate: "2023-04-10", returnDate: "2023-04-22", status: "late" },
  { id: "104", book: "The Alchemist", checkoutDate: "2023-03-15", returnDate: "2023-03-29", status: "returned" },
  { id: "105", book: "The Da Vinci Code", checkoutDate: "2023-03-20", returnDate: "2023-04-05", status: "late" },
];

const LoanHistory = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredCurrentLoans = currentLoans.filter(loan => 
    loan.book.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredPastLoans = pastLoans.filter(loan => 
    loan.book.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

        <Tabs defaultValue="current" className="space-y-4">
          <TabsList>
            <TabsTrigger value="current" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Current Loans ({filteredCurrentLoans.length})
            </TabsTrigger>
            <TabsTrigger value="past" className="flex items-center gap-2">
              <RotateCcw className="h-4 w-4" />
              Past Loans ({filteredPastLoans.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="current" className="space-y-4">
            <Card>
              <CardHeader className="pb-0">
                <CardTitle className="text-lg font-medium">Books Currently Borrowed</CardTitle>
              </CardHeader>
              <CardContent>
                {filteredCurrentLoans.length === 0 ? (
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
                      {filteredCurrentLoans.map((loan) => (
                        <TableRow key={loan.id}>
                          <TableCell className="font-medium">{loan.book}</TableCell>
                          <TableCell>{loan.checkoutDate}</TableCell>
                          <TableCell>{loan.dueDate}</TableCell>
                          <TableCell>
                            <Badge 
                              className={loan.status === "overdue" ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300" : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"}>
                              {loan.status === "overdue" ? "Overdue" : "Active"}
                            </Badge>
                          </TableCell>
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
                {filteredPastLoans.length === 0 ? (
                  <div className="text-center py-10 text-muted-foreground">
                    You have no past loans matching your search
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Book Title</TableHead>
                        <TableHead>Checkout Date</TableHead>
                        <TableHead>Return Date</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPastLoans.map((loan) => (
                        <TableRow key={loan.id}>
                          <TableCell className="font-medium">{loan.book}</TableCell>
                          <TableCell>{loan.checkoutDate}</TableCell>
                          <TableCell>{loan.returnDate}</TableCell>
                          <TableCell>
                            <Badge 
                              className={loan.status === "late" ? "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300" : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"}>
                              {loan.status === "late" ? "Returned Late" : "Returned On Time"}
                            </Badge>
                          </TableCell>
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
