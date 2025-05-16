
import { Users, BookOpen, Clock, DollarSign } from "lucide-react";
import AdminLayout from "@/components/layout/AdminLayout";
import StatsCard from "@/components/dashboard/StatsCard";
import BranchTable from "@/components/dashboard/BranchTable";
import ServiceStatus from "@/components/dashboard/ServiceStatus";
import VisitorsChart from "@/components/dashboard/VisitorsChart";
import Announcements from "@/components/dashboard/Announcements";
import QuickActions from "@/components/dashboard/QuickActions";
import { useStats } from "@/hooks/useStats";

const Dashboard = () => {
  const { stats, isLoading } = useStats();
  
  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {isLoading ? (
            [...Array(4)].map((_, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-lg p-5 shadow-sm border border-gray-100 dark:border-gray-700 animate-pulse">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  </div>
                  <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                </div>
              </div>
            ))
          ) : (
            <>
              <StatsCard 
                title="Total Users" 
                value={stats?.totalUsers.value || 0} 
                icon={Users}
                trend={stats?.totalUsers.trend}
              />
              <StatsCard 
                title="Active Loans" 
                value={stats?.activeLoans.value || 0} 
                icon={BookOpen}
                trend={stats?.activeLoans.trend}
              />
              <StatsCard 
                title="Overdue Books" 
                value={stats?.overdueBooks.value || 0} 
                icon={Clock}
                trend={stats?.overdueBooks.trend}
                className="border-amber-100 dark:border-amber-900"
              />
              <StatsCard 
                title="Total Fines" 
                value={stats?.totalFines.value || "$0"} 
                icon={DollarSign}
                trend={stats?.totalFines.trend}
              />
            </>
          )}
        </div>
        
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column (2/3 width on large screens) */}
          <div className="lg:col-span-2 space-y-6">
            <VisitorsChart />
            <BranchTable />
            <QuickActions />
          </div>
          
          {/* Right Column (1/3 width on large screens) */}
          <div className="space-y-6">
            <ServiceStatus />
            <Announcements />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
