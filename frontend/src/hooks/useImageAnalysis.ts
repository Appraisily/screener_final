import { useState } from 'react';

// Use environment variable for API URL
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export type AnalysisStep = {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  image?: string;
};

const initialSteps: AnalysisStep[] = [
  {
    id: 'visual',
    title: 'Visual Search',
    description: 'Find similar artworks',
    status: 'pending'
  },
  {
    id: 'vision',
    title: 'Visual Analysis',
    description: 'Processing image with Google Vision AI',
    status: 'pending'
  },
  {
    id: 'similarity',
    title: 'Finding Similar Items',
    description: 'Searching database for similar artworks',
    status: 'pending'
  },
  {
    id: 'analysis',
    title: 'Generating Analysis',
    description: 'Creating detailed artwork analysis',
    status: 'pending'
  }
];

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
  const [steps, setSteps] = useState<AnalysisStep[]>(initialSteps);
  const [itemType, setItemType] = useState<'Art' | 'Antique' | null>(null);

  const updateStep = (stepId: string, updates: Partial<AnalysisStep>) => {
    setSteps(currentSteps =>
      currentSteps.map(step =>
        step.id === stepId ? { ...step, ...updates } : step
      )
    );
  };

  const uploadImage = async (file: File) => {
    setError(null);
    setIsUploading(true);
    setAnalysis(null);
    setEnhancedAnalysis(null);
    setOfferText(null);
    setSimilarImages([]);
    setSteps(initialSteps);
    setItemType(null);

    try {
      const formData = new FormData();
      formData.append('image', file);

      updateStep('visual', { status: 'processing' });
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

      updateStep('visual', { status: 'completed' });
      updateStep('vision', { status: 'completed' });
      updateStep('similarity', { status: 'completed' });

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while uploading the image');
      steps.forEach(step => {
        if (step.status === 'processing') {
          updateStep(step.id, { status: 'error' });
        }
      });
    } finally {
      setIsUploading(false);
    }
  };

  const generateAnalysis = async () => {
    if (!sessionId) return;

    setError(null);
    setIsAnalyzing(true);
    updateStep('analysis', { status: 'processing' });

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
      updateStep('analysis', { status: 'completed' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while generating the analysis');
      updateStep('analysis', { status: 'error' });
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
    steps,
    itemType
  };
}