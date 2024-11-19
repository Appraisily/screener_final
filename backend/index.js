const express = require('express');
const multer = require('multer');
const cors = require('cors');
const { Storage } = require('@google-cloud/storage');
const vision = require('@google-cloud/vision');
const fetch = require('node-fetch');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const app = express();

// CORS configuration
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://appraisily-screener.netlify.app', 'https://screener.appraisily.com']
    : 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());

// Initialize multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  }
});

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Upload image endpoint
app.post('/upload-image', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    // For now, just return the file info
    const sessionId = uuidv4();
    
    res.json({
      success: true,
      sessionId,
      customerImageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=500&h=500&fit=crop',
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

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});