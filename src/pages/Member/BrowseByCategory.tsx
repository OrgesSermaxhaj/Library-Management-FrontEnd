import { useState } from 'react';
import { useBooks } from '@/hooks/useBooks';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Book, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function BrowseByCategory() {
  const { books, categories, isLoading, error } = useBooks();
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  // Group books by category
  const booksByCategory = categories.reduce((acc, category) => {
    const categoryBooks = books.filter(book => book.categoryId === category.id);
    if (categoryBooks.length > 0) {
      acc[category.id] = {
        name: category.name,
        books: categoryBooks
      };
    }
    return acc;
  }, {} as Record<number, { name: string; books: typeof books }>);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-8">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Browse by Category</h1>

      {Object.entries(booksByCategory).map(([categoryId, { name, books }]) => (
        <div key={categoryId} className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold">{name}</h2>
            <Button variant="ghost" asChild>
              <Link to={`/member/category/${categoryId}`}>
                View All <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.slice(0, 3).map(book => (
              <Card key={book.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{book.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-500">
                      ISBN: {book.isbn}
                    </p>
                    <p className="text-sm text-gray-500">
                      Available: {book.quantity}
                    </p>
                    <Button 
                      className="w-full"
                      disabled={book.quantity === 0}
                    >
                      {book.quantity === 0 ? 'Not Available' : 'Reserve'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}

      {Object.keys(booksByCategory).length === 0 && (
        <div className="text-center py-12">
          <Book className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No books found</h3>
          <p className="mt-1 text-sm text-gray-500">Books will appear here once they are added to the library</p>
        </div>
      )}
    </div>
  );
} 