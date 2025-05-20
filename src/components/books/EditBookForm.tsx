import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Edit } from "lucide-react";
import { bookService } from "@/services/books";
import { toast } from "sonner";

interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  isbn: string;
  quantity: number;
}

interface EditBookFormProps {
  book: Book;
  authors: { id: number; name: string }[];
  categories: { id: number; name: string }[];
  onEditComplete: () => void;
}

export const EditBookForm = ({ book, authors, categories, onEditComplete }: EditBookFormProps) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: book.title,
    isbn: book.isbn,
    quantity: book.quantity,
    authorId: authors.find(a => a.name === book.author)?.id || 0,
    categoryId: categories.find(c => c.name === book.genre)?.id || 0,
    publisherId: 1, // Default publisher ID, you might want to make this dynamic
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await bookService.updateBook(book.id, formData);
      toast.success("Book updated successfully!");
      setOpen(false);
      onEditComplete();
    } catch (error) {
      console.error("Error updating book:", error);
      toast.error("Failed to update book");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Edit className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Book</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="isbn">ISBN</Label>
            <Input
              id="isbn"
              value={formData.isbn}
              onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              type="number"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="author">Author</Label>
            <Select
              value={formData.authorId.toString()}
              onValueChange={(value) => setFormData({ ...formData, authorId: parseInt(value) })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select author" />
              </SelectTrigger>
              <SelectContent>
                {authors.map((author) => (
                  <SelectItem key={author.id} value={author.id.toString()}>
                    {author.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select
              value={formData.categoryId.toString()}
              onValueChange={(value) => setFormData({ ...formData, categoryId: parseInt(value) })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id.toString()}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}; 