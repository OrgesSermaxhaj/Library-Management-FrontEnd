import { useState } from 'react';
import { useBooks } from '@/hooks/useBooks';
import { useReservations } from '@/hooks/useReservations';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Book, Search, Filter } from 'lucide-react';
import { toast } from 'sonner';
import MemberLayout from "@/components/layout/MemberLayout";

const MAX_RESERVATIONS = 5;

export default function SearchBooks() {
  const { books, authors, categories, publishers, isLoading, error } = useBooks();
  const { 
    createReservation, 
    isLoading: isReserving, 
    activeReservationsCount 
  } = useReservations();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAuthor, setSelectedAuthor] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPublisher, setSelectedPublisher] = useState<string>('all');
  const [reservingBookId, setReservingBookId] = useState<number | null>(null);

  // Helper function to get author name by ID
  const getAuthorName = (authorId: number) => {
    return authors.find(a => a.id === authorId)?.name || 'Unknown Author';
  };

  // Helper function to get category name by ID
  const getCategoryName = (categoryId: number) => {
    return categories.find(c => c.id === categoryId)?.name || 'Unknown Category';
  };

  // Helper function to get publisher name by ID
  const getPublisherName = (publisherId: number) => {
    return publishers.find(p => p.id === publisherId)?.name || 'Unknown Publisher';
  };

  // Handle reservation
  const handleReserve = async (bookId: number) => {
    try {
      setReservingBookId(bookId);
      await createReservation(bookId);
    } catch (error: any) {
      toast.error(error.message || 'Failed to reserve book');
    } finally {
      setReservingBookId(null);
    }
  };

  // Filter books based on search term and filters
  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAuthor = selectedAuthor === 'all' || book.authorId === Number(selectedAuthor);
    const matchesCategory = selectedCategory === 'all' || book.categoryId === Number(selectedCategory);
    const matchesPublisher = selectedPublisher === 'all' || book.publisherId === Number(selectedPublisher);
    return matchesSearch && matchesAuthor && matchesCategory && matchesPublisher;
  });

  if (isLoading) {
    return (
      <MemberLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
        </div>
      </MemberLayout>
    );
  }

  return (
    <MemberLayout>
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Browse Books</h1>
          <div className="text-sm text-gray-500">
            Active Reservations: {activeReservationsCount}/{MAX_RESERVATIONS}
          </div>
        </div>
        
        {/* Search and Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <Input
              placeholder="Search books..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={selectedAuthor} onValueChange={setSelectedAuthor}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by author" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Authors</SelectItem>
              {authors.map(author => (
                <SelectItem key={author.id} value={author.id.toString()}>
                  {author.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map(category => (
                <SelectItem key={category.id} value={category.id.toString()}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedPublisher} onValueChange={setSelectedPublisher}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by publisher" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Publishers</SelectItem>
              {publishers.map(publisher => (
                <SelectItem key={publisher.id} value={publisher.id.toString()}>
                  {publisher.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {/* Results */}
        {filteredBooks.length === 0 ? (
          <div className="text-center py-12">
            <Book className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No books found</h3>
            <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBooks.map(book => (
              <Card key={book.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{book.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-500">
                      Author: {getAuthorName(book.authorId)}
                    </p>
                    <p className="text-sm text-gray-500">
                      Category: {getCategoryName(book.categoryId)}
                    </p>
                    <p className="text-sm text-gray-500">
                      Publisher: {getPublisherName(book.publisherId)}
                    </p>
                    <p className="text-sm text-gray-500">
                      ISBN: {book.isbn}
                    </p>
                    <p className="text-sm text-gray-500">
                      Available: {book.quantity}
                    </p>
                    <Button 
                      className="w-full"
                      disabled={
                        book.quantity === 0 || 
                        isReserving || 
                        reservingBookId === book.id ||
                        activeReservationsCount >= MAX_RESERVATIONS
                      }
                      onClick={() => handleReserve(book.id)}
                    >
                      {isReserving && reservingBookId === book.id ? (
                        'Reserving...'
                      ) : book.quantity === 0 ? (
                        'Not Available'
                      ) : activeReservationsCount >= MAX_RESERVATIONS ? (
                        'Reservation Limit Reached'
                      ) : (
                        'Reserve'
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </MemberLayout>
  );
}
