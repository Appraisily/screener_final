import { useState } from 'react';

const API_URL = 'https://appraisals-web-services-backend-856401495068.us-central1.run.app';

export function useImageAnalysis() {
  const [isUploading, setIsUploading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [customerImage, setCustomerImage] = useState<string | null>(null);
  const [similarImages, setSimilarImages] = useState<string[]>([]);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [enhancedAnalysis, setEnhancedAnalysis] = useState<string | null>(null);
  const [offerText, setOfferText] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);

  const uploadImage = async (file: File) => {
    setError(null);
    setIsUploading(true);
    setAnalysis(null);
    setEnhancedAnalysis(null);
    setOfferText(null);
    setSimilarImages([]);

    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch(`${API_URL}/upload-image`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || 'Failed to upload image');
      }

      setCustomerImage(data.customerImageUrl);
      setSimilarImages(data.similarImageUrls);
      setSessionId(data.sessionId);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while uploading the image');
    } finally {
      setIsUploading(false);
    }
  };

  const generateAnalysis = async () => {
    if (!sessionId) return;

    setError(null);
    setIsAnalyzing(true);
    setEnhancedAnalysis(null);
    setOfferText(null);

    try {
      const response = await fetch(`${API_URL}/generate-analysis`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionId }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || 'Failed to generate analysis');
      }

      setAnalysis(data.analysis);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while generating the analysis');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const enhanceAnalysis = async () => {
    if (!sessionId || !analysis) return;

    setError(null);
    setIsEnhancing(true);

    try {
      const response = await fetch(`${API_URL}/enhance-analysis`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          sessionId,
          analysisText: analysis 
        }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || 'Failed to enhance analysis');
      }

      setEnhancedAnalysis(data.enhancedAnalysis);
      setOfferText(data.offerText);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while enhancing the analysis');
    } finally {
      setIsEnhancing(false);
    }
  };

  return {
    uploadImage,
    generateAnalysis,
    enhanceAnalysis,
    isUploading,
    isAnalyzing,
    isEnhancing,
    customerImage,
    similarImages,
    analysis,
    enhancedAnalysis,
    offerText,
    error,
  };
}