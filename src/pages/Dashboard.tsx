import { Users, BookOpen, Clock, DollarSign } from "lucide-react";
import AdminLayout from "@/components/layout/AdminLayout";
import StatsCard from "@/components/dashboard/StatsCard";
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
          <StatsCard
            title="Total Users"
            value={stats?.totalUsers || 0}
            icon={Users}
            isLoading={isLoading}
          />
          <StatsCard
            title="Total Books"
            value={stats?.totalBooks || 0}
            icon={BookOpen}
            isLoading={isLoading}
          />
          <StatsCard
            title="Active Loans"
            value={stats?.activeLoans || 0}
            icon={Clock}
            isLoading={isLoading}
          />
          <StatsCard
            title="Revenue"
            value={`$${stats?.revenue || 0}`}
            icon={DollarSign}
            isLoading={isLoading}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column (2/3 width on large screens) */}
          <div className="lg:col-span-2 space-y-6">
            <VisitorsChart />
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
