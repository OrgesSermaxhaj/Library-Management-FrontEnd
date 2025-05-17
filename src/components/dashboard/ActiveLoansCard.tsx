
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useActiveLoans, Loan } from "@/hooks/useActiveLoans";
import { Calendar } from "lucide-react";
import { format, parseISO, isAfter } from "date-fns";

const LoanItem = ({ loan, onReturn }: { loan: Loan; onReturn: (id: string) => void }) => {
  const dueDate = parseISO(loan.dueDate);
  const isOverdue = isAfter(new Date(), dueDate);
  
  return (
    <div className="flex items-center gap-4 p-4 border-b last:border-0 border-gray-100 dark:border-gray-800">
      <div className="h-16 w-12 bg-gray-200 dark:bg-gray-700 rounded overflow-hidden flex-shrink-0">
        {loan.coverImage ? (
          <img src={loan.coverImage} alt={loan.title} className="h-full w-full object-cover" />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-gray-400">
            <BookOpen size={24} />
          </div>
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-gray-900 dark:text-gray-100 truncate">{loan.title}</h4>
        <p className="text-sm text-gray-500 dark:text-gray-400">{loan.author}</p>
        <div className="flex items-center mt-1 text-xs">
          <Calendar size={12} className="mr-1" />
          <span className={isOverdue ? "text-red-500" : "text-gray-500 dark:text-gray-400"}>
            Due: {format(dueDate, "MMM dd, yyyy")}
            {isOverdue && " (Overdue)"}
          </span>
        </div>
      </div>
      
      <Button 
        variant="outline" 
        size="sm"
        onClick={() => onReturn(loan.id)}
      >
        Return
      </Button>
    </div>
  );
};

const BookOpen = ({ size }: { size: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
  </svg>
);

const ActiveLoansCard = () => {
  const { loans, isLoading, error, returnLoan } = useActiveLoans();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl flex items-center justify-between">
          <span>My Active Loans</span>
          <span className="text-sm bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-2 py-1 rounded-full">
            {loans.length} Books
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {isLoading ? (
          <div className="p-6 text-center">
            <div className="animate-spin h-6 w-6 border-2 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
            <p className="mt-2 text-sm text-gray-500">Loading your loans...</p>
          </div>
        ) : error ? (
          <div className="p-6 text-center text-red-500">{error}</div>
        ) : loans.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            <p>You have no active loans.</p>
            <Button className="mt-4" variant="outline" onClick={() => window.location.href = '/search'}>
              Browse Books
            </Button>
          </div>
        ) : (
          <div>
            {loans.map(loan => (
              <LoanItem key={loan.id} loan={loan} onReturn={returnLoan} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ActiveLoansCard;
