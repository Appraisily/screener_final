import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import ResultsDisplay from '../components/ResultsDisplay';
import Services from '../components/Services';
import { useImageAnalysis } from '../hooks/useImageAnalysis';
import { useTawkTo } from '../hooks/useTawkTo';

function AnalyzePage() {
  const { sessionId } = useParams<{ sessionId: string }>();
  useTawkTo();

  const {
    generateAnalysis,
    enhanceAnalysis,
    isAnalyzing,
    isEnhancing,
    customerImage,
    similarImages,
    analysis,
    enhancedAnalysis,
    offerText,
    error,
    steps,
    itemType,
    fetchTempImage,
    activeService
  } = useImageAnalysis();

  useEffect(() => {
    if (sessionId) {
      fetchTempImage(sessionId);
    }
  }, [sessionId, fetchTempImage]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12 sm:py-16">
          <header className="mx-auto max-w-3xl text-center mb-16">
            <div className="flex flex-col items-center justify-center gap-2 mb-6">
              <div className="w-24 h-24 mb-2">
                <img 
                  src="https://ik.imagekit.io/appraisily/WebPage/logo_new.png?updatedAt=1731919266638" 
                  alt="Appraisily Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
                Analyzing Your Artwork
              </h1>
              <p className="text-2xl font-semibold mt-2 text-[rgb(0,123,255)]">
                AI-Powered Analysis in Progress
              </p>
            </div>
          </header>

          {error && (
            <div className="mx-auto max-w-2xl mb-8 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-500" />
              <p className="text-red-700">{error}</p>
            </div>
          )}

          <div className="space-y-16">
            <Services activeService={activeService} />
            {customerImage && (
              <ResultsDisplay 
                similarImages={similarImages}
                analysis={analysis}
                enhancedAnalysis={enhancedAnalysis}
                offerText={offerText}
                onGenerateAnalysis={generateAnalysis}
                onEnhanceAnalysis={enhanceAnalysis}
                isAnalyzing={isAnalyzing}
                isEnhancing={isEnhancing}
                steps={steps}
                itemType={itemType}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default AnalyzePage;