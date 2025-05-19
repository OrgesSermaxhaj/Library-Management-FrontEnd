import { useQuery } from '@tanstack/react-query';
import { bookService, Book, Author, Category, Publisher } from '@/services/books';

export function useBooks() {
  const { data: books = [], isLoading: isLoadingBooks, error: booksError } = useQuery({
    queryKey: ['books'],
    queryFn: bookService.getAllBooks,
    retry: 1
  });

  const { data: authors = [], isLoading: isLoadingAuthors, error: authorsError } = useQuery({
    queryKey: ['authors'],
    queryFn: bookService.getAllAuthors,
    retry: 1
  });

  const { data: categories = [], isLoading: isLoadingCategories, error: categoriesError } = useQuery({
    queryKey: ['categories'],
    queryFn: bookService.getAllCategories,
    retry: 1
  });

  const { data: publishers = [], isLoading: isLoadingPublishers, error: publishersError } = useQuery({
    queryKey: ['publishers'],
    queryFn: bookService.getAllPublishers,
    retry: 1
  });

  const isLoading = isLoadingBooks || isLoadingAuthors || isLoadingCategories || isLoadingPublishers;
  const error = booksError || authorsError || categoriesError || publishersError;

  return {
    books,
    authors,
    categories,
    publishers,
    isLoading,
    error: error ? 'Failed to load some data. Please try again later.' : null
  };
} 