import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

// Get the auth token from localStorage
const getAuthToken = () => {
  const token = localStorage.getItem('token');
  return token ? `Bearer ${token}` : '';
};

export interface DashboardStats {
  totalBooks: {
    value: number;
    trend: { value: number; isPositive: boolean };
  };
  activeMembers: {
    value: number;
    trend: { value: number; isPositive: boolean };
  };
  overdueLoans: {
    value: number;
    trend: { value: number; isPositive: boolean };
  };
  issuesReported: {
    value: number;
    trend: { value: number; isPositive: boolean };
  };
}

export interface TodayActivity {
  id: number;
  type: 'LOAN' | 'RETURN' | 'RESERVATION' | 'FINE';
  description: string;
  timestamp: string;
  memberName: string;
}

export interface BookInventoryItem {
  id: number;
  title: string;
  available: number;
  total: number;
  category: string;
}

export const dashboardService = {
  getStats: async (): Promise<DashboardStats> => {
    const response = await axios.get(`${API_URL}/dashboard/stats`, {
      headers: {
        Authorization: getAuthToken()
      }
    });
    return response.data;
  },

  getTodayActivity: async (): Promise<TodayActivity[]> => {
    const response = await axios.get(`${API_URL}/dashboard/activity/today`, {
      headers: {
        Authorization: getAuthToken()
      }
    });
    return response.data;
  },

  getBookInventory: async (): Promise<BookInventoryItem[]> => {
    const response = await axios.get(`${API_URL}/dashboard/inventory`, {
      headers: {
        Authorization: getAuthToken()
      }
    });
    return response.data;
  },

  getServiceStatus: async () => {
    const response = await axios.get(`${API_URL}/dashboard/service-status`, {
      headers: {
        Authorization: getAuthToken()
      }
    });
    return response.data;
  }
}; 