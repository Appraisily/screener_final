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
  "similarImageUrls": string[],
  "itemType": "Art" | "Antique",
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

- **Static File Serving**
  - Serves uploaded images via `/uploads` directory
  - Direct image access via URL
  - Session-based image retrieval

- **Error Handling**
  - Comprehensive error messages
  - Development/production error detail toggling
  - File type validation
  - Size limit enforcement

## Storage

Images are stored in the `uploads` directory with the following structure:
```
uploads/
  ├── {sessionId}.jpg
  ├── {sessionId}.png
  └── ...
```

## Environment Variables

```env
PORT=8080
NODE_ENV=development|production
CORS_ORIGIN=http://localhost:5173 (comma-separated list or regex)
```

## Security Features

- File type validation
- Size limits
- CORS protection
- No direct file path exposure
- Sanitized file names
- Protected error messages in production

## Usage Example

```javascript
// Upload an image
const formData = new FormData();
formData.append('image', imageFile);

const response = await fetch('${API_URL}/upload-image', {
  method: 'POST',
  body: formData
});

const data = await response.json();
// Use data.customerImageUrl to display the uploaded image
```

## Error Responses

All error responses follow this structure:
```json
{
  "success": false,
  "message": "Human-readable error message",
  "error": "Detailed error info (development only)"
}
```

## CORS Configuration

The API supports multiple origin types:
- Exact matches (e.g., `https://screener.appraisily.com`)
- Pattern matching for development (e.g., StackBlitz previews)
- Local development (`http://localhost:5173`)

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