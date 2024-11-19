const express = require('express');
const multer = require('multer');
const cors = require('cors');
const { Storage } = require('@google-cloud/storage');
const vision = require('@google-cloud/vision');
const fetch = require('node-fetch');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Environment variables
const {
  PORT = 8080,
  GOOGLE_CLOUD_PROJECT_ID,
  GCS_BUCKET_NAME,
  OPENAI_API_KEY,
  NODE_ENV = 'development',
  CORS_ORIGIN = 'http://localhost:5173'
} = process.env;

// Initialize multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  }
});

// Initialize Google Cloud Storage
const storage = new Storage({
  projectId: GOOGLE_CLOUD_PROJECT_ID,
});
const bucket = storage.bucket(GCS_BUCKET_NAME);

// Upload image endpoint
app.post('/upload-image', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    const file = bucket.file(`uploads/${uuidv4()}-${req.file.originalname}`);
    const imageBuffer = req.file.buffer;

    await file.save(imageBuffer, {
      metadata: {
        contentType: req.file.mimetype,
      },
    });

    const imageUrl = `https://storage.googleapis.com/${GCS_BUCKET_NAME}/${file.name}`;
    const sessionId = uuidv4();

    res.json({
      success: true,
      sessionId,
      customerImageUrl: imageUrl,
      similarImageUrls: [],
      message: 'Image uploaded successfully'
    });

  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Error uploading image',
      error: NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Classify item endpoint
app.post('/classify-item', async (req, res) => {
  try {
    const { imageUrl } = req.body;

    if (!imageUrl) {
      return res.status(400).json({
        success: false,
        message: 'Image URL is required'
      });
    }

    const messages = [
      {
        role: 'system',
        content: `You are an expert art and antiques classifier. Your task is to determine if an item is Art or Antique.
                 IMPORTANT: You must ONLY respond with either "Art" or "Antique".
                 
                 Classification guidelines:
                 - Art: Paintings, sculptures, prints, photographs, digital art, and other artistic creations
                 - Antique: Vintage furniture, collectibles, decorative items, historical artifacts, and items over 50 years old
                 
                 DO NOT provide any explanation or additional text. ONLY respond with "Art" or "Antique".`
      },
      {
        role: 'user',
        content: [
          { type: 'image_url', image_url: { url: imageUrl } },
          { type: 'text', text: 'Classify this item as either Art or Antique. Only respond with one word: "Art" or "Antique".' }
        ]
      }
    ];

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4-vision-preview',
        messages,
        max_tokens: 1,
        temperature: 0.1
      })
    });

    if (!response.ok) {
      throw new Error('Failed to classify image with GPT-4 Vision');
    }

    const data = await response.json();
    const classification = data.choices[0].message.content.trim();

    if (!['Art', 'Antique'].includes(classification)) {
      throw new Error('Invalid classification response');
    }

    res.json({
      success: true,
      classification
    });

  } catch (error) {
    console.error('Classification error:', error);
    res.status(500).json({
      success: false,
      message: 'Error classifying item',
      error: NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});