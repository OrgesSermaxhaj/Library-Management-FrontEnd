import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { userService } from "@/services/users";
import { User } from "@/types/user";
import { toast } from "sonner";

export const useUsers = () => {
  const queryClient = useQueryClient();

  const { data: users = [], isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: userService.getAllUsers,
  });

  const createUserMutation = useMutation({
    mutationFn: userService.createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User created successfully");
    },
    onError: (error) => {
      toast.error("Failed to create user");
      console.error("Create user error:", error);
    },
  });

  const updateUserMutation = useMutation({
    mutationFn: (user: Partial<User> & { id: number }) => {
      // Get the current user data to include the version
      const currentUser = users.find(u => u.id === user.id);
      if (!currentUser) {
        throw new Error("User not found");
      }
      return userService.updateUser(user.id, {
        ...user,
        version: currentUser.version
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User updated successfully");
    },
    onError: (error: any) => {
      if (error.response?.status === 409) {
        toast.error("The user was modified by another user. Please refresh and try again.");
      } else {
        toast.error("Failed to update user");
      }
      console.error("Update user error:", error);
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: userService.deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User deleted successfully");
    },
    onError: (error) => {
      toast.error("Failed to delete user");
      console.error("Delete user error:", error);
    },
  });

  return {
    users,
    isLoading,
    error,
    createUser: createUserMutation.mutate,
    updateUser: updateUserMutation.mutate,
    deleteUser: deleteUserMutation.mutate,
  };
}; 