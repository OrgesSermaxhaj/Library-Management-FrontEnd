import api from "@/lib/api";
import { User } from "@/types/user";

export const userService = {
  getAllUsers: async (): Promise<User[]> => {
    const response = await api.get("/users");
    return response.data;
  },

  getUserById: async (id: number): Promise<User> => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  createUser: async (user: Omit<User, "id">): Promise<User> => {
    const response = await api.post("/users", user);
    return response.data;
  },

  updateUser: async (id: number, user: Partial<User>): Promise<User> => {
    const response = await api.put(`/users/${id}`, user);
    return response.data;
  },

  deleteUser: async (id: number): Promise<void> => {
    await api.delete(`/users/${id}`);
  },
}; 