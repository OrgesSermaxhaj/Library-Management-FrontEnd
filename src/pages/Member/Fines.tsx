
import MemberLayout from "@/components/layout/MemberLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CreditCard, Wallet, AlertTriangle, CheckCircle2 } from "lucide-react";

const fines = [
  { id: "1", book: "The Great Gatsby", dueDate: "2023-04-24", returnDate: "2023-05-01", amount: 3.50, status: "unpaid" },
  { id: "2", book: "To Kill a Mockingbird", dueDate: "2023-04-15", returnDate: "2023-04-25", amount: 5.00, status: "paid" },
  { id: "3", book: "1984", dueDate: "2023-05-05", returnDate: "2023-05-15", amount: 5.00, status: "unpaid" },
];

const totalUnpaid = fines.filter(fine => fine.status === "unpaid").reduce((total, fine) => total + fine.amount, 0);
const totalPaid = fines.filter(fine => fine.status === "paid").reduce((total, fine) => total + fine.amount, 0);

const Fines = () => {
  return (
    <MemberLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">My Fines</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Summary Cards */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                Unpaid Fines
              </CardTitle>
              <CardDescription>Total amount due</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">${totalUnpaid.toFixed(2)}</div>
              {totalUnpaid > 0 && (
                <Button className="mt-4 w-full">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Pay Now
                </Button>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                Paid Fines
              </CardTitle>
              <CardDescription>Total amount paid</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">${totalPaid.toFixed(2)}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <Wallet className="h-5 w-5 text-blue-500" />
                Library Account Status
              </CardTitle>
              <CardDescription>Current standing</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Account Status</span>
                <Badge className={totalUnpaid > 10 ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"}>
                  {totalUnpaid > 10 ? "Restricted" : "Good Standing"}
                </Badge>
              </div>
              <Progress 
                value={totalUnpaid > 0 ? (10 - Math.min(totalUnpaid, 10)) * 10 : 100} 
                className="h-2 mt-2" 
              />
              <p className="text-xs text-muted-foreground mt-2">
                {totalUnpaid > 10 
                  ? "Your borrowing privileges are restricted due to unpaid fines." 
                  : totalUnpaid > 0 
                    ? "Your account is in good standing, but you have unpaid fines." 
                    : "Your account is in perfect standing."}
              </p>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">Fine Details</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Book</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Return Date</TableHead>
                  <TableHead>Days Late</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {fines.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                      You have no fines on record
                    </TableCell>
                  </TableRow>
                ) : (
                  fines.map((fine) => {
                    const dueDate = new Date(fine.dueDate);
                    const returnDate = new Date(fine.returnDate);
                    const daysLate = Math.ceil((returnDate.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24));
                    
                    return (
                      <TableRow key={fine.id}>
                        <TableCell className="font-medium">{fine.book}</TableCell>
                        <TableCell>{fine.dueDate}</TableCell>
                        <TableCell>{fine.returnDate}</TableCell>
                        <TableCell>{daysLate}</TableCell>
                        <TableCell>${fine.amount.toFixed(2)}</TableCell>
                        <TableCell>
                          <Badge 
                            className={fine.status === "paid" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"}>
                            {fine.status === "paid" ? "Paid" : "Unpaid"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </MemberLayout>
  );
};

export default Fines;
