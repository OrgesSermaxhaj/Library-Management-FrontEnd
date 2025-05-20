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

export interface AddBookData {
  title: string;
  isbn: string;
  quantity: number;
  authorId: number;
  categoryId: number;
  publisherId: number;
}

export const addBook = async (bookData: AddBookData) => {
  try {
    console.log('Making API call to add book with data:', bookData);
    const response = await api.post('/books', bookData);
    console.log('API response:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('Error details:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });
    throw error;
  }
};

export const bookService = {
  // Get all books
  async getAllBooks(): Promise<Book[]> {
    try {
    const response = await api.get('/books');
      console.log('Fetched books:', response.data);
    return response.data;
    } catch (error) {
      console.error('Error fetching books:', error);
      throw error;
    }
  },

  // Get book by ID
  async getBookById(id: number): Promise<Book> {
    const response = await api.get(`/books/${id}`);
    return response.data;
  },

  // Get all authors
  async getAllAuthors(): Promise<{ id: number; name: string }[]> {
    try {
    const response = await api.get('/authors');
      console.log('Fetched authors:', response.data);
    return response.data;
    } catch (error) {
      console.error('Error fetching authors:', error);
      throw error;
    }
  },

  // Get all categories
  async getAllCategories(): Promise<{ id: number; name: string }[]> {
    try {
    const response = await api.get('/categories');
      console.log('Fetched categories:', response.data);
    return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  },

  // Get all publishers
  async getAllPublishers(): Promise<{ id: number; name: string }[]> {
    try {
    const response = await api.get('/publishers');
      console.log('Fetched publishers:', response.data);
    return response.data;
    } catch (error) {
      console.error('Error fetching publishers:', error);
      throw error;
    }
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