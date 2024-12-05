const express = require('express');
const multer = require('multer');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs').promises;
const OpenAI = require('openai');
const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');
require('dotenv').config();

const app = express();
let openai;

// Initialize Secret Manager client
const secretManager = new SecretManagerServiceClient();

// Function to get secret from Secret Manager
async function getSecret(secretName) {
  try {
    const projectId = process.env.GOOGLE_CLOUD_PROJECT_ID || 'civil-forge-403609';
    const name = `projects/${projectId}/secrets/${secretName}/versions/latest`;
    
    const [version] = await secretManager.accessSecretVersion({ name });
    return version.payload.data.toString('utf8');
  } catch (error) {
    console.error(`Error retrieving secret ${secretName}:`, error);
    throw error;
  }
}

// Initialize OpenAI with API key from Secret Manager
async function initializeOpenAI() {
  try {
    const apiKey = await getSecret('OPENAI_API_KEY');
    openai = new OpenAI({ apiKey });
    console.log('OpenAI client initialized successfully');
  } catch (error) {
    console.error('Failed to initialize OpenAI client:', error);
    throw error;
  }
}

// CORS configuration
const allowedOrigins = [
  'http://localhost:5173',
  'https://appraisily-screener.netlify.app',
  'https://screener.appraisily.com',
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
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  maxAge: 86400
}));

app.use(express.json());

// Configure multer for file uploads
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

    const sessionId = uuidv4();
    
    // Store the image temporarily
    const uploadDir = path.join(__dirname, 'uploads');
    await fs.mkdir(uploadDir, { recursive: true });
    
    const fileExtension = path.extname(req.file.originalname);
    const filename = `${sessionId}${fileExtension}`;
    const filepath = path.join(uploadDir, filename);
    
    await fs.writeFile(filepath, req.file.buffer);

    // Get the base URL from the request
    const protocol = req.headers['x-forwarded-proto'] || req.protocol;
    const baseUrl = `${protocol}://${req.get('host')}`;
    const imageUrl = `${baseUrl}/image/${sessionId}`;

    res.json({
      success: true,
      sessionId,
      customerImageUrl: imageUrl,
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

// Serve images endpoint
app.get('/image/:sessionId', async (req, res) => {
  try {
    const uploadDir = path.join(__dirname, 'uploads');
    const files = await fs.readdir(uploadDir);
    const imageFile = files.find(file => file.startsWith(req.params.sessionId));
    
    if (!imageFile) {
      return res.status(404).json({
        success: false,
        message: 'Image not found'
      });
    }

    res.sendFile(path.join(uploadDir, imageFile));
  } catch (error) {
    console.error('Error serving image:', error);
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

// Start server
async function startServer() {
  try {
    await initializeOpenAI();
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log('Allowed origins:', allowedOrigins);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();