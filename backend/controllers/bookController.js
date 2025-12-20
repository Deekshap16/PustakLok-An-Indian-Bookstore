import Book from '../models/Book.js';

// @desc    Get all books with search, filter, and sort
// @route   GET /api/books
// @access  Public
export const getBooks = async (req, res) => {
  try {
    const { search, genre, minPrice, maxPrice, language, sortBy } = req.query;

    // Build query object
    const query = {};

    // Search by title or author
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { author: { $regex: search, $options: 'i' } }
      ];
    }

    // Filter by genre
    if (genre) {
      query.genre = genre;
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



