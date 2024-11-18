import React from 'react';
import { Upload, Image as ImageIcon, Loader2, AlertCircle, Zap, Clock, Lock } from 'lucide-react';
import Navbar from '../components/Navbar';
import ImageUploader from '../components/ImageUploader';
import ResultsDisplay from '../components/ResultsDisplay';
import Services from '../components/Services';
import { useImageAnalysis } from '../hooks/useImageAnalysis';
import { useTawkTo } from '../hooks/useTawkTo';

function HomePage() {
  useTawkTo();

  const {
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
    itemType,
    activeService
  } = useImageAnalysis();

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
                AI Art Screener
              </h1>
              <p className="text-2xl font-semibold mt-2 text-[rgb(0,123,255)]">
                Instant Artwork Analysis
              </p>
            </div>

            <p className="mt-6 text-lg leading-8 text-gray-600 mb-8">
              Our advanced AI tools analyze your artwork from multiple angles to provide comprehensive insights.
            </p>

            {!customerImage && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-[rgb(0,123,255)] transition-colors">
                  <Zap className="w-6 h-6 text-[rgb(0,123,255)] mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Multi-Tool Analysis</h3>
                  <p className="text-sm text-gray-600">Six specialized AI tools work together to analyze your artwork.</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-[rgb(0,123,255)] transition-colors">
                  <Lock className="w-6 h-6 text-[rgb(0,123,255)] mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Secure Processing</h3>
                  <p className="text-sm text-gray-600">Your artwork is analyzed securely with state-of-the-art encryption.</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-[rgb(0,123,255)] transition-colors">
                  <Clock className="w-6 h-6 text-[rgb(0,123,255)] mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Real-time Results</h3>
                  <p className="text-sm text-gray-600">Watch as each tool analyzes your artwork in real-time.</p>
                </div>
              </div>
            )}
          </header>

          {error && (
            <div className="mx-auto max-w-2xl mb-8 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-500" />
              <p className="text-red-700">{error}</p>
            </div>
          )}

          <div className="space-y-12">
            {!customerImage && (
              <>
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Start Your Analysis</h2>
                  <p className="text-lg text-gray-600">
                    Upload your artwork to begin the comprehensive AI analysis process.
                  </p>
                </div>
                <Services />
              </>
            )}

            <ImageUploader 
              onUpload={uploadImage}
              isUploading={isUploading}
              customerImage={customerImage}
            />

            {customerImage && (
              <div className="space-y-16">
                <Services activeService={activeService} />
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
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;