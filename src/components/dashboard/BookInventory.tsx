import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface BookInventoryItem {
  id: number;
  title: string;
  available: number;
  total: number;
  category: string;
}

const BookInventory = () => {
  const [inventory, setInventory] = useState<BookInventoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Mock data
        const mockInventory: BookInventoryItem[] = [
          {
            id: 1,
            title: "The Great Gatsby",
            available: 3,
            total: 5,
            category: "Fiction"
          },
          {
            id: 2,
            title: "To Kill a Mockingbird",
            available: 2,
            total: 4,
            category: "Fiction"
          },
          {
            id: 3,
            title: "1984",
            available: 1,
            total: 3,
            category: "Science Fiction"
          },
          {
            id: 4,
            title: "Pride and Prejudice",
            available: 4,
            total: 6,
            category: "Romance"
          }
        ];

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        setInventory(mockInventory);
      } catch (err) {
        setError('Failed to fetch book inventory');
        console.error('Error fetching book inventory:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInventory();
  }, []);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Book Inventory</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Book Inventory</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-red-500">{error}</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Book Inventory</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {inventory.map((book) => (
            <div key={book.id} className="space-y-2">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium">{book.title}</h4>
                  <p className="text-sm text-gray-500">{book.category}</p>
                </div>
                <div className="text-sm">
                  {book.available}/{book.total} available
                </div>
              </div>
              <Progress value={(book.available / book.total) * 100} />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default BookInventory;
