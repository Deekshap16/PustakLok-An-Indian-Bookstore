import express from 'express';
import { adminCreateBook, adminGetBooks } from '../controllers/adminController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

router.get('/books', protect, admin, adminGetBooks);
router.post('/books', protect, admin, adminCreateBook);

export default router;





