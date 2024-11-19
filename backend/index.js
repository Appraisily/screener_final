const express = require('express');
const multer = require('multer');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs').promises;
require('dotenv').config();

const app = express();

// CORS configuration with multiple origins
const allowedOrigins = [
  'http://localhost:5173',
  'https://appraisily-screener.netlify.app',
  'https://screener.appraisily.com',
  // StackBlitz preview domains
  /^https:\/\/[a-z0-9-]+-[a-z0-9]+-[a-z0-9]+\.preview\.app\.github\.dev$/,
  /^https:\/\/[a-z0-9-]+-[a-z0-9]+-[a-z0-9]+\.stackblitz\.io$/,
  /^https:\/\/[a-z0-9-]+--\d+\.local-credentialless\.webcontainer\.io$/
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);
    
    const isAllowed = allowedOrigins.some(allowed => {
      if (allowed instanceof RegExp) {
        return allowed.test(origin);
      }
      return allowed === origin;
    });

    if (isAllowed) {
      callback(null, true);
    } else {
      console.log('Blocked origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  maxAge: 86400
}));

app.use(express.json());

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
fs.mkdir(uploadsDir, { recursive: true }).catch(console.error);

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const sessionId = uuidv4();
    const ext = path.extname(file.originalname);
    cb(null, `${sessionId}${ext}`);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only image files are allowed'));
    }
    cb(null, true);
  }
});

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Upload image endpoint
app.post('/upload-image', upload.single('image'), async (req, res) => {
  console.log('Received upload request from origin:', req.headers.origin);
  
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    console.log('File received:', {
      filename: req.file.originalname,
      size: req.file.size,
      mimetype: req.file.mimetype
    });

    const sessionId = path.parse(req.file.filename).name; // Extract sessionId from filename
    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    
    res.json({
      success: true,
      sessionId,
      customerImageUrl: imageUrl,
      similarImageUrls: [
        'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=500&h=500&fit=crop',
        'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=500&h=500&fit=crop',
        'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=500&h=500&fit=crop'
      ],
      itemType: 'Art',
      message: 'Image uploaded successfully'
    });

  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Error uploading image',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Get image by session ID
app.get('/image/:sessionId', async (req, res) => {
  try {
    const files = await fs.readdir(uploadsDir);
    const file = files.find(f => f.startsWith(req.params.sessionId));
    
    if (!file) {
      return res.status(404).json({
        success: false,
        message: 'Image not found'
      });
    }

    res.sendFile(path.join(uploadsDir, file));
  } catch (error) {
    console.error('Error retrieving image:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving image',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Global error handler:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Allowed origins:', allowedOrigins);
});