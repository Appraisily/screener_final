import React from 'react';
import { Upload, Image as ImageIcon, Loader2, AlertCircle, Zap, Clock, Lock } from 'lucide-react';
import ImageUploader from './components/ImageUploader';
import ResultsDisplay from './components/ResultsDisplay';
import { useImageAnalysis } from './hooks/useImageAnalysis';
import { useTawkTo } from './hooks/useTawkTo';

function App() {
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
    itemType
  } = useImageAnalysis();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
        <header className="mx-auto max-w-3xl text-center mb-16">
          <div className="flex flex-col items-center justify-center gap-2 mb-6">
            <div className="w-24 h-24 mb-2">
              <img 
                src="https://www.appraisily.com/wp-content/uploads/2023/12/logo.jpg" 
                alt="Appraisily Logo" 
                className="w-full h-full object-contain rounded-xl"
              />
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
              Appraisily
            </h1>
            <p className="text-2xl font-semibold mt-2 text-[rgb(0,123,255)]">
              Free Instant Art Screening
            </p>
          </div>

          <p className="mt-6 text-lg leading-8 text-gray-600 mb-8">
            Upload your artwork, and our AI-powered system will analyze it instantly using Google Vision and AI to deliver expert insights.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-[rgb(0,123,255)] transition-colors">
              <Zap className="w-6 h-6 text-[rgb(0,123,255)] mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Instant Analysis</h3>
              <p className="text-sm text-gray-600">Simply drop or upload a photo of your artwork's front to get started.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-[rgb(0,123,255)] transition-colors">
              <Lock className="w-6 h-6 text-[rgb(0,123,255)] mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">No Sign-up Required</h3>
              <p className="text-sm text-gray-600">Get a professional analysis without any account or credit card.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-[rgb(0,123,255)] transition-colors">
              <Clock className="w-6 h-6 text-[rgb(0,123,255)] mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Quick Results</h3>
              <p className="text-sm text-gray-600">Discover similar pieces, style insights, and historical context in seconds.</p>
            </div>
          </div>
        </header>

        {error && (
          <div className="mx-auto max-w-2xl mb-8 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-500" />
            <p className="text-red-700">{error}</p>
          </div>
        )}

        <div className="space-y-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Get Instant Results!</h2>
            <p className="text-lg text-gray-600">
              Upload your artwork to start your free screening and discover similar pieces, style insights, and historical context in seconds.
            </p>
          </div>

          <ImageUploader 
            onUpload={uploadImage}
            isUploading={isUploading}
            customerImage={customerImage}
          />

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
  );
}

export default App;