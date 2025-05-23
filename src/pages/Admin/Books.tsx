import { useState, useEffect } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Trash2 } from "lucide-react";
import { AddBookForm } from "@/components/books/AddBookForm";
import { EditBookForm } from "@/components/books/EditBookForm";
import { addBook, bookService } from "@/services/books";
import { toast } from "sonner";

interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  isbn: string;
  quantity: number;
}

const AdminBooks = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState<Book[]>([]);
  const [authors, setAuthors] = useState<{ id: number; name: string }[]>([]);
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);

  const fetchBooks = async () => {
    try {
      const [booksData, authorsData, categoriesData] = await Promise.all([
        bookService.getAllBooks(),
        bookService.getAllAuthors(),
        bookService.getAllCategories()
      ]);
      setBooks(booksData.map(book => ({
        id: book.id.toString(),
        title: book.title,
        author: authorsData.find(a => a.id === book.authorId)?.name || 'Unknown',
        genre: categoriesData.find(c => c.id === book.categoryId)?.name || 'Unknown',
        isbn: book.isbn,
        quantity: book.quantity
      })));
      setAuthors(authorsData);
      setCategories(categoriesData);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load books");
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const filteredBooks = books.filter((book) => 
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddBook = async (bookData: {
    title: string;
    isbn: string;
    quantity: number;
    authorId: number;
    categoryId: number;
    publisherId: number;
  }) => {
    try {
      console.log("Sending book data:", bookData);
      const newBook = await addBook(bookData);
      console.log("Received response:", newBook);
      await fetchBooks();
      toast.success("Book added successfully!");
    } catch (error) {
      console.error("Error adding book:", error);
      toast.error("Failed to add book. Please check the console for details.");
    }
  };

  const handleDeleteBook = async (bookId: string) => {
    try {
      await bookService.deleteBook(bookId);
      setBooks(books.filter(book => book.id !== bookId));
      toast.success("Book deleted successfully!");
    } catch (error) {
      console.error("Error deleting book:", error);
      toast.error("Failed to delete book");
    }
  };
  
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Book Management</h1>
          <AddBookForm onAddBook={handleAddBook} />
        </div>

        <div className="relative w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <Input
            placeholder="Search by title or author..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Genre</TableHead>
                <TableHead>ISBN</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBooks.length > 0 ? (
                filteredBooks.map((book) => (
                  <TableRow key={book.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{book.title}</TableCell>
                    <TableCell>{book.author}</TableCell>
                    <TableCell>{book.genre}</TableCell>
                    <TableCell>{book.isbn}</TableCell>
                    <TableCell>{book.quantity}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <EditBookForm
                          book={book}
                          authors={authors}
                          categories={categories}
                          onEditComplete={fetchBooks}
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteBook(book.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                    No books found matching your search.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminBooks; 