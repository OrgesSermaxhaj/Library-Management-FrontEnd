import { useAuth } from '@/contexts/AuthContext';
import MemberLayout from "@/components/layout/MemberLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Wallet, AlertTriangle } from "lucide-react";
import { useFineDetails } from "@/hooks/useFineDetails";

const Fines = () => {
  const { user } = useAuth();
  const { fineDetails, isLoading, error, formatDate } = useFineDetails(user?.id || 0);

  // Calculate total unpaid fines
  const totalUnpaid = fineDetails
    .filter(fine => !fine.finePaid)
    .reduce((total, fine) => total + parseFloat(fine.fineAmount), 0);

  if (error) {
    return (
      <MemberLayout>
        <div className="text-red-500">Error loading fine details: {error.toString()}</div>
      </MemberLayout>
    );
  }

  return (
    <MemberLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">My Fines</h1>
        
        {/* Unpaid Fines Summary */}
        <Card>
          <CardHeader className="pb-2 text-center">
            <CardTitle className="text-lg font-medium flex items-center justify-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              Unpaid Fines
            </CardTitle>
            <CardDescription>Total amount due</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-3xl font-bold">${totalUnpaid.toFixed(2)}</div>
            <p className="text-sm text-muted-foreground mt-2">
              Each late return incurs a $10.00 fine
            </p>
          </CardContent>
        </Card>

        {/* Fine Details Table */}
        <Card>
          <CardHeader className="pb-2 text-center">
            <CardTitle className="text-lg font-medium flex items-center justify-center gap-2">
              <Wallet className="h-5 w-5 text-blue-500" />
              Fine Details
            </CardTitle>
            <CardDescription>View your late returns and associated fines</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
              </div>
            ) : fineDetails.length === 0 ? (
              <div className="text-center py-10 text-muted-foreground">
                You have no late returns or fines on record
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Book Title</TableHead>
                    <TableHead>Checkout Date</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Return Date</TableHead>
                    <TableHead>Fine Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {fineDetails.map((fine) => (
                    <TableRow key={fine.loanId}>
                      <TableCell className="font-medium">{fine.title}</TableCell>
                      <TableCell>{formatDate(fine.checkoutDate)}</TableCell>
                      <TableCell>{formatDate(fine.dueDate)}</TableCell>
                      <TableCell>{formatDate(fine.returnDate)}</TableCell>
                      <TableCell>${fine.fineAmount}</TableCell>
                      <TableCell>
                        <Badge className={fine.finePaid ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                          {fine.finePaid ? "Paid" : "Unpaid"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm text-muted-foreground">Fines need to be paid at the library desk</p>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </MemberLayout>
  );
};

export default Fines;
