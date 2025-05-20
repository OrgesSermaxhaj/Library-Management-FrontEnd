import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Calendar, Plus } from "lucide-react";
import { format, parseISO } from "date-fns";
import { announcementService, type Announcement } from "@/services/announcements";
import { toast } from "sonner";

const Reports = () => {
  const navigate = useNavigate();
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await announcementService.getAllAnnouncements();
        console.log('Setting announcements:', response);
        setAnnouncements(response);
      } catch (error) {
        console.error("Error fetching announcements:", error);
        if (error instanceof Error) {
          setError(error.message);
          toast.error(error.message);
        } else {
          setError("Failed to fetch announcements");
          toast.error("Failed to fetch announcements");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

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
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Reports & Logs</h1>

        {/* Announcements Section */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Announcements</CardTitle>
            <Button onClick={handleNewAnnouncement} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              New Announcement
            </Button>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="animate-pulse space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-6 text-red-500">
                {error}
              </div>
            ) : announcements.length === 0 ? (
              <div className="text-center py-6 text-muted-foreground">
                No announcements found
              </div>
            ) : (
              <div className="relative overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[200px]">Title</TableHead>
                      <TableHead>Content</TableHead>
                      <TableHead className="w-[150px]">Published</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {announcements.map((announcement) => (
                      <TableRow key={announcement.id}>
                        <TableCell className="font-medium">{announcement.title}</TableCell>
                        <TableCell className="max-w-md truncate">{announcement.content}</TableCell>
                        <TableCell className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          {formatDate(announcement.publishDate)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* System Logs Section */}
        <Card>
          <CardHeader>
            <CardTitle>System Logs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-6 text-muted-foreground">
              System logs will be displayed here
            </div>
          </CardContent>
        </Card>

        {/* Activity Reports Section */}
        <Card>
          <CardHeader>
            <CardTitle>Activity Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-6 text-muted-foreground">
              Activity reports will be displayed here
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Reports; 