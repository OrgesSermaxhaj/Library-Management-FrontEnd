import { useState, useEffect } from "react";
import { useUsers } from "./useUsers";
import { useBooks } from "./useBooks";

interface StatsData {
  totalUsers: number;
  totalBooks: number;
  activeMembers: number;
}

export function useStats() {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { users, isLoading: usersLoading } = useUsers();
  const { books, isLoading: booksLoading } = useBooks();

  useEffect(() => {
    if (!usersLoading && !booksLoading) {
      // Calculate total users
      const totalUsers = users?.length || 0;
      
      // Calculate total books
      const totalBooks = books?.length || 0;
      
      // Calculate active members (users with role MEMBER)
      const activeMembers = users?.filter(user => user.role === "MEMBER").length || 0;

      setStats({
        totalUsers,
        totalBooks,
        activeMembers
      });
      setIsLoading(false);
    }
  }, [users, books, usersLoading, booksLoading]);

  return { stats, isLoading };
}
