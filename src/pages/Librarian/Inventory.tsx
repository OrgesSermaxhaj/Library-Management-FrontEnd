
import { useState } from "react";
import LibrarianLayout from "@/components/layout/LibrarianLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, PlusCircle } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const categories = ["Fiction", "Non-fiction", "Science Fiction", "Fantasy", "Mystery", "Biography", "History", "All"];

const books = [
  { id: "1", isbn: "978-3-16-148410-0", title: "The Great Gatsby", author: "F. Scott Fitzgerald", category: "Fiction", published: "1925", copies: 3, available: 1 },
  { id: "2", isbn: "978-3-16-148411-7", title: "To Kill a Mockingbird", author: "Harper Lee", category: "Fiction", published: "1960", copies: 5, available: 0 },
  { id: "3", isbn: "978-3-16-148412-4", title: "1984", author: "George Orwell", category: "Science Fiction", published: "1949", copies: 7, available: 7 },
  { id: "4", isbn: "978-3-16-148413-1", title: "Pride and Prejudice", author: "Jane Austen", category: "Fiction", published: "1813", copies: 4, available: 2 },
  { id: "5", isbn: "978-3-16-148414-8", title: "The Catcher in the Rye", author: "J.D. Salinger", category: "Fiction", published: "1951", copies: 6, available: 4 },
  { id: "6", isbn: "978-3-16-148415-5", title: "A Brief History of Time", author: "Stephen Hawking", category: "Non-fiction", published: "1988", copies: 2, available: 1 },
  { id: "7", isbn: "978-3-16-148416-2", title: "Dune", author: "Frank Herbert", category: "Science Fiction", published: "1965", copies: 3, available: 3 },
];

const Inventory = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           book.isbn.includes(searchQuery);
    const matchesCategory = selectedCategory === "All" || book.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <LibrarianLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Book Inventory Management</h1>
          <Button className="flex items-center gap-2">
            <PlusCircle className="h-4 w-4" />
            Add New Book
          </Button>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-medium">Book Collection</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by title, author or ISBN..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ISBN</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Published</TableHead>
                    <TableHead className="text-center">Total Copies</TableHead>
                    <TableHead className="text-center">Available</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBooks.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-10 text-muted-foreground">
                        No books found matching your search criteria
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredBooks.map((book) => (
                      <TableRow key={book.id} className="hover:bg-muted/50 cursor-pointer">
                        <TableCell className="font-mono text-xs">{book.isbn}</TableCell>
                        <TableCell className="font-medium">{book.title}</TableCell>
                        <TableCell>{book.author}</TableCell>
                        <TableCell>{book.category}</TableCell>
                        <TableCell>{book.published}</TableCell>
                        <TableCell className="text-center">{book.copies}</TableCell>
                        <TableCell className="text-center">
                          {book.available === 0 ? (
                            <Badge variant="destructive">Out of stock</Badge>
                          ) : book.available < 3 ? (
                            <Badge variant="outline" className="text-amber-500 border-amber-500">Low stock ({book.available})</Badge>
                          ) : (
                            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">In stock ({book.available})</Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </LibrarianLayout>
  );
};

export default Inventory;
