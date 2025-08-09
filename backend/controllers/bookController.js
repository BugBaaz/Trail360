const Book = require('../models/book'); // ✅ lowercase
const path = require('path');

// Upload book
exports.uploadBook = async (req, res) => {
  try {
    const { title, author, description } = req.body;
    const coverImage = req.files.coverImage ? `/uploads/images/${req.files.coverImage[0].filename}` : null;
    const fileUrl = req.files.file ? `/uploads/books/${req.files.file[0].filename}` : null;

    const newBook = new Book({ title, author, description, coverImage, fileUrl });
    await newBook.save();

    res.status(201).json({ message: 'Book uploaded successfully', book: newBook });
  } catch (err) {
    res.status(500).json({ error: 'Failed to upload book' });
  }
};

// Get all books
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ uploadedAt: -1 });
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch books' });
  }
};
