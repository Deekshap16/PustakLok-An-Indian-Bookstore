import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { booksAPI } from '../services/api';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import BookImage from '../components/BookImage';

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState('');
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    fetchBook();
  }, [id]);

  const fetchBook = async () => {
    try {
      const response = await booksAPI.getById(id);
      setBook(response.data);
    } catch (error) {
      console.error('Error fetching book:', error);
      navigate('/books');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const result = await addToCart(book._id, quantity);
    if (result.success) {
      setMessage('Added to cart successfully!');
      setTimeout(() => setMessage(''), 3000);
    } else {
      setMessage(result.message || 'Failed to add to cart');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="text-bookstore-brown">Loading book details...</div>
      </div>
    );
  }

  if (!book) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          {/* Book Image */}
          <div className="md:w-1/3 bg-bookstore-beige flex items-center justify-center p-8">
            <BookImage
              src={book.image}
              alt={book.title}
              title={book.title}
              className="max-w-full h-auto rounded-lg shadow-md"
            />
          </div>

          {/* Book Details */}
          <div className="md:w-2/3 p-8">
            <h1 className="text-4xl font-bold text-bookstore-dark mb-4">
              {book.title}
            </h1>
            <p className="text-xl text-bookstore-brown mb-6">by {book.author}</p>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center">
                <span className="text-yellow-500 text-2xl">⭐</span>
                <span className="text-xl text-bookstore-dark ml-2">
                  {book.rating}
                </span>
              </div>
              <span className="px-3 py-1 bg-bookstore-beige rounded-full text-bookstore-dark">
                {book.genre}
              </span>
              <span className="px-3 py-1 bg-bookstore-beige rounded-full text-bookstore-dark">
                {book.language}
              </span>
            </div>

            <div className="text-4xl font-bold text-bookstore-dark mb-6">
              ₹{book.price}
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-bookstore-dark mb-2">
                Description
              </h3>
              <p className="text-bookstore-brown leading-relaxed">
                {book.description}
              </p>
            </div>

            <div className="mb-6">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-bookstore-dark">Stock:</span>
                <span
                  className={`font-semibold ${
                    book.stock > 0 ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {book.stock > 0 ? `${book.stock} available` : 'Out of stock'}
                </span>
              </div>
            </div>

            {message && (
              <div
                className={`mb-4 p-3 rounded-lg ${
                  message.includes('success')
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {message}
              </div>
            )}

            {book.stock > 0 ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 border border-bookstore-brown rounded-lg hover:bg-bookstore-beige"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-semibold text-bookstore-dark">
                    {quantity}
                  </span>
                  <button
                    onClick={() =>
                      setQuantity(Math.min(book.stock, quantity + 1))
                    }
                    className="w-10 h-10 border border-bookstore-brown rounded-lg hover:bg-bookstore-beige"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  className="flex-1 px-6 py-3 bg-bookstore-brown text-white rounded-lg hover:bg-bookstore-dark transition font-semibold"
                >
                  Add to Cart
                </button>
              </div>
            ) : (
              <button
                disabled
                className="w-full px-6 py-3 bg-gray-400 text-white rounded-lg cursor-not-allowed"
              >
                Out of Stock
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;



