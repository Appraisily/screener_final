import React from 'react';
import { Award, Star, Globe, ArrowRight, Clock, Shield, DollarSign } from 'lucide-react';

interface AppraiserProfileProps {
  message?: string;
}

const AppraiserProfile: React.FC<AppraiserProfileProps> = () => {
  return (
    <div className="mt-8 relative">
      <div className="absolute -top-3 left-8 w-4 h-4 bg-white transform rotate-45 border-l border-t border-gray-200"></div>
      <div className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-200 hover:ring-[rgb(0,123,255)] transition-colors">
        <div className="flex items-start gap-6">
          <div className="flex-shrink-0">
            <img
              src="/src/images/appraiser.jpg"
              alt="Andrés Gómez"
              className="w-16 h-16 rounded-full object-cover ring-2 ring-[rgb(0,123,255)]/20"
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-lg font-semibold text-gray-900">Andrés Gómez</h3>
              <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                Lead Art Appraiser
              </span>
            </div>
            <div className="flex flex-wrap gap-3 text-sm text-gray-600 mb-3">
              <div className="flex items-center gap-1">
                <Award className="w-4 h-4 text-[rgb(0,123,255)]" />
                <span>Certified Art Appraiser</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-[rgb(0,123,255)]" />
                <span>15+ Years Experience</span>
              </div>
              <div className="flex items-center gap-1">
                <Globe className="w-4 h-4 text-[rgb(0,123,255)]" />
                <span>International Recognition</span>
              </div>
            </div>
            <div className="text-sm text-gray-600">
              <p className="italic mb-2">"Expertly valuing your treasures to safeguard your investment."</p>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center rounded-full bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                  Fine Art
                </span>
                <span className="inline-flex items-center rounded-full bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                  Antiques
                </span>
                <span className="inline-flex items-center rounded-full bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                  Modern Art
                </span>
              </div>
            </div>
            <div className="mt-6 space-y-6">
              <div className="p-4 bg-gray-50 rounded-lg text-sm text-gray-700 border border-gray-100">
                <h4 className="font-semibold text-base mb-3 text-gray-900">Professional Art Appraisal Services</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[rgb(0,123,255)]" />
                    <span>24-48h Turnaround</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-[rgb(0,123,255)]" />
                    <span>Certified Experts</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-[rgb(0,123,255)]" />
                    <span>From $59/Item</span>
                  </div>
                </div>
                <p className="mb-2">
                  Get a detailed, professional appraisal of your artwork from our team of certified experts. 
                  Our comprehensive reports include market analysis, historical context, and accurate valuations.
                </p>
              </div>
              <div className="flex justify-center">
                <a
                  href="https://www.appraisily.com/pick-your-appraisal-type/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-white 
                           bg-[rgb(0,123,255)] rounded-lg shadow-sm hover:bg-[rgb(0,123,255)]/90 
                           transition-colors duration-200 group"
                >
                  Get Professional Appraisal
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppraiserProfile;