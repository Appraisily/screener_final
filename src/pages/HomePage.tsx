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
              <p className="text-2xl font-semibold mt-2 text-[#007bff]">
                Interactive Analysis Tool
              </p>
            </div>

            <p className="mt-6 text-lg leading-8 text-gray-600">
              Upload your item and follow our step-by-step analysis process to discover its details and value
            </p>
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
                      className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-[#007bff] text-white hover:bg-[#0056b3] transition-colors gap-2 shadow-lg shadow-blue-500/20"
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