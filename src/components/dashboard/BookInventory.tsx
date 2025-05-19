
import { useState } from "react";
import { Search, Edit } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useBookInventory } from "@/hooks/useBookInventory";

const BookInventory = () => {
  const { books, isLoading } = useBookInventory();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStockBadge = (stock: number) => {
    if (stock > 5) return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">In Stock ({stock})</Badge>;
    if (stock > 0) return <Badge variant="outline" className="text-amber-500 border-amber-500">Low Stock ({stock})</Badge>;
    return <Badge variant="destructive">Out of Stock</Badge>;
  };

  return (
    <Card className="h-[360px] overflow-hidden">
      <CardHeader className="py-3 px-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <CardTitle className="text-base font-semibold">Book Inventory</CardTitle>
          
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search books..."
              className="pl-8 h-9 text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {isLoading ? (
          <div className="text-center py-4">Loading inventory...</div>
        ) : (
          <div className="overflow-auto h-[280px]">
            <Table className="w-full">
              <TableHeader className="sticky top-0 bg-white dark:bg-gray-800 z-10">
                <TableRow>
                  <TableHead className="py-2">Title</TableHead>
                  <TableHead className="py-2">Author</TableHead>
                  <TableHead className="py-2">Stock</TableHead>
                  <TableHead className="py-2">Loans</TableHead>
                  <TableHead className="w-[80px] py-2"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBooks.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-4">
                      No books found matching your search
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredBooks.map((book) => (
                    <TableRow key={book.id}>
                      <TableCell className="font-medium py-2 text-sm">{book.title}</TableCell>
                      <TableCell className="py-2 text-sm">{book.author}</TableCell>
                      <TableCell className="py-2 text-sm">{getStockBadge(book.stock)}</TableCell>
                      <TableCell className="py-2 text-sm">{book.loans}</TableCell>
                      <TableCell className="py-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BookInventory;
