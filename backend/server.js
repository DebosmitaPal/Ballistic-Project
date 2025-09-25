require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user');
const Image = require('./models/image');
const cors = require('cors');

const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const crypto = require('crypto');
const path = require('path');

const app = express();

// Middleware
app.use(express.json());
const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:5173';

app.use(cors({
  origin: BACKEND_URL,
  credentials: true
}));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('MongoDB connection error:', err.message);
});

// GridFS setup
let gfs;
const conn = mongoose.connection;

conn.once('open', () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});

// Multer storage for GridFS
const storage = new GridFsStorage({
  url: process.env.MONGODB_URI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) return reject(err);
        const filename = buf.toString('hex') + path.extname(file.originalname);
        resolve({
          filename: filename,
          bucketName: 'uploads'
        });
      });
    });
  }
});

const upload = multer({ storage });

// Signup endpoint
app.post('/api/signup', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: 'Email already exists' });
    const user = new User({ name, email, password });
    await user.save();
    res.status(201).json({ message: 'User created', user: { name, email } });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, password });
    if (user) {
      res.json({ message: 'Login successful', user: { name: user.name, email: user.email, id: user._id } });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Upload image endpoint (stores image file in GridFS)
app.post('/api/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(500).json({ error: 'File upload failed. Please try again.' });
    }
    const { userId, details, contentHash } = req.body; // Added contentHash field
    const originalName = req.file.originalname;
    const size = Number(req.file.size || (req.file.metadata && req.file.metadata.size) || req.file.length || 0);
    const type = req.file.contentType || req.file.mimetype || 'image/jpeg';

    // Log for debugging
    console.log('Checking existing image:', { userId, originalName, size, contentHash });

    // Check for existing image for this user, also by contentHash if provided
    let query = { user: userId };

    if (contentHash) {
      query.contentHash = contentHash;
    } else {
      query.originalName = originalName;
      query.size = size;
    }

    const existing = await Image.findOne(query);

    // Log found image
    console.log('Existing image found:', existing);

    if (existing) {
      // Return existing image info without uploading
      return res.status(200).json({ message: 'Image matched', image: existing, matched: true });
    }

    // Save new image document
    const imageDoc = new Image({
      user: userId,
      name: req.file.filename,       // GridFS filename
      originalName: originalName,    // original filename
      size,
      type,
      preview: req.file.filename,    // preview stores filename for serving image
      contentHash: contentHash,      // store content hash if provided
      details: JSON.parse(details),
    });
    await imageDoc.save();
    res.status(201).json({ message: 'Image uploaded', image: imageDoc, matched: false });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get user's images metadata
app.get('/api/images', async (req, res) => {
  const { userId } = req.query;
  try {
    const images = await Image.find({ user: userId });
    res.json({ images });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Serve image file from GridFS by filename
app.get('/api/image/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    if (!file || file.length === 0) return res.status(404).json({ err: 'No file exists' });

    if ((file.contentType && file.contentType.startsWith('image/')) || (file.mimetype && file.mimetype.startsWith('image/'))) {
      const readStream = gfs.createReadStream(file.filename);
      res.set('Content-Type', file.contentType || file.mimetype || 'image/jpeg');
      readStream.pipe(res);
    } else {
      res.status(400).json({ err: 'Not an image' });
    }
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

// Export app for Vercel if needed
module.exports = app;
