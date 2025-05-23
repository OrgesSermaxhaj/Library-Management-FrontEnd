import AdminLayout from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useStats } from "@/hooks/useStats";
import { Users, BookOpen, UserCog, Library } from "lucide-react";
import StatsCard from "@/components/dashboard/StatsCard";
import { useAnnouncements } from "@/hooks/useAnnouncements";
import { format, parseISO } from "date-fns";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const { stats, isLoading: statsLoading } = useStats();
  const { announcements, isLoading: announcementsLoading, error: announcementsError } = useAnnouncements();
  const navigate = useNavigate();

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return "No date";
    try {
      return format(parseISO(dateString), "MMM d, yyyy");
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Invalid date";
    }
  };

  const handleNewAnnouncement = () => {
    navigate('/admin/announcements');
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Admin Dashboard</h1>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <StatsCard
            title="Total Users"
            value={stats?.totalUsers || 0}
            icon={Users}
            isLoading={statsLoading}
            className="h-[200px]"
          />
          <StatsCard
            title="Total Books"
            value={stats?.totalBooks || 0}
            icon={BookOpen}
            isLoading={statsLoading}
            className="h-[200px]"
          />
        </div>

        {/* Management Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* User Management Card */}
          <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer" onClick={() => navigate('/admin/users')}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    User Management
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Manage library members, roles, and permissions
                  </p>
                </div>
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-full group-hover:scale-110 transition-transform">
                  <UserCog className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm text-gray-500 dark:text-gray-400">
                <span className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  {stats?.activeMembers || 0} Active Members
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Book Management Card */}
          <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer" onClick={() => navigate('/admin/books')}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                    Book Management
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Manage library inventory, categories, and availability
                  </p>
                </div>
                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-full group-hover:scale-110 transition-transform">
                  <Library className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm text-gray-500 dark:text-gray-400">
                <span className="flex items-center">
                  <BookOpen className="h-4 w-4 mr-1" />
                  {stats?.totalBooks || 0} Total Books
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Announcements Section */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Announcements</CardTitle>
            <Button size="sm" className="flex items-center gap-1" onClick={handleNewAnnouncement}>
              <PlusCircle size={16} />
              <span>New</span>
            </Button>
          </CardHeader>
          <CardContent>
            {announcementsLoading ? (
              <div className="space-y-4 animate-pulse">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="pb-4 border-b border-gray-100 dark:border-gray-700 last:border-b-0 last:pb-0">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                  </div>
                ))}
              </div>
            ) : announcementsError ? (
              <div className="text-center py-4 text-red-500">
                {announcementsError}
              </div>
            ) : announcements.length === 0 ? (
              <div className="text-center py-4 text-muted-foreground">
                No announcements found
              </div>
            ) : (
              <div className="space-y-4">
                {announcements.map((announcement) => (
                  <div key={announcement.id} className="pb-4 border-b border-gray-100 dark:border-gray-700 last:border-b-0 last:pb-0">
                    <h4 className="font-medium text-gray-900 dark:text-white">{announcement.title}</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                      {formatDate(announcement.publishDate)}
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">{announcement.content}</p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
