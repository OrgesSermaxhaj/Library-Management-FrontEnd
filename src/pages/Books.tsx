
import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus } from "lucide-react";

interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  status: "Available" | "Borrowed" | "Reserved";
  location: string;
  addedDate: string;
}

const booksData: Book[] = [
  {
    id: "BK-43251",
    title: "The Midnight Line",
    author: "Lee Child",
    genre: "Thriller",
    status: "Borrowed",
    location: "Fiction, Shelf 3",
    addedDate: "Jan 10, 2022",
  },
  {
    id: "BK-52345",
    title: "Ender's Game",
    author: "Orson Scott Card",
    genre: "Science Fiction",
    status: "Borrowed",
    location: "Sci-Fi, Shelf 1",
    addedDate: "Feb 15, 2022",
  },
  {
    id: "BK-78901",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Classic",
    status: "Available",
    location: "Classic, Shelf 2",
    addedDate: "Mar 5, 2022",
  },
  {
    id: "BK-23456",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "Classic",
    status: "Available",
    location: "Classic, Shelf 2",
    addedDate: "Mar 10, 2022",
  },
  {
    id: "BK-67890",
    title: "1984",
    author: "George Orwell",
    genre: "Dystopian",
    status: "Reserved",
    location: "Fiction, Shelf 4",
    addedDate: "Apr 15, 2022",
  },
  {
    id: "BK-34567",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    genre: "Romance",
    status: "Available",
    location: "Fiction, Shelf 1",
    addedDate: "Apr 20, 2022",
  },
  {
    id: "BK-89012",
    title: "Harry Potter and the Philosopher's Stone",
    author: "J.K. Rowling",
    genre: "Fantasy",
    status: "Borrowed",
    location: "Fantasy, Shelf 2",
    addedDate: "May 1, 2022",
  },
  {
    id: "BK-45678",
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    genre: "Fantasy",
    status: "Available",
    location: "Fantasy, Shelf 1",
    addedDate: "May 5, 2022",
  },
];

const Books = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredBooks = booksData.filter((book) => 
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const getStatusColor = (status: Book["status"]) => {
    switch (status) {
      case "Available":
        return "bg-green-100 text-green-700";
      case "Borrowed":
        return "bg-blue-100 text-blue-700";
      case "Reserved":
        return "bg-amber-100 text-amber-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };
  
  return (
    <div className="flex h-screen overflow-hidden bg-library-background">
      <Sidebar />
      
      <div className="flex-1 overflow-y-auto p-8">
        <Header title="Books" />
        
        <div className="mb-6 flex justify-between">
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="Search by title or author..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button className="bg-library-primary hover:bg-library-secondary gap-2">
            <Plus size={16} />
            Add Book
          </Button>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Book ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Genre</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Added Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBooks.length > 0 ? (
                filteredBooks.map((book) => (
                  <TableRow key={book.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{book.id}</TableCell>
                    <TableCell>{book.title}</TableCell>
                    <TableCell>{book.author}</TableCell>
                    <TableCell>{book.genre}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}>
                        {book.status}
                      </span>
                    </TableCell>
                    <TableCell>{book.location}</TableCell>
                    <TableCell>{book.addedDate}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                    No books found matching your search.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Books;
