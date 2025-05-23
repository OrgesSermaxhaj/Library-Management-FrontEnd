import LibrarianLayout from "@/components/layout/LibrarianLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, BarChart, UserCog, ClipboardList } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { bookService } from "@/services/books";
import { loanService } from "@/services/loans";
import { useNavigate } from "react-router-dom";
import { format, isToday, parseISO } from "date-fns";

const LibrarianDashboard = () => {
  const navigate = useNavigate();
  // Fetch total books
  const { data: books = [], isLoading: booksLoading } = useQuery({
    queryKey: ['books'],
    queryFn: bookService.getAllBooks,
  });

  // Fetch active loans
  const { data: activeLoans = [], isLoading: loansLoading } = useQuery({
    queryKey: ['activeLoans'],
    queryFn: loanService.getActiveLoans,
    refetchInterval: 5000 // Refetch every 5 seconds
  });

  // Filter active loans for those borrowed today
  const booksBorrowedToday = activeLoans.filter((loan) => {
    if (!loan.loanDate) return false;
    try {
      return isToday(parseISO(loan.loanDate));
    } catch {
      return false;
    }
  });

  return (
    <LibrarianLayout>
      <div className="space-y-6 lg:ml-[250px] p-4 md:p-8">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Librarian Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Total Books Card */}
          <Card>
            <CardHeader>
              <CardTitle>Total Books</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <span className="text-4xl font-bold text-blue-700 dark:text-blue-400">
                {booksLoading ? '...' : books.length}
              </span>
              <BookOpen className="h-10 w-10 text-blue-300 dark:text-blue-500" />
            </CardContent>
          </Card>
          {/* Currently Borrowed Card */}
          <Card>
            <CardHeader>
              <CardTitle>Currently Borrowed</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <span className="text-4xl font-bold text-blue-700 dark:text-blue-400">
                {loansLoading ? '...' : activeLoans.length}
              </span>
              <BarChart className="h-10 w-10 text-blue-300 dark:text-blue-500" />
            </CardContent>
          </Card>
        </div>
        {/* Management Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Loan Management Card */}
          <Card
            className="cursor-pointer group hover:shadow-lg transition"
            onClick={() => navigate('/librarian/loans')}
          >
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  Loan Management
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Manage book loans, returns, and overdue items
                </p>
              </div>
              <UserCog className="h-10 w-10 text-blue-300 dark:text-blue-500" />
            </CardContent>
          </Card>
          {/* Reservations Card */}
          <Card
            className="cursor-pointer group hover:shadow-lg transition"
            onClick={() => navigate('/librarian/reservations')}
          >
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  Reservations
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  View and manage book reservations
                </p>
              </div>
              <ClipboardList className="h-10 w-10 text-blue-300 dark:text-blue-500" />
            </CardContent>
          </Card>
        </div>
        {/* Books Borrowed Today Section */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Books Borrowed Today</CardTitle>
          </CardHeader>
          <CardContent className="text-gray-500">
            {booksBorrowedToday.length === 0 ? (
              <div className="text-center">No books borrowed today</div>
            ) : (
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {booksBorrowedToday.map((loan) => (
                  <li key={loan.id} className="py-2 flex flex-col md:flex-row md:items-center md:justify-between">
                    <span className="font-medium text-gray-800 dark:text-gray-100">{loan.bookTitle}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Borrowed by: {loan.userFullName}</span>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </LibrarianLayout>
  );
};

export default LibrarianDashboard;
