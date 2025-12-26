import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [loginType, setLoginType] = useState('user'); // 'user' or 'admin'
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Send loginType to backend for role validation
      const result = await login(formData.email, formData.password, loginType);

      if (result.success) {
        // Backend has already validated the role
        // Redirect based on login type
        if (loginType === 'admin') {
          console.log('✅ Admin login successful, redirecting to /publish');
          navigate('/publish');
        } else {
          console.log('✅ User login successful, redirecting to /');
          navigate('/');
        }
      } else {
        // Backend returned an error (including admin role validation)
        setError(result.message || 'Login failed');
        console.error('❌ Login failed:', result.message);
      }
    } catch (error) {
      console.error('❌ Login error:', error);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bookstore-beige py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-bookstore-dark mb-6 text-center">
          Login
        </h2>

        {/* Tabs for User/Admin Login */}
        <div className="flex mb-6 border-b border-bookstore-brown">
          <button
            type="button"
            onClick={() => {
              setLoginType('user');
              setError('');
            }}
            className={`flex-1 py-2 px-4 text-center font-semibold transition ${
              loginType === 'user'
                ? 'text-bookstore-brown border-b-2 border-bookstore-brown'
                : 'text-bookstore-dark hover:text-bookstore-brown'
            }`}
          >
            User Login
          </button>
          <button
            type="button"
            onClick={() => {
              setLoginType('admin');
              setError('');
            }}
            className={`flex-1 py-2 px-4 text-center font-semibold transition ${
              loginType === 'admin'
                ? 'text-bookstore-brown border-b-2 border-bookstore-brown'
                : 'text-bookstore-dark hover:text-bookstore-brown'
            }`}
          >
            Admin Login
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-800 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-bookstore-dark mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-bookstore-brown rounded-lg focus:outline-none focus:ring-2 focus:ring-bookstore-brown"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-bookstore-dark mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-bookstore-brown rounded-lg focus:outline-none focus:ring-2 focus:ring-bookstore-brown"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-3 bg-bookstore-brown text-white rounded-lg hover:bg-bookstore-dark transition font-semibold disabled:opacity-50"
          >
            {loading ? 'Logging in...' : loginType === 'admin' ? 'Login as Admin' : 'Login'}
          </button>
        </form>

        <p className="mt-6 text-center text-bookstore-dark">
          Don't have an account?{' '}
          <Link
            to="/signup"
            className="text-bookstore-brown hover:text-bookstore-dark font-semibold"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
