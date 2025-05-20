import { useState, useEffect } from "react";
import LibrarianLayout from "@/components/layout/LibrarianLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Pencil, Trash2, Calendar } from "lucide-react";
import { format, parseISO } from "date-fns";
import { toast } from "sonner";
import { announcementService, type Announcement, type CreateAnnouncementData } from "@/services/announcements";

const Announcements = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);
  const [formData, setFormData] = useState<CreateAnnouncementData>({
    title: "",
    content: "",
    publishDate: new Date().toISOString().split('T')[0], // Format as YYYY-MM-DD
  });

  // Fetch announcements
  const fetchAnnouncements = async () => {
    try {
      setIsLoading(true);
      const data = await announcementService.getAllAnnouncements();
      setAnnouncements(data);
    } catch (error) {
      toast.error("Failed to fetch announcements");
      console.error("Error fetching announcements:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const handleCreate = async () => {
    try {
      // Validate required fields
      if (!formData.title.trim()) {
        toast.error("Title is required");
        return;
      }
      if (!formData.content.trim()) {
        toast.error("Content is required");
        return;
      }

      console.log('Creating announcement with form data:', formData);
      const newAnnouncement = await announcementService.createAnnouncement(formData);
      console.log('Created announcement:', newAnnouncement);
      
      setAnnouncements([newAnnouncement, ...announcements]);
      setFormData({ 
        title: "", 
        content: "", 
        publishDate: new Date().toISOString().split('T')[0] 
      });
      setIsCreateDialogOpen(false);
      toast.success("Announcement created successfully");
    } catch (error) {
      console.error("Error creating announcement:", error);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to create announcement. Please try again.");
      }
    }
  };

  const handleEdit = (announcement: Announcement) => {
    setSelectedAnnouncement(announcement);
    setFormData({
      title: announcement.title,
      content: announcement.content,
      publishDate: announcement.publishDate ? announcement.publishDate.split('T')[0] : new Date().toISOString().split('T')[0],
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdate = async () => {
    if (!selectedAnnouncement) return;

    try {
      const updatedAnnouncement = await announcementService.updateAnnouncement(
        selectedAnnouncement.id,
        formData
      );
      setAnnouncements(
        announcements.map((announcement) =>
          announcement.id === selectedAnnouncement.id ? updatedAnnouncement : announcement
        )
      );
      setIsEditDialogOpen(false);
      setSelectedAnnouncement(null);
      setFormData({ 
        title: "", 
        content: "", 
        publishDate: new Date().toISOString().split('T')[0] 
      });
      toast.success("Announcement updated successfully");
    } catch (error) {
      toast.error("Failed to update announcement");
      console.error("Error updating announcement:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await announcementService.deleteAnnouncement(id);
      setAnnouncements(announcements.filter((announcement) => announcement.id !== id));
      toast.success("Announcement deleted successfully");
    } catch (error) {
      toast.error("Failed to delete announcement");
      console.error("Error deleting announcement:", error);
    }
  };

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return "No date";
    try {
      return format(parseISO(dateString), "MMM d, yyyy");
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Invalid date";
    }
  };

  if (isLoading) {
    return (
      <LibrarianLayout>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Announcements</h1>
            <Button disabled>
              <Plus className="h-4 w-4 mr-2" />
              New Announcement
            </Button>
          </div>
          <Card>
            <CardContent className="p-0">
              <div className="animate-pulse">
                <div className="h-12 bg-gray-200 dark:bg-gray-700"></div>
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-16 border-t border-gray-200 dark:border-gray-700">
                    <div className="h-full flex items-center px-4">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </LibrarianLayout>
    );
  }

  return (
    <LibrarianLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Announcements</h1>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Announcement
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Announcement</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label htmlFor="title" className="text-sm font-medium">
                    Title
                  </label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Enter announcement title"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="content" className="text-sm font-medium">
                    Content
                  </label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    placeholder="Enter announcement content"
                    rows={4}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="publishDate" className="text-sm font-medium">
                    Publish Date
                  </label>
                  <Input
                    id="publishDate"
                    type="date"
                    value={formData.publishDate}
                    onChange={(e) => setFormData({ ...formData, publishDate: e.target.value })}
                  />
                </div>
                <Button onClick={handleCreate} className="w-full">
                  Create Announcement
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Content</TableHead>
                  <TableHead>Published</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {announcements.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                      No announcements found
                    </TableCell>
                  </TableRow>
                ) : (
                  announcements.map((announcement) => (
                    <TableRow key={announcement.id}>
                      <TableCell className="font-medium">{announcement.title}</TableCell>
                      <TableCell className="max-w-md truncate">{announcement.content}</TableCell>
                      <TableCell className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {formatDate(announcement.publishDate)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(announcement)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(announcement.id)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Announcement</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label htmlFor="edit-title" className="text-sm font-medium">
                  Title
                </label>
                <Input
                  id="edit-title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter announcement title"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="edit-content" className="text-sm font-medium">
                  Content
                </label>
                <Textarea
                  id="edit-content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Enter announcement content"
                  rows={4}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="edit-publishDate" className="text-sm font-medium">
                  Publish Date
                </label>
                <Input
                  id="edit-publishDate"
                  type="date"
                  value={formData.publishDate}
                  onChange={(e) => setFormData({ ...formData, publishDate: e.target.value })}
                />
              </div>
              <Button onClick={handleUpdate} className="w-full">
                Update Announcement
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </LibrarianLayout>
  );
};

export default Announcements;
