import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Book title is required'],
    trim: true
  },
  author: {
    type: String,
    required: [true, 'Author name is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Book description is required']
  },
  genre: {
    type: String,
    required: [true, 'Genre is required'],
    enum: ['Mythical', 'Fiction', 'Non-Fiction', 'Biography', 'History', 'Romance', 'Thriller', 'Self-Help']
  },
  // Keep category as alias for backward compatibility
  category: {
    type: String,
    enum: ['Mythical', 'Fiction', 'Non-Fiction', 'Biography', 'History', 'Romance', 'Thriller', 'Self-Help']
  },
  language: {
    type: String,
    required: [true, 'Language is required'],
    default: 'English'
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  minPrice: {
    type: Number,
    default: 0,
    min: [0, 'Minimum price cannot be negative']
  },
  maxPrice: {
    type: Number,
    default: 0,
    min: [0, 'Maximum price cannot be negative']
  },
  stock: {
    type: Number,
    required: [true, 'Stock quantity is required'],
    min: [0, 'Stock cannot be negative'],
    default: 0
  },
  imageUrl: {
    type: String,
    required: [true, 'Image URL is required']
  },
  // Legacy field for backward compatibility
  image: {
    type: String
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  reviews: {
    type: Number,
    default: 0
  },
  isbn: {
    type: String,
    unique: true,
    sparse: true
  }
}, {
  timestamps: true
});

// Sync category with genre and image with imageUrl
bookSchema.pre('save', function(next) {
  // Sync category with genre
  if (this.genre && !this.category) {
    this.category = this.genre;
  }
  // Sync image with imageUrl
  if (this.imageUrl && !this.image) {
    this.image = this.imageUrl;
  }
  if (this.image && !this.imageUrl) {
    this.imageUrl = this.image;
  }
  // Validate that minPrice <= price <= maxPrice
  if (this.minPrice && this.maxPrice && this.minPrice > this.maxPrice) {
    return next(new Error('Minimum price cannot be greater than maximum price'));
  }
  if (this.minPrice && this.price < this.minPrice) {
    return next(new Error('Price cannot be less than minimum price'));
  }
  if (this.maxPrice && this.price > this.maxPrice) {
    return next(new Error('Price cannot be greater than maximum price'));
  }
  next();
});

// Index for search
bookSchema.index({ title: 'text', author: 'text', description: 'text' });

export default mongoose.model('Book', bookSchema);