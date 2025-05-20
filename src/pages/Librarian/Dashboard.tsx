import LibrarianLayout from "@/components/layout/LibrarianLayout";
import TodaysActivity from "@/components/dashboard/TodaysActivity";
import BookInventory from "@/components/dashboard/BookInventory";
import QrScanButton from "@/components/dashboard/QrScanButton";
import ServiceStatus from "@/components/dashboard/ServiceStatus";
import BranchTable from "@/components/dashboard/BranchTable";
import StatsCard from "@/components/dashboard/StatsCard";
import { Book, Users, Clock, AlertCircle } from "lucide-react";
import { useStats } from "@/hooks/useStats";

const LibrarianDashboard = () => {
  const { stats, isLoading, error } = useStats();
  
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex items-center justify-center h-full">
          <p className="text-red-500">{error}</p>
        </div>
      );
    }

    if (!stats) {
      return (
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500">Failed to load dashboard data</p>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Librarian Dashboard</h1>
          <QrScanButton />
        </div>
        
        {/* Stats Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard 
            title="Total Books" 
            value={stats.totalBooks.value} 
            icon={Book}
            trend={stats.totalBooks.trend}
          />
          <StatsCard 
            title="Active Members" 
            value={stats.activeMembers.value} 
            icon={Users}
            trend={stats.activeMembers.trend}
          />
          <StatsCard 
            title="Overdue Loans" 
            value={stats.overdueLoans.value} 
            icon={Clock}
            trend={stats.overdueLoans.trend}
          />
          <StatsCard 
            title="Issues Today" 
            value={stats.issuesReported.value} 
            icon={AlertCircle}
            trend={stats.issuesReported.trend}
          />
        </div>
        
        {/* Two-column layout for smaller screens, 3-column for larger */}
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
        
        {/* Branch Table - Full Width */}
        <div className="col-span-full">
          <BranchTable />
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
