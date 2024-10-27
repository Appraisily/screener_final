import React from 'react';
import { MessageSquare, Sparkles } from 'lucide-react';
import AppraiserProfile from './AppraiserProfile';

interface ResultsDisplayProps {
  similarImages: string[];
  analysis: string | null;
  enhancedAnalysis: string | null;
  offerText: string | null;
  onGenerateAnalysis: () => void;
  onEnhanceAnalysis: () => void;
  isAnalyzing: boolean;
  isEnhancing: boolean;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({
  similarImages,
  analysis,
  enhancedAnalysis,
  offerText,
  onGenerateAnalysis,
  onEnhanceAnalysis,
  isAnalyzing,
  isEnhancing,
}) => {
  return (
    <div className="space-y-12">
      <div>
        <div className="mx-auto max-w-2xl text-center mb-8">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Similar Artworks Found</h2>
          <p className="mt-4 text-lg text-gray-600">
            Our AI has identified these visually similar artworks from across the web.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {similarImages.map((url, index) => (
            <div key={index} className="flex flex-col items-start">
              <div className="rounded-2xl bg-white p-2 ring-1 ring-gray-200 w-full h-full shadow-sm
                            transition-all duration-200 hover:-translate-y-1 hover:shadow-lg 
                            hover:ring-[rgb(0,123,255)]">
                <img
                  src={url}
                  alt={`Similar artwork ${index + 1}`}
                  className="w-full h-64 object-cover rounded-lg"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=500&h=500&fit=crop';
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {!analysis && !isAnalyzing && (
        <div className="flex justify-center">
          <button
            onClick={onGenerateAnalysis}
            className="rounded-md bg-[rgb(0,123,255)] px-6 py-3 text-lg font-semibold text-white shadow-sm 
                     hover:bg-[rgb(0,123,255)]/90 focus-visible:outline focus-visible:outline-2 
                     focus-visible:outline-offset-2 focus-visible:outline-[rgb(0,123,255)] 
                     transition-all duration-200 flex items-center gap-2"
          >
            <MessageSquare className="w-5 h-5" />
            Generate Expert Analysis
          </button>
        </div>
      )}

      {isAnalyzing && (
        <div className="text-center py-8">
          <div className="animate-pulse flex flex-col items-center gap-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
          <p className="text-gray-600 mt-4">Generating expert analysis...</p>
        </div>
      )}

      {analysis && (
        <div className="rounded-2xl bg-white p-8 shadow-lg ring-1 ring-gray-200 hover:ring-[rgb(0,123,255)] transition-colors">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Expert Analysis</h2>
          <div className="prose max-w-none">
            {analysis.split('\n').map((paragraph, index) => (
              <p key={index} className="text-gray-600 mb-4 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {!enhancedAnalysis && !isEnhancing && (
            <div className="mt-8 flex justify-center">
              <button
                onClick={onEnhanceAnalysis}
                className="rounded-md bg-[rgb(0,123,255)] px-6 py-3 text-lg font-semibold text-white shadow-sm 
                         hover:bg-[rgb(0,123,255)]/90 focus-visible:outline focus-visible:outline-2 
                         focus-visible:outline-offset-2 focus-visible:outline-[rgb(0,123,255)] 
                         transition-all duration-200 flex items-center gap-2"
              >
                <Sparkles className="w-5 h-5" />
                Get Enhanced Analysis
              </button>
            </div>
          )}
        </div>
      )}

      {isEnhancing && (
        <div className="text-center py-8">
          <div className="animate-pulse flex flex-col items-center gap-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
          <p className="text-gray-600 mt-4">Enhancing analysis with additional insights...</p>
        </div>
      )}

      {enhancedAnalysis && (
        <>
          <div className="rounded-2xl bg-white p-8 shadow-lg ring-1 ring-gray-200 hover:ring-[rgb(0,123,255)] transition-colors">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Enhanced Analysis</h2>
            <div className="prose max-w-none">
              {enhancedAnalysis.split('\n').map((paragraph, index) => (
                <p key={index} className="text-gray-600 mb-4 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
          <AppraiserProfile message={offerText} />
        </>
      )}
    </div>
  );
};

export default ResultsDisplay;