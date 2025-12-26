import { useEffect, useMemo, useState } from 'react';
import { adminAPI } from '../services/api';

const initialForm = {
  title: '',
  author: '',
  description: '',
  genre: 'Mythical',
  language: 'English',
  price: '',
  minPrice: '',
  maxPrice: '',
  stock: '',
  imageUrl: ''
};

const AdminPanel = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [deletingId, setDeletingId] = useState(null);

  const imagePreview = useMemo(() => {
    if (!form.imageUrl) return '';
    // basic check to avoid obvious typos; allow relative / absolute URLs
    if (
      form.imageUrl.startsWith('http') ||
      form.imageUrl.startsWith('/images/')
    ) {
      return form.imageUrl;
    }
    return '';
  }, [form.imageUrl]);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const response = await adminAPI.getBooks();
      setBooks(response.data.books || []);
    } catch (err) {
      console.error('Error loading books for admin panel:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: ['price', 'minPrice', 'maxPrice', 'stock'].includes(name)
        ? value
        : value
    }));
  };

  const validateForm = () => {
    const errs = [];
    const required = ['title', 'author', 'description', 'genre', 'price', 'imageUrl'];
    required.forEach((field) => {
      if (!form[field]) errs.push(`${field} is required`);
    });

    const numeric = ['price', 'minPrice', 'maxPrice', 'stock'];
    numeric.forEach((field) => {
      if (form[field] !== '' && Number(form[field]) < 0) {
        errs.push(`${field} cannot be negative`);
      }
    });

    if (
      form.minPrice !== '' &&
      form.maxPrice !== '' &&
      Number(form.minPrice) > Number(form.maxPrice)
    ) {
      errs.push('Minimum price cannot exceed maximum price');
    }

    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const errs = validateForm();
    if (errs.length) {
      setError(errs.join(', '));
      return;
    }

    setSubmitting(true);
    try {
      await adminAPI.addBook({
        ...form,
        price: Number(form.price),
        minPrice: form.minPrice === '' ? undefined : Number(form.minPrice),
        maxPrice: form.maxPrice === '' ? undefined : Number(form.maxPrice),
        stock: form.stock === '' ? 0 : Number(form.stock)
      });
      setSuccess('Book added successfully');
      setForm(initialForm);
      fetchBooks();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add book');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (bookId, bookTitle) => {
    if (!window.confirm(`Are you sure you want to delete "${bookTitle}"? This action cannot be undone.`)) {
      return;
    }

    setDeletingId(bookId);
    setError('');
    setSuccess('');

    try {
      await adminAPI.deleteBook(bookId);
      setSuccess(`"${bookTitle}" has been deleted successfully.`);
      fetchBooks(); // Refresh the list
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete book');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-bookstore-beige">
      <div className="container mx-auto px-4 py-10">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-bookstore-dark">Admin Dashboard</h1>
          <p className="text-bookstore-brown mt-2">
            Add new books and manage the catalog. Only admins can access this page.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-semibold text-bookstore-dark mb-4">
                Add New Book
              </h2>

              {error && (
                <div className="mb-3 p-3 bg-red-100 text-red-800 rounded-lg text-sm">
                  {error}
                </div>
              )}
              {success && (
                <div className="mb-3 p-3 bg-green-100 text-green-800 rounded-lg text-sm">
                  {success}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-bookstore-dark mb-1">
                    Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-bookstore-brown rounded-lg focus:outline-none focus:ring-2 focus:ring-bookstore-brown"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-bookstore-dark mb-1">
                    Author *
                  </label>
                  <input
                    type="text"
                    name="author"
                    value={form.author}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-bookstore-brown rounded-lg focus:outline-none focus:ring-2 focus:ring-bookstore-brown"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-bookstore-dark mb-1">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    rows={3}
                    value={form.description}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-bookstore-brown rounded-lg focus:outline-none focus:ring-2 focus:ring-bookstore-brown"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-semibold text-bookstore-dark mb-1">
                      Genre *
                    </label>
                    <select
                      name="genre"
                      value={form.genre}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-bookstore-brown rounded-lg focus:outline-none focus:ring-2 focus:ring-bookstore-brown"
                    >
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
                  <div>
                    <label className="block text-sm font-semibold text-bookstore-dark mb-1">
                      Language
                    </label>
                    <input
                      type="text"
                      name="language"
                      value={form.language}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-bookstore-brown rounded-lg focus:outline-none focus:ring-2 focus:ring-bookstore-brown"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-semibold text-bookstore-dark mb-1">
                      Price (₹) *
                    </label>
                    <input
                      type="number"
                      name="price"
                      min="0"
                      value={form.price}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-bookstore-brown rounded-lg focus:outline-none focus:ring-2 focus:ring-bookstore-brown"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-bookstore-dark mb-1">
                      Stock
                    </label>
                    <input
                      type="number"
                      name="stock"
                      min="0"
                      value={form.stock}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-bookstore-brown rounded-lg focus:outline-none focus:ring-2 focus:ring-bookstore-brown"
                      placeholder="0"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-semibold text-bookstore-dark mb-1">
                      Min Price
                    </label>
                    <input
                      type="number"
                      name="minPrice"
                      min="0"
                      value={form.minPrice}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-bookstore-brown rounded-lg focus:outline-none focus:ring-2 focus:ring-bookstore-brown"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-bookstore-dark mb-1">
                      Max Price
                    </label>
                    <input
                      type="number"
                      name="maxPrice"
                      min="0"
                      value={form.maxPrice}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-bookstore-brown rounded-lg focus:outline-none focus:ring-2 focus:ring-bookstore-brown"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-bookstore-dark mb-1">
                    Image URL *
                  </label>
                  <input
                    type="text"
                    name="imageUrl"
                    value={form.imageUrl}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-bookstore-brown rounded-lg focus:outline-none focus:ring-2 focus:ring-bookstore-brown"
                    required
                    placeholder="https://... or /images/books/your-image.jpg"
                  />
                  <p className="text-xs text-bookstore-brown mt-1">
                    Must be a valid URL. A preview will appear below if it is reachable.
                  </p>
                </div>

                {imagePreview && (
                  <div className="border border-bookstore-brown/30 rounded-lg p-3 bg-bookstore-beige/40">
                    <p className="text-sm text-bookstore-dark mb-2">Preview</p>
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-md"
                      onError={(e) => (e.target.style.display = 'none')}
                    />
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full px-4 py-3 bg-bookstore-brown text-white rounded-lg hover:bg-bookstore-dark transition font-semibold disabled:opacity-50"
                >
                  {submitting ? 'Adding...' : 'Add Book'}
                </button>
              </form>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-semibold text-bookstore-dark">
                    Catalog
                  </h2>
                  <p className="text-sm text-bookstore-brown">
                    Showing {books.length} book{books.length !== 1 ? 's' : ''}
                  </p>
                </div>
                <button
                  onClick={fetchBooks}
                  className="px-4 py-2 text-sm bg-bookstore-brown text-white rounded-lg hover:bg-bookstore-dark transition"
                >
                  Refresh
                </button>
              </div>

              {loading ? (
                <div className="text-bookstore-brown">Loading books...</div>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {books.map((book) => (
                    <div
                      key={book._id}
                      className="border border-bookstore-brown/20 rounded-lg p-4 bg-bookstore-beige/30 relative"
                    >
                      <button
                        onClick={() => handleDelete(book._id, book.title)}
                        disabled={deletingId === book._id}
                        className="absolute top-2 right-2 text-red-600 hover:text-red-800 transition disabled:opacity-50"
                        title="Delete book"
                      >
                        {deletingId === book._id ? (
                          <span className="text-sm">Deleting...</span>
                        ) : (
                          <span className="text-xl">🗑️</span>
                        )}
                      </button>
                      <div className="flex items-start justify-between gap-3 mb-3 pr-8">
                        <div>
                          <h3 className="font-semibold text-bookstore-dark text-lg leading-tight">
                            {book.title}
                          </h3>
                          <p className="text-sm text-bookstore-brown">
                            by {book.author}
                          </p>
                        </div>
                        <span className="text-sm bg-white px-2 py-1 rounded-full border border-bookstore-brown/20 text-bookstore-dark">
                          ₹{book.price}
                        </span>
                      </div>
                      <p className="text-sm text-bookstore-brown line-clamp-2 mb-3">
                        {book.description}
                      </p>
                      <div className="flex items-center justify-between text-xs text-bookstore-dark">
                        <span>{book.genre}</span>
                        <span>{book.language}</span>
                        <span>{book.stock ?? 0} in stock</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;




