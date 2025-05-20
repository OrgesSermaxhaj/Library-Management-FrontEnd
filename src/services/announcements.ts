import api from '@/lib/api';

export interface Announcement {
  id: number;
  title: string;
  content: string;
  publishDate: string; // ISO string format from backend
}

export interface CreateAnnouncementData {
  title: string;
  content: string;
  publishDate?: string; // Optional for creation
}

export interface UpdateAnnouncementData extends Partial<CreateAnnouncementData> {}

export const announcementService = {
  // Get all announcements
  async getAllAnnouncements(): Promise<Announcement[]> {
    try {
      console.log('Fetching announcements from API...');
      const response = await api.get('/announcements');
      console.log('Raw API response:', response);
      
      // Ensure we're getting the data array from the response
      const announcements = response.data;
      console.log('Extracted announcements:', announcements);
      
      if (!Array.isArray(announcements)) {
        console.error('Invalid response format:', announcements);
        throw new Error('Invalid response format from server');
      }
      
      return announcements;
    } catch (error) {
      console.error('Error in getAllAnnouncements:', error);
      throw error;
    }
  },

  // Get announcement by ID
  async getAnnouncementById(id: number): Promise<Announcement> {
    const response = await api.get(`/announcements/${id}`);
    return response.data;
  },

  // Create new announcement
  async createAnnouncement(data: CreateAnnouncementData): Promise<Announcement> {
    try {
      // Format the date properly for the backend, accounting for timezone
      const announcementData = {
        ...data,
        publishDate: data.publishDate 
          ? new Date(data.publishDate + 'T12:00:00').toISOString() // Set to noon to avoid timezone issues
          : new Date().toISOString()
      };

      console.log('Creating announcement with data:', announcementData);
      const response = await api.post('/announcements', announcementData);
      console.log('Create announcement response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error creating announcement:', error);
      if (error.response) {
        console.error('Error response:', error.response.data);
      }
      throw error;
    }
  },

  // Update announcement
  async updateAnnouncement(id: number, data: UpdateAnnouncementData): Promise<Announcement> {
    try {
      // Format the date properly for the backend, accounting for timezone
      const announcementData = {
        ...data,
        publishDate: data.publishDate 
          ? new Date(data.publishDate + 'T12:00:00').toISOString() // Set to noon to avoid timezone issues
          : undefined
      };

      console.log('Updating announcement with data:', announcementData);
      const response = await api.put(`/announcements/${id}`, announcementData);
      console.log('Update announcement response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error updating announcement:', error);
      if (error.response) {
        console.error('Error response:', error.response.data);
      }
      throw error;
    }
  },

  // Delete announcement
  async deleteAnnouncement(id: number): Promise<void> {
    try {
      await api.delete(`/announcements/${id}`);
    } catch (error) {
      console.error('Error deleting announcement:', error);
      if (error.response) {
        console.error('Error response:', error.response.data);
      }
      throw error;
    }
  }
}; 