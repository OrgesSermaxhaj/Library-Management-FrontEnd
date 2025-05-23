import LibrarianLayout from "@/components/layout/LibrarianLayout";
import TodaysActivity from "@/components/dashboard/TodaysActivity";
import BookInventory from "@/components/dashboard/BookInventory";
import QrScanButton from "@/components/dashboard/QrScanButton";
import ServiceStatus from "@/components/dashboard/ServiceStatus";
import StatsCard from "@/components/dashboard/StatsCard";
import { Book, Users, Clock, AlertCircle, Library } from "lucide-react";
import { useStats } from "@/hooks/useStats";
import { useQuery } from "@tanstack/react-query";
import { loanService } from "@/services/loans";

const LibrarianDashboard = () => {
  const { stats, isLoading: statsLoading } = useStats();
  
  // Fetch active loans
  const { data: activeLoans = [], isLoading: activeLoansLoading } = useQuery({
    queryKey: ['activeLoans'],
    queryFn: loanService.getActiveLoans,
    refetchInterval: 5000 // Refetch every 5 seconds
  });

  const renderContent = () => {
    if (statsLoading) {
      return (
        <div className="animate-pulse space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-lg p-5 shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  </div>
                  <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                </div>
              </div>
            ))}
          </div>
          <div className="h-[300px] bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Total Books"
            value={stats?.totalBooks || 0}
            icon={Book}
            isLoading={statsLoading}
          />
          <StatsCard
            title="Active Members"
            value={stats?.activeMembers || 0}
            icon={Users}
            isLoading={statsLoading}
          />
          <StatsCard
            title="Active Loans"
            value={stats?.activeLoans || 0}
            icon={Library}
            isLoading={statsLoading}
          />
          <StatsCard
            title="Overdue Books"
            value={stats?.overdueBooks || 0}
            icon={AlertCircle}
            isLoading={statsLoading}
            className="border-amber-100 dark:border-amber-900"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Column 1: Today's Activity */}
          <div className="lg:col-span-1">
            <TodaysActivity />
          </div>
          
          {/* Column 2: Book Inventory */}
          <div className="lg:col-span-2">
            <BookInventory />
          </div>
          
          {/* Column 3: Service Status */}
          <div className="lg:col-span-1">
            <ServiceStatus />
          </div>
        </div>
      </div>
    );
  };

  return (
    <LibrarianLayout>
      {renderContent()}
    </LibrarianLayout>
  );
};

export default LibrarianDashboard;
