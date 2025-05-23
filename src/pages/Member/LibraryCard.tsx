import { useEffect, useState } from "react";
import MemberLayout from "@/components/layout/MemberLayout";
import LibraryCardComponent from "@/components/dashboard/LibraryCard";
import { useAuth } from "@/contexts/AuthContext";
import api from "@/lib/api";
import { toast } from "sonner";

interface LibraryCardData {
  id: number;
  issuedDate: string;
  expiryDate: string;
  status: string;
  fullName: string;
  membershipId: string;
}

const LibraryCard = () => {
  const { user } = useAuth();
  const [cardData, setCardData] = useState<LibraryCardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLibraryCard = async () => {
      try {
        const response = await api.get('/library-cards/me', {
          headers: {
            'X-User-ID': user?.id
          }
        });
        setCardData(response.data);
      } catch (error) {
        console.error('Error fetching library card:', error);
        toast.error('Failed to load library card information');
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) {
      fetchLibraryCard();
    }
  }, [user?.id]);

  return (
    <MemberLayout>
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">My Library Card</h1>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : cardData ? (
          <LibraryCardComponent card={cardData} />
        ) : (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <p className="text-gray-500 dark:text-gray-400">
              No library card information available. Please contact the library staff for assistance.
            </p>
          </div>
        )}
      </div>
    </MemberLayout>
  );
};

export default LibraryCard;
