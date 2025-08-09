const express = require('express');
const router = express.Router();
const { uploadBook, getAllBooks } = require('../controllers/bookController');
const upload = require('../middlewares/uploadMiddleware');

// ✅ Lowercase file import for model (if used here directly)
const Book = require('../models/book');

// Upload a new book
router.post('/upload', upload.fields([
  { name: 'coverImage', maxCount: 1 },
  { name: 'file', maxCount: 1 }
]), uploadBook);

// Get all books
router.get('/', getAllBooks);

module.exports = router;
