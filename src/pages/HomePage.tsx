import React from 'react';
import { ArrowRight, ArrowLeft, AlertCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import ImageUploader from '../components/ImageUploader';
import Services from '../components/Services';
import { useImageAnalysis } from '../hooks/useImageAnalysis';
import { useTawkTo } from '../hooks/useTawkTo';

function HomePage() {
  useTawkTo();

  const {
    uploadImage,
    proceedToNextStep,
    goToPreviousStep,
    isUploading,
    customerImage,
    error,
    itemType,
    currentStep
  } = useImageAnalysis();

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12 sm:py-16">
          <header className="mx-auto max-w-3xl text-center mb-16">
            <div className="flex flex-col items-center justify-center gap-6">
              {/* AI Art Screener Logo */}
              <div className="w-20 h-20 bg-gray-900 rounded-lg flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-12 h-12 text-white" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>

              {/* Title and Subtitle */}
              <div className="space-y-2">
                <h1 className="text-5xl font-bold tracking-tight text-gray-900">
                  AI Art Screener
                </h1>
                <p className="text-xl text-[#007bff]">
                  by Appraisily
                </p>
              </div>

              {/* Description */}
              <p className="text-lg text-gray-600 max-w-2xl">
                Upload your artwork and get instant AI-powered insights to help determine its potential value.
              </p>

              {/* Links */}
              <div className="flex items-center gap-4 text-sm">
                <a
                  href="https://appraisily.com/about"
                  className="text-gray-600 hover:text-[#007bff] transition-colors"
                >
                  Learn more about Appraisily
                </a>
                <span className="text-gray-300">•</span>
                <a
                  href="https://appraisily.com/services"
                  className="text-gray-600 hover:text-[#007bff] transition-colors"
                >
                  Professional appraisal services
                </a>
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
            <ImageUploader 
              onUpload={uploadImage}
              isUploading={isUploading}
              customerImage={customerImage}
            />

            {itemType && (
              <>
                <Services 
                  itemType={itemType}
                  currentStep={currentStep}
                />

                <div className="flex justify-center gap-4">
                  {currentStep > 1 && (
                    <button
                      onClick={goToPreviousStep}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#007bff]/5 text-[#007bff] hover:bg-[#007bff]/10 transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Previous Step
                    </button>
                  )}
                  {currentStep < 4 && (
                    <button
                      onClick={proceedToNextStep}
                      className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-[#007bff] text-white hover:bg-[#007bff]/90 transition-colors gap-2 shadow-lg shadow-blue-500/20"
                    >
                      Next Step
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;