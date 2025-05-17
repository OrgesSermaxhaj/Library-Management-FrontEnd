
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

const BranchTable = () => {
  const { branches, isLoading } = useBranches();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
      <div className="p-4 border-b border-gray-100 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Branch Overview</h3>
      </div>
      
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
    </div>
  );
};

export default BranchTable;
