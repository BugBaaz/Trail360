// backend/server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

// ===== App setup =====
const app = express();
const PORT = process.env.PORT || 5000;

// ===== Ensure uploads folder exists (relative to backend) =====
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log('✅ Created uploads folder at', uploadsDir);
}

// ===== Middleware =====
app.use(cors());
app.use(express.json()); // parse JSON bodies
app.use('/uploads', express.static(uploadsDir)); // serve uploaded files

// ===== Routes - adjust paths if your file names differ =====
/*
  Expected:
  - backend/routes/authRoutes.js   (module.exports = router)
  - backend/routes/bookRoutes.js   (module.exports = router)
*/
try {
  const authRoutes = require('./routes/authRoutes');
  app.use('/api/auth', authRoutes);
} catch (err) {
  console.warn('⚠️  Could not load authRoutes:', err.message);
}

try {
  const bookRoutes = require('./routes/bookRoutes');
  app.use('/api/books', bookRoutes);
} catch (err) {
  console.warn('⚠️  Could not load bookRoutes:', err.message);
}

// ===== Simple test route =====
app.get('/', (req, res) => {
  res.send('Server is up. Use /api/books/upload to test uploads (if route exists).');
});

// ===== MongoDB connect & server start =====
const startServer = () => {
  app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
  });
};

if (process.env.MONGO_URI) {
  mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log('✅ Connected to MongoDB Atlas');
      startServer();
    })
    .catch((err) => {
      console.error('❌ MongoDB connection failed:', err.message);
      console.warn('➡️  Starting server anyway (you can still test uploads locally).');
      startServer();
    });
} else {
  console.warn('⚠️  MONGO_URI not set in .env — starting server without DB connection');
  startServer();
}
