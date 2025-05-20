import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { bookService } from "@/services/books";

interface AddBookFormProps {
  onAddBook: (book: {
    title: string;
    isbn: string;
    quantity: number;
    authorId: number;
    categoryId: number;
    publisherId: number;
  }) => void;
}

export function AddBookForm({ onAddBook }: AddBookFormProps) {
  const [open, setOpen] = useState(false);
  const [authors, setAuthors] = useState<{ id: number; name: string }[]>([]);
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
  const [publishers, setPublishers] = useState<{ id: number; name: string }[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    isbn: "",
    quantity: 1,
    authorId: 0,
    categoryId: 0,
    publisherId: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [authorsData, categoriesData, publishersData] = await Promise.all([
          bookService.getAllAuthors(),
          bookService.getAllCategories(),
          bookService.getAllPublishers()
        ]);
        setAuthors(authorsData);
        setCategories(categoriesData);
        setPublishers(publishersData);
      } catch (error) {
        console.error("Error fetching form data:", error);
      }
    };

    if (open) {
      fetchData();
    }
  }, [open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.authorId && formData.categoryId && formData.publisherId) {
      onAddBook(formData);
      setFormData({
        title: "",
        isbn: "",
        quantity: 1,
        authorId: 0,
        categoryId: 0,
        publisherId: 0,
      });
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-library-primary hover:bg-library-secondary gap-2">
          <Plus size={16} />
          Add Book
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Book</DialogTitle>
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
            <Label htmlFor="author">Author</Label>
            <Select
              value={formData.authorId.toString()}
              onValueChange={(value) => setFormData({ ...formData, authorId: parseInt(value) })}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select an author" />
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
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
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
          <div className="space-y-2">
            <Label htmlFor="publisher">Publisher</Label>
            <Select
              value={formData.publisherId.toString()}
              onValueChange={(value) => setFormData({ ...formData, publisherId: parseInt(value) })}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a publisher" />
              </SelectTrigger>
              <SelectContent>
                {publishers.map((publisher) => (
                  <SelectItem key={publisher.id} value={publisher.id.toString()}>
                    {publisher.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              type="number"
              min="1"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) })}
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Book</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
} 