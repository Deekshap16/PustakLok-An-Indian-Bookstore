import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { booksAPI } from '../services/api';
import BookCard from '../components/BookCard';

const Home = () => {
  const [featuredBooks, setFeaturedBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedBooks();
  }, []);

  const fetchFeaturedBooks = async () => {
    try {
      const response = await booksAPI.getAll({ sortBy: 'price-asc' });
      setFeaturedBooks(response.data.books.slice(0, 6));
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  };

  const genres = ['Mythical', 'Fiction', 'Non-Fiction', 'Biography', 'History'];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-bookstore-brown to-bookstore-dark text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Welcome to PustakLok</h1>
          <p className="text-xl mb-8">
            Discover the finest collection of Indian literature, mythology, and stories
          </p>
          <Link
            to="/books"
            className="inline-block px-8 py-3 bg-white text-bookstore-brown rounded-lg font-semibold hover:bg-bookstore-beige transition"
          >
            Explore Books
          </Link>
        </div>
      </div>

      {/* Featured Books */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-bookstore-dark">Featured Books</h2>
          <Link
            to="/books"
            className="text-bookstore-brown hover:text-bookstore-dark font-semibold"
          >
            View All →
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="text-bookstore-brown">Loading books...</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
            {featuredBooks.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        )}
      </div>

      {/* Categories */}
      <div className="bg-bookstore-beige py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-bookstore-dark mb-8 text-center">
            Browse by Genre
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {genres.map((genre) => (
              <Link
                key={genre}
                to={`/books?genre=${genre}`}
                className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-xl transition-transform transform hover:-translate-y-1"
              >
                <div className="text-4xl mb-2">📖</div>
                <div className="font-semibold text-bookstore-dark">{genre}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-3xl font-bold text-bookstore-dark mb-4">
            Your Gateway to Indian Literature
          </h2>
          <p className="text-lg text-bookstore-brown max-w-3xl mx-auto">
            Explore our curated collection of books from renowned Indian authors, 
            from epic mythological tales to contemporary fiction. Discover stories 
            that celebrate India's rich literary heritage.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;



