import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import BookImage from '../components/BookImage';

const Cart = () => {
  const { cart, loading, updateQuantity, removeFromCart, getCartTotal, fetchCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    fetchCart();
  }, [isAuthenticated]);

  const handleQuantityChange = async (bookId, newQuantity) => {
    if (newQuantity < 1) {
      await removeFromCart(bookId);
    } else {
      await updateQuantity(bookId, newQuantity);
    }
  };

  const handleCheckout = () => {
    alert('Checkout functionality would be implemented here. This is a demo.');
  };

  if (!isAuthenticated) {
    return null;
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="text-bookstore-brown">Loading cart...</div>
      </div>
    );
  }

  const total = getCartTotal();
  const itemCount = cart?.items?.length || 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-bookstore-dark mb-8">Shopping Cart</h1>

      {!cart || itemCount === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-2xl font-bold text-bookstore-dark mb-4">
            Your cart is empty
          </h2>
          <p className="text-bookstore-brown mb-6">
            Start adding books to your cart to continue shopping
          </p>
          <Link
            to="/books"
            className="inline-block px-6 py-3 bg-bookstore-brown text-white rounded-lg hover:bg-bookstore-dark transition"
          >
            Browse Books
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {cart.items.map((item) => {
                const book = item.bookId;
                if (!book) return null;

                return (
                  <div
                    key={item._id || book._id}
                    className="flex flex-col sm:flex-row border-b border-bookstore-beige last:border-0 p-6"
                  >
                    <Link
                      to={`/books/${book._id}`}
                      className="sm:w-32 h-40 bg-bookstore-beige rounded-lg overflow-hidden mb-4 sm:mb-0 relative"
                    >
                      <BookImage
                        src={book.image}
                        alt={book.title}
                        title={book.title}
                        className="w-full h-full object-cover"
                      />
                    </Link>

                    <div className="flex-1 sm:ml-6">
                      <Link
                        to={`/books/${book._id}`}
                        className="text-xl font-bold text-bookstore-dark hover:text-bookstore-brown mb-2 block"
                      >
                        {book.title}
                      </Link>
                      <p className="text-bookstore-brown mb-4">by {book.author}</p>
                      <div className="text-2xl font-bold text-bookstore-dark mb-4">
                        ₹{book.price}
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              handleQuantityChange(book._id, item.quantity - 1)
                            }
                            className="w-8 h-8 border border-bookstore-brown rounded-lg hover:bg-bookstore-beige"
                          >
                            -
                          </button>
                          <span className="w-12 text-center font-semibold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              handleQuantityChange(book._id, item.quantity + 1)
                            }
                            className="w-8 h-8 border border-bookstore-brown rounded-lg hover:bg-bookstore-beige"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(book._id)}
                          className="text-red-600 hover:text-red-800 ml-4"
                        >
                          Remove
                        </button>
                      </div>

                      <div className="mt-4 text-lg font-semibold text-bookstore-dark">
                        Subtotal: ₹{book.price * item.quantity}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Cart Summary */}
          <div className="lg:w-80">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-2xl font-bold text-bookstore-dark mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-bookstore-dark">
                  <span>Items ({itemCount})</span>
                  <span>{itemCount}</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-bookstore-dark border-t border-bookstore-beige pt-4">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full px-6 py-3 bg-bookstore-brown text-white rounded-lg hover:bg-bookstore-dark transition font-semibold mb-4"
              >
                Proceed to Checkout
              </button>

              <Link
                to="/books"
                className="block text-center text-bookstore-brown hover:text-bookstore-dark"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;



