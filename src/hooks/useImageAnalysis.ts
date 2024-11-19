import { useState, useCallback } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export type AnalysisStep = {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
};

export function useImageAnalysis() {
  const [isUploading, setIsUploading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [customerImage, setCustomerImage] = useState<string | null>(null);
  const [similarImages, setSimilarImages] = useState<string[]>([]);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [itemType, setItemType] = useState<'Art' | 'Antique' | null>(null);
  const [currentStep, setCurrentStep] = useState(1);

  const resetState = () => {
    setError(null);
    setAnalysis(null);
    setSimilarImages([]);
    setItemType(null);
    setCurrentStep(1);
  };

  const uploadImage = async (file: File) => {
    resetState();
    setIsUploading(true);

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
      setSimilarImages(data.similarImageUrls || []);
      setSessionId(data.sessionId);
      setItemType(data.itemType || 'Art');

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while uploading the image');
    } finally {
      setIsUploading(false);
    }
  };

  const proceedToNextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 4));
  };

  const goToPreviousStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  return {
    uploadImage,
    proceedToNextStep,
    goToPreviousStep,
    isUploading,
    isAnalyzing,
    customerImage,
    similarImages,
    analysis,
    error,
    itemType,
    currentStep
  };
}