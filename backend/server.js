const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes'); // 📌 Book routes import

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Static file serving (so frontend can access uploaded PDFs)
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes); // 📌 Book routes register

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log(`✅ Server running on http://localhost:${process.env.PORT}`)
    );
  })
  .catch(err => console.log(err));
