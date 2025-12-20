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
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  genre: {
    type: String,
    required: [true, 'Genre is required'],
    enum: ['Mythical', 'Fiction', 'Non-Fiction', 'Romance', 'Thriller', 'Biography', 'History', 'Self-Help']
  },
  language: {
    type: String,
    required: [true, 'Language is required'],
    default: 'English'
  },
  image: {
    type: String,
    required: [true, 'Image URL is required']
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
    default: 4.0
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
    default: 50
  }
}, {
  timestamps: true
});

export default mongoose.model('Book', bookSchema);



