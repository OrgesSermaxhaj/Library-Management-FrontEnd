
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useBranches } from "@/hooks/useBranches";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const BranchTable = () => {
  const { branches, isLoading } = useBranches();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Branch Overview</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Branch ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="text-center">Active Loans</TableHead>
                <TableHead className="text-center">Overdue Loans</TableHead>
                <TableHead className="text-center">Visitors Today</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-gray-500 dark:text-gray-400">Loading branches...</TableCell>
                </TableRow>
              ) : (
                branches.map((branch) => (
                  <TableRow key={branch.id}>
                    <TableCell className="font-medium">{branch.id}</TableCell>
                    <TableCell>{branch.name}</TableCell>
                    <TableCell className="text-center">{branch.activeLoans}</TableCell>
                    <TableCell className="text-center">
                      {branch.overdueLoans > 0 ? (
                        <span className="text-amber-600 dark:text-amber-500 font-medium">{branch.overdueLoans}</span>
                      ) : (
                        branch.overdueLoans
                      )}
                    </TableCell>
                    <TableCell className="text-center">{branch.visitorsToday}</TableCell>
                    <TableCell className="text-right">
                      <Badge variant={branch.status === "Open" ? "default" : "destructive"} className={branch.status === "Open" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" : ""}>
                        {branch.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default BranchTable;
