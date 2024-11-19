# AI Art Screener Backend API

Backend service for the AI Art Screener application that provides image analysis and artwork classification.

## API Endpoints

### Base URL

```
Production: https://appraisals-web-services-backend-856401495068.us-central1.run.app
Development: http://localhost:8080
```

### 1. Health Check
```http
GET /

Response:
{
  "status": "healthy",
  "timestamp": string
}
```

### 2. Upload Image
```http
POST /upload-image
Content-Type: multipart/form-data

Request:
- image: File (required, max size: 5MB, image files only)

Response:
{
  "success": boolean,
  "sessionId": string,
  "customerImageUrl": string,
  "message": string
}
```

### 3. Retrieve Image
```http
GET /image/:sessionId

Response:
- Success: Image file
- Error: 
{
  "success": false,
  "message": string,
  "error": string (only in development)
}
```

## Features

- **Image Upload**
  - Supports multiple image formats (JPEG, PNG, etc.)
  - File size limit: 5MB
  - Automatic file type validation
  - Secure file storage with UUID-based naming

- **CORS Support**
  - Configurable allowed origins
  - Support for development and production environments
  - Handles preflight requests
  - Credential support

- **OpenAI Integration**
  - Uses OpenAI API for image analysis
  - Secure API key storage in Google Cloud Secret Manager
  - Secret name: `OPENAI_API_KEY` (Important: This exact name must be used in Secret Manager)

## Environment Variables

```env
PORT=8080
NODE_ENV=development|production
CORS_ORIGIN=http://localhost:5173 (comma-separated list or regex)
```

## Google Cloud Secret Manager

The application expects the following secrets to be configured in Google Cloud Secret Manager:

- `OPENAI_API_KEY`: Your OpenAI API key (Required)

## Development

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm run dev
```

The server will start on port 8080 by default.