

// const express = require('express');
// const multer = require('multer');
// const path = require('path');

// const router = express.Router();

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename: function (req, file, cb) {
//     const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, uniqueName + path.extname(file.originalname));
//   }
// });

// const upload = multer({ storage });

// // POST /api/upload
// router.post('/', upload.single('file'), (req, res) => {
//   if (!req.file) {
//     return res.status(400).json({ error: 'No file uploaded' });
//   }

//   res.json({
//     url: `/uploads/${req.file.filename}`,
//     type: req.file.mimetype,
//     originalName: req.file.originalname
//   });
// });

// module.exports = router;


const express = require('express');
const multer = require('multer');
const path = require('path');

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueName + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// POST /api/upload
router.post('/', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  // Use full backend URL (adjust if your backend URL changes)
  const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

  res.json({
    url: fileUrl,
    type: req.file.mimetype,
    originalName: req.file.originalname
  });
});

module.exports = router;
