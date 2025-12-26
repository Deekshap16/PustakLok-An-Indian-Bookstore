import express from 'express';
import {
  getBooks,
  getBookById,
  createBook,
  getMyBooks,
  deleteBook
} from '../controllers/bookController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getBooks);
router.get('/my', protect, getMyBooks);
router.get('/:id', getBookById);
router.post('/', protect, createBook);
router.delete('/:id', protect, admin, deleteBook);

export default router;



