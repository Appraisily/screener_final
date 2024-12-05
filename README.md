# AI Art Screener

Interactive art analysis tool that provides instant AI-powered insights for artwork and antiques.

## Backend API Documentation

The backend service provides several endpoints for image analysis and artwork classification.

### Base URL

```
Production: https://appraisals-web-services-backend-856401495068.us-central1.run.app
Development: http://localhost:8080
```

### Endpoints

#### 1. Upload Image
```http
POST /upload-image
Content-Type: multipart/form-data

Request:
- image: File (required)

Response:
{
  "success": boolean,
  "message": string,
  "sessionId": string,
  "customerImageUrl": string,
  "similarImageUrls": string[],
  "labels": string[]
}
```

#### 2. Classify Item
```http
POST /classify-item
Content-Type: application/json

Request:
{
  "imageUrl": string
}

Response:
{
  "success": boolean,
  "classification": "Art" | "Antique"
}
```

#### 3. Generate Analysis
```http
POST /generate-analysis
Content-Type: application/json

Request:
{
  "sessionId": string
}

Response:
{
  "success": boolean,
  "message": string,
  "analysis": string
}
```

#### 4. Enhance Analysis
```http
POST /enhance-analysis
Content-Type: application/json

Request:
{
  "sessionId": string,
  "analysisText": string
}

Response:
{
  "success": boolean,
  "message": string,
  "enhancedAnalysis": string,
  "offerText": string
}
```

### Analysis Flow

1. **Image Upload**
   - User uploads an image
   - Backend stores image in Google Cloud Storage
   - Returns session ID and similar images

2. **Item Classification**
   - Uses GPT-4 Vision to classify item as Art or Antique
   - Determines which analysis path to follow

3. **Analysis Generation**
   - Processes image with Google Vision AI
   - Generates initial analysis using GPT-4
   - Returns detailed artwork/antique analysis

4. **Analysis Enhancement**
   - Takes initial analysis
   - Enhances with additional details
   - Generates offer text for appraisal services

### Error Handling

All endpoints follow this error response structure:
```json
{
  "success": false,
  "message": string,
  "error": string (only in development)
}
```

## Style Guide

[Previous style guide content remains the same...]