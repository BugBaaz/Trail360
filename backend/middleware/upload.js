const multer = require('multer');
const path = require('path');

// Storage config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Folder where files will be saved
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// File filter (only pdf, epub, etc.)
const fileFilter = (req, file, cb) => {
    const allowedTypes = /pdf|epub|mobi/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    if (extname) {
        cb(null, true);
    } else {
        cb(new Error('Only PDF, EPUB, or MOBI files are allowed!'));
    }
};

module.exports = multer({ storage, fileFilter });
