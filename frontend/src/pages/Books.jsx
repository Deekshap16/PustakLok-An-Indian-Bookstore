import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { booksAPI } from '../services/api';
import BookCard from '../components/BookCard';

const Books = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    genre: searchParams.get('genre') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    language: searchParams.get('language') || '',
    sortBy: searchParams.get('sortBy') || ''
  });

  useEffect(() => {
    fetchBooks();
  }, [searchParams]);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const params = {
        search: searchParams.get('search') || '',
        genre: searchParams.get('genre') || '',
        minPrice: searchParams.get('minPrice') || '',
        maxPrice: searchParams.get('maxPrice') || '',
        language: searchParams.get('language') || '',
        sortBy: searchParams.get('sortBy') || ''
      };

      const response = await booksAPI.getAll(params);
      setBooks(response.data.books);
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    
    // Update URL params
    const params = new URLSearchParams();
    Object.keys(newFilters).forEach(k => {
      if (newFilters[k]) {
        params.set(k, newFilters[k]);
      }
    });
    setSearchParams(params);
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      genre: '',
      minPrice: '',
      maxPrice: '',
      language: '',
      sortBy: ''
    });
    setSearchParams({});
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-bookstore-dark mb-8">All Books</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="lg:w-64 flex-shrink-0">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-bookstore-dark">Filters</h2>
              <button
                onClick={clearFilters}
                className="text-sm text-bookstore-brown hover:text-bookstore-dark"
              >
                Clear All
              </button>
            </div>

            {/* Search */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-bookstore-dark mb-2">
                Search
              </label>
              <input
                type="text"
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                placeholder="Title or author..."
                className="w-full px-3 py-2 border border-bookstore-brown rounded-lg focus:outline-none focus:ring-2 focus:ring-bookstore-brown"
              />
            </div>

            {/* Genre */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-bookstore-dark mb-2">
                Genre
              </label>
              <select
                value={filters.genre}
                onChange={(e) => handleFilterChange('genre', e.target.value)}
                className="w-full px-3 py-2 border border-bookstore-brown rounded-lg focus:outline-none focus:ring-2 focus:ring-bookstore-brown"
              >
                <option value="">All Genres</option>
                <option value="Mythical">Mythical</option>
                <option value="Fiction">Fiction</option>
                <option value="Non-Fiction">Non-Fiction</option>
                <option value="Biography">Biography</option>
                <option value="History">History</option>
                <option value="Romance">Romance</option>
                <option value="Thriller">Thriller</option>
                <option value="Self-Help">Self-Help</option>
              </select>
            </div>

            {/* Price Range */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-bookstore-dark mb-2">
                Price Range
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={filters.minPrice}
                  onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                  placeholder="Min"
                  className="w-full px-3 py-2 border border-bookstore-brown rounded-lg focus:outline-none focus:ring-2 focus:ring-bookstore-brown"
                />
                <input
                  type="number"
                  value={filters.maxPrice}
                  onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                  placeholder="Max"
                  className="w-full px-3 py-2 border border-bookstore-brown rounded-lg focus:outline-none focus:ring-2 focus:ring-bookstore-brown"
                />
              </div>
            </div>

            {/* Language */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-bookstore-dark mb-2">
                Language
              </label>
              <select
                value={filters.language}
                onChange={(e) => handleFilterChange('language', e.target.value)}
                className="w-full px-3 py-2 border border-bookstore-brown rounded-lg focus:outline-none focus:ring-2 focus:ring-bookstore-brown"
              >
                <option value="">All Languages</option>
                <option value="English">English</option>
                <option value="Hindi">Hindi</option>
              </select>
            </div>

            {/* Sort */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-bookstore-dark mb-2">
                Sort By
              </label>
              <select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                className="w-full px-3 py-2 border border-bookstore-brown rounded-lg focus:outline-none focus:ring-2 focus:ring-bookstore-brown"
              >
                <option value="">Default</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Books Grid */}
        <div className="flex-1">
          {loading ? (
            <div className="text-center py-12">
              <div className="text-bookstore-brown">Loading books...</div>
            </div>
          ) : books.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-xl text-bookstore-brown mb-4">No books found</div>
              <button
                onClick={clearFilters}
                className="px-4 py-2 bg-bookstore-brown text-white rounded-lg hover:bg-bookstore-dark"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <>
              <div className="mb-4 text-bookstore-dark">
                Showing {books.length} book{books.length !== 1 ? 's' : ''}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {books.map((book) => (
                  <BookCard key={book._id} book={book} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Books;



