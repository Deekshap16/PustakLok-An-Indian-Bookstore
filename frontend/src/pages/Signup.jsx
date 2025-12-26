import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
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

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    const result = await register(
      formData.name,
      formData.email,
      formData.password
    );

    if (result.success) {
      navigate('/');
    } else {
      setError(result.message);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bookstore-beige py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-bookstore-dark mb-6 text-center">
          Sign Up
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-800 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-bookstore-dark mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-bookstore-brown rounded-lg focus:outline-none focus:ring-2 focus:ring-bookstore-brown"
            />
          </div>

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

          <div className="mb-4">
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

          <div className="mb-6">
            <label className="block text-sm font-semibold text-bookstore-dark mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
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
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-6 space-y-3">
          <p className="text-center text-bookstore-dark">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-bookstore-brown hover:text-bookstore-dark font-semibold"
            >
              Login
            </Link>
          </p>
          <div className="border-t border-bookstore-brown pt-4">
            <p className="text-center text-sm text-bookstore-dark mb-2">
              Admin Access
            </p>
            <Link
              to="/login"
              className="block w-full text-center px-4 py-2 text-sm bg-bookstore-beige text-bookstore-dark rounded-lg hover:bg-bookstore-brown hover:text-white transition"
            >
              Go to Admin Panel Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;



