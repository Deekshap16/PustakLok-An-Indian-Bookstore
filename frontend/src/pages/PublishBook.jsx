import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { booksAPI } from '../services/api';
import BookImage from '../components/BookImage';

const initialFormState = {
  title: '',
  author: '',
  description: '',
  price: '',
  genre: 'Fiction',
  language: 'English',
  imageUrl: '',
  stock: 50
};

const PublishBook = () => {
  const [formData, setFormData] = useState(initialFormState);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState('');
  const [imageError, setImageError] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'price' || name === 'stock' ? Number(value) : value
    }));

    // Update image preview when imageUrl changes
    if (name === 'imageUrl') {
      setImagePreview(value);
      setImageError(false);
    }
  };

  const validateImageUrl = (url) => {
    if (!url || url.trim() === '') {
      return 'Image URL is required';
    }
    // Check if it's a valid URL or relative path
    if (url.startsWith('http://') || url.startsWith('https://')) {
      // Valid HTTPS/HTTP URL
      return null;
    } else if (url.startsWith('/images/')) {
      // Valid relative path
      return null;
    } else {
      return 'Please enter a valid image URL (https://...) or relative path (/images/books/...)';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validate required fields
    if (!formData.title || !formData.author || !formData.description) {
      setError('Please fill in all required fields');
      return;
    }

    if (formData.price <= 0) {
      setError('Price must be greater than 0');
      return;
    }

    if (formData.stock < 0) {
      setError('Stock cannot be negative');
      return;
    }

    // Validate image URL
    const imageError = validateImageUrl(formData.imageUrl);
    if (imageError) {
      setError(imageError);
      return;
    }

    setLoading(true);

    try {
      await booksAPI.create({
        ...formData,
        image: formData.imageUrl, // Send as both image and imageUrl for compatibility
        imageUrl: formData.imageUrl
      });
      setSuccess('Your book has been published on PustakLok!');
      setFormData(initialFormState);
      setImagePreview('');

      setTimeout(() => {
        navigate('/books');
      }, 1500);
    } catch (err) {
      setError(
        err.response?.data?.message || 'Failed to publish book. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bookstore-beige py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-bookstore-dark mb-6 text-center">
            Publish Your Book
          </h2>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-800 rounded-lg">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 bg-green-100 text-green-800 rounded-lg">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-bookstore-dark mb-2">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-bookstore-brown rounded-lg focus:outline-none focus:ring-2 focus:ring-bookstore-brown"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-bookstore-dark mb-2">
                  Author <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-bookstore-brown rounded-lg focus:outline-none focus:ring-2 focus:ring-bookstore-brown"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-bookstore-dark mb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-2 border border-bookstore-brown rounded-lg focus:outline-none focus:ring-2 focus:ring-bookstore-brown"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-bookstore-dark mb-2">
                  Price (₹) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="price"
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-bookstore-brown rounded-lg focus:outline-none focus:ring-2 focus:ring-bookstore-brown"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-bookstore-dark mb-2">
                  Stock <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="stock"
                  min="0"
                  value={formData.stock}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-bookstore-brown rounded-lg focus:outline-none focus:ring-2 focus:ring-bookstore-brown"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-bookstore-dark mb-2">
                  Genre <span className="text-red-500">*</span>
                </label>
                <select
                  name="genre"
                  value={formData.genre}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-bookstore-brown rounded-lg focus:outline-none focus:ring-2 focus:ring-bookstore-brown"
                >
                  <option value="Mythical">Mythical</option>
                  <option value="Fiction">Fiction</option>
                  <option value="Non-Fiction">Non-Fiction</option>
                  <option value="Romance">Romance</option>
                  <option value="Thriller">Thriller</option>
                  <option value="Biography">Biography</option>
                  <option value="History">History</option>
                  <option value="Self-Help">Self-Help</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-bookstore-dark mb-2">
                Language <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="language"
                value={formData.language}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-bookstore-brown rounded-lg focus:outline-none focus:ring-2 focus:ring-bookstore-brown"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-bookstore-dark mb-2">
                Cover Image (URL or Local Path) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                required
                placeholder="e.g. /images/books/book-name.jpg or https://example.com/image.jpg"
                className="w-full px-4 py-2 border border-bookstore-brown rounded-lg focus:outline-none focus:ring-2 focus:ring-bookstore-brown"
              />
              <p className="text-xs text-bookstore-brown mt-1">
                Supports HTTPS image URLs or local images stored in /public/images/books
              </p>
              
              {/* Image Preview */}
              {imagePreview && (
                <div className="mt-4">
                  <p className="text-sm font-semibold text-bookstore-dark mb-2">Preview:</p>
                  <div className="w-48 h-64 border border-bookstore-brown rounded-lg overflow-hidden bg-bookstore-beige">
                    <BookImage
                      src={imagePreview}
                      alt="Preview"
                      title={formData.title || 'Book Cover'}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 px-4 py-3 bg-bookstore-brown text-white rounded-lg hover:bg-bookstore-dark transition font-semibold disabled:opacity-50"
            >
              {loading ? 'Publishing...' : 'Publish Book'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PublishBook;
