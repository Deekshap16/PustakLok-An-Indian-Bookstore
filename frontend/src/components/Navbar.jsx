import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { getCartItemCount } = useCart();
  const navigate = useNavigate();
  const cartItemCount = getCartItemCount();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-bookstore-beige border-b-2 border-bookstore-brown shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-bookstore-dark">
              📚 PustakLok
            </div>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <input
              type="text"
              placeholder="Search books by title or author..."
              className="w-full px-4 py-2 border border-bookstore-brown rounded-l-lg focus:outline-none focus:ring-2 focus:ring-bookstore-brown"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  const query = e.target.value;
                  if (query.trim()) {
                    navigate(`/books?search=${encodeURIComponent(query)}`);
                  }
                }
              }}
            />
            <button className="px-6 py-2 bg-bookstore-brown text-white rounded-r-lg hover:bg-bookstore-dark transition">
              Search
            </button>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* Categories Dropdown */}
            <div className="relative group hidden lg:block">
              <button className="px-4 py-2 text-bookstore-dark hover:text-bookstore-brown transition">
                Categories ▼
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-bookstore-brown rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition">
                <Link
                  to="/books?genre=Mythical"
                  className="block px-4 py-2 hover:bg-bookstore-beige"
                >
                  Mythical
                </Link>
                <Link
                  to="/books?genre=Fiction"
                  className="block px-4 py-2 hover:bg-bookstore-beige"
                >
                  Fiction
                </Link>
                <Link
                  to="/books?genre=Non-Fiction"
                  className="block px-4 py-2 hover:bg-bookstore-beige"
                >
                  Non-Fiction
                </Link>
                <Link
                  to="/books?genre=Biography"
                  className="block px-4 py-2 hover:bg-bookstore-beige"
                >
                  Biography
                </Link>
                <Link
                  to="/books?genre=History"
                  className="block px-4 py-2 hover:bg-bookstore-beige"
                >
                  History
                </Link>
              </div>
            </div>

            {/* Cart Icon */}
            <Link
              to="/cart"
              className="relative px-3 py-2 text-bookstore-dark hover:text-bookstore-brown transition"
            >
              <span className="text-2xl">🛒</span>
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {/* Auth Buttons */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                {user?.role === 'admin' && (
                  <Link
                    to="/admin"
                    className="px-3 py-2 text-sm bg-bookstore-brown text-white rounded-lg hover:bg-bookstore-dark transition hidden md:inline-block"
                  >
                    Admin Panel
                  </Link>
                )}
                <span className="text-bookstore-dark hidden md:block">
                  {user?.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-bookstore-brown text-white rounded-lg hover:bg-bookstore-dark transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-bookstore-dark hover:text-bookstore-brown transition"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 bg-bookstore-brown text-white rounded-lg hover:bg-bookstore-dark transition"
                >
                  Signup
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden mt-4">
          <div className="flex">
            <input
              type="text"
              placeholder="Search books..."
              className="flex-1 px-4 py-2 border border-bookstore-brown rounded-l-lg focus:outline-none focus:ring-2 focus:ring-bookstore-brown"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  const query = e.target.value;
                  if (query.trim()) {
                    navigate(`/books?search=${encodeURIComponent(query)}`);
                  }
                }
              }}
            />
            <button className="px-4 py-2 bg-bookstore-brown text-white rounded-r-lg">
              🔍
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;



