
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
  const { stats } = useStats();
  
  return (
    <LibrarianLayout>
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Librarian Dashboard</h1>
          <QrScanButton />
        </div>
        
        {/* Stats Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard 
            title="Total Books" 
            value={stats.totalBooks} 
            icon={Book}
            trend={{ value: 3.2, isPositive: true }}
          />
          <StatsCard 
            title="Active Members" 
            value={stats.activeMembers} 
            icon={Users}
            trend={{ value: 5.1, isPositive: true }}
          />
          <StatsCard 
            title="Overdue Loans" 
            value={stats.overdueLoans} 
            icon={Clock}
            trend={{ value: 2.3, isPositive: false }}
          />
          <StatsCard 
            title="Issues Today" 
            value={stats.issuesReported} 
            icon={AlertCircle}
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
    </LibrarianLayout>
  );
};

export default LibrarianDashboard;
