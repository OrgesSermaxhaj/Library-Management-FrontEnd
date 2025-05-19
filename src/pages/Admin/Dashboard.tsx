
import AdminLayout from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useStats } from "@/hooks/useStats";
import { Users, BookOpen, AlertCircle, DollarSign } from "lucide-react";
import StatsCard from "@/components/dashboard/StatsCard";
import { OverdueTable } from "@/components/dashboard/OverdueTable";
import { BorrowChart } from "@/components/dashboard/BorrowChart";

const AdminDashboard = () => {
  const { stats } = useStats();

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Admin Dashboard</h1>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Total Users"
            value={stats.totalUsers}
            icon={Users}
            trend={{ value: 12, isPositive: true }}
          />
          <StatsCard
            title="Total Books"
            value={stats.totalBooks}
            icon={BookOpen}
            trend={{ value: 5, isPositive: true }}
          />
          <StatsCard
            title="Overdue Books"
            value={stats.overdueLoans}
            icon={AlertCircle}
            trend={{ value: 2, isPositive: false }}
          />
          <StatsCard
            title="Total Fines"
            value={`$${stats.totalFines}`}
            icon={DollarSign}
            trend={{ value: 8, isPositive: true }}
          />
        </div>
        
        {/* Charts and Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart - 2/3 width on large screens */}
          <div className="lg:col-span-2">
            <BorrowChart />
          </div>
          
          {/* Quick Stats - 1/3 width on large screens */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium">System Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">System Uptime</span>
                      <span className="font-medium">99.9%</span>
                    </div>
                    <div className="mt-2 h-2 bg-gray-100 dark:bg-gray-800 rounded-full">
                      <div className="h-2 bg-green-500 rounded-full" style={{ width: "99.9%" }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Database Usage</span>
                      <span className="font-medium">68%</span>
                    </div>
                    <div className="mt-2 h-2 bg-gray-100 dark:bg-gray-800 rounded-full">
                      <div className="h-2 bg-blue-500 rounded-full" style={{ width: "68%" }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Storage Space</span>
                      <span className="font-medium">42%</span>
                    </div>
                    <div className="mt-2 h-2 bg-gray-100 dark:bg-gray-800 rounded-full">
                      <div className="h-2 bg-amber-500 rounded-full" style={{ width: "42%" }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Overdue Table - Full width */}
        <OverdueTable />
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
