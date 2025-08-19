const express = require('express');
const upload = require('../middlewares/uploadMiddleware'); // ✅ multer config import
const router = express.Router();

// 📌 File Upload Route
router.post('/upload', upload.single('file'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        res.status(200).json({
            message: 'File uploaded successfully!',
            file: {
                filename: req.file.filename,
                path: `/uploads/${req.file.filename}`,
                mimetype: req.file.mimetype,
                size: req.file.size
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
});

module.exports = router;
