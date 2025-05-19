import api from '@/lib/api';

export interface Book {
  id: number;
  title: string;
  isbn: string;
  quantity: number;
  authorId: number;
  categoryId: number;
  publisherId: number;
}

export interface Author {
  id: number;
  name: string;
}

export interface Category {
  id: number;
  name: string;
  description: string;
}

export interface Publisher {
  id: number;
  name: string;
}

export interface BookSearchParams {
  query?: string;
  category?: string;
  author?: string;
  available?: boolean;
  page?: number;
  limit?: number;
}

export const bookService = {
  // Get all books
  async getAllBooks(): Promise<Book[]> {
    const response = await api.get('/books');
    return response.data;
  },

  // Get book by ID
  async getBookById(id: number): Promise<Book> {
    const response = await api.get(`/books/${id}`);
    return response.data;
  },

  // Get all authors
  async getAllAuthors(): Promise<Author[]> {
    const response = await api.get('/authors');
    return response.data;
  },

  // Get all categories
  async getAllCategories(): Promise<Category[]> {
    const response = await api.get('/categories');
    return response.data;
  },

  // Get all publishers
  async getAllPublishers(): Promise<Publisher[]> {
    const response = await api.get('/publishers');
    return response.data;
  },

  async getBooks(params: BookSearchParams = {}): Promise<{ books: Book[]; total: number }> {
    const response = await api.get('/books', { params });
    return response.data;
  },

  async createBook(book: Omit<Book, 'id'>): Promise<Book> {
    const response = await api.post('/books', book);
    return response.data;
  },

  async updateBook(id: string, book: Partial<Book>): Promise<Book> {
    const response = await api.put(`/books/${id}`, book);
    return response.data;
  },

  async deleteBook(id: string): Promise<void> {
    await api.delete(`/books/${id}`);
  },

  async getCategories(): Promise<string[]> {
    const response = await api.get('/books/categories');
    return response.data;
  }
}; 