import Book from '../models/Book.js';

const validateBookPayload = (payload) => {
  const errors = [];
  const requiredFields = ['title', 'author', 'description', 'genre', 'price', 'imageUrl'];

  requiredFields.forEach((field) => {
    if (
      payload[field] === undefined ||
      payload[field] === null ||
      payload[field] === ''
    ) {
      errors.push(`${field} is required`);
    }
  });

  const numericFields = ['price', 'stock', 'minPrice', 'maxPrice'];
  numericFields.forEach((field) => {
    if (payload[field] != null && Number(payload[field]) < 0) {
      errors.push(`${field} cannot be negative`);
    }
  });

  if (
    payload.minPrice != null &&
    payload.maxPrice != null &&
    Number(payload.minPrice) > Number(payload.maxPrice)
  ) {
    errors.push('Minimum price cannot exceed maximum price');
  }

  return errors;
};

// @desc    Admin: Get all books
// @route   GET /api/admin/books
// @access  Private/Admin
export const adminGetBooks = async (req, res) => {
  try {
    const books = await Book.find({}).sort({ createdAt: -1 });
    res.json({
      count: books.length,
      books
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Admin: Create a new book
// @route   POST /api/admin/books
// @access  Private/Admin
export const adminCreateBook = async (req, res) => {
  try {
    const {
      title,
      author,
      description,
      genre,
      language,
      price,
      minPrice,
      maxPrice,
      stock,
      imageUrl
    } = req.body;

    const errors = validateBookPayload({
      title,
      author,
      description,
      genre,
      price,
      minPrice,
      maxPrice,
      stock,
      imageUrl
    });

    if (errors.length > 0) {
      return res.status(400).json({ message: errors.join(', ') });
    }

    const book = await Book.create({
      title,
      author,
      description,
      genre,
      category: genre, // sync category with genre
      language: language || 'English',
      price: Number(price),
      minPrice: minPrice != null ? Number(minPrice) : undefined,
      maxPrice: maxPrice != null ? Number(maxPrice) : undefined,
      stock: stock != null ? Number(stock) : 0,
      imageUrl,
      image: imageUrl, // ensure legacy field is populated
      createdBy: req.user?._id || null,
      rating: 4.0
    });

    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};





