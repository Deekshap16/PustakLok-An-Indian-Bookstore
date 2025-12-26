import Book from '../models/Book.js';

const baseBookValidation = (payload) => {
  const errors = [];
  const requiredFields = ['title', 'author', 'description', 'genre', 'price'];

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

// @desc    Get all books with search, filter, and sort
// @route   GET /api/books
// @access  Public
export const getBooks = async (req, res) => {
  try {
    const { search, genre, minPrice, maxPrice, language, sortBy } = req.query;

    // Build query object
    const query = {};
    const andConditions = [];

    // Search by title or author
    if (search) {
      andConditions.push({
        $or: [
          { title: { $regex: search, $options: 'i' } },
          { author: { $regex: search, $options: 'i' } }
        ]
      });
    }

    // Filter by genre (check both genre and category for backward compatibility)
    if (genre) {
      andConditions.push({
        $or: [
          { genre: genre },
          { category: genre }
        ]
      });
    }

    // Filter by price range
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // Filter by language
    if (language) {
      query.language = language;
    }

    // Combine all conditions
    if (andConditions.length > 0) {
      query.$and = andConditions;
    }

    // Build sort object
    let sort = {};
    if (sortBy === 'price-asc') {
      sort = { price: 1 };
    } else if (sortBy === 'price-desc') {
      sort = { price: -1 };
    } else {
      sort = { createdAt: -1 }; // Default: newest first
    }

    // Execute query
    const books = await Book.find(query).sort(sort);

    res.json({
      count: books.length,
      books
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get single book by ID
// @route   GET /api/books/:id
// @access  Public
export const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.json(book);
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Delete a book (admin only)
// @route   DELETE /api/books/:id
// @access  Private/Admin
export const deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    await book.deleteOne();
    res.json({ message: 'Book removed' });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Create a new book (publish)
// @route   POST /api/books
// @access  Private (any authenticated user)
export const createBook = async (req, res) => {
  try {
    const {
      title,
      author,
      description,
      price,
      genre,
      category,
      language,
      image,
      imageUrl,
      stock,
      minPrice,
      maxPrice
    } = req.body;

    const finalGenre = genre || category;
    const errors = baseBookValidation({
      title,
      author,
      description,
      genre: finalGenre,
      price,
      stock,
      minPrice,
      maxPrice
    });

    if (!image && !imageUrl) {
      errors.push('image or imageUrl is required');
    }

    if (errors.length > 0) {
      return res.status(400).json({
        message: errors.join(', ')
      });
    }

    const img = image || imageUrl;

    const book = await Book.create({
      title,
      author,
      description,
      price: Number(price),
      genre: genre || category,
      category: genre || category,
      language: language || 'English',
      image: img,
      imageUrl: imageUrl || image || img,
      stock: stock != null ? Number(stock) : 50,
      minPrice: minPrice != null ? Number(minPrice) : undefined,
      maxPrice: maxPrice != null ? Number(maxPrice) : undefined,
      createdBy: req.user?._id || null,
      rating: 4.0
    });

    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get books created by the logged-in user
// @route   GET /api/books/my
// @access  Private
export const getMyBooks = async (req, res) => {
  try {
    const books = await Book.find({ createdBy: req.user._id }).sort({
      createdAt: -1
    });

    res.json({
      count: books.length,
      books
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};