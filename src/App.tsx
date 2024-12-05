import { useState } from 'react';
import { cn } from '@/lib/utils';
import { ServiceDetails } from '@/components/ServiceDetails';
import { Header } from '@/components/Header';
import { ChatWidget } from '@/components/ChatWidget';

const services = {
  regular: {
    features: [
      {
        title: 'Expert Analysis',
        description: 'Our team of accredited experts brings extensive knowledge to evaluate your items meticulously.',
      },
      {
        title: 'Detailed Market Valuation Report',
        description: 'Comprehensive report explaining value factors and market pricing.',
      },
      {
        title: 'Historical Significance',
        description: 'Deep dive into item history and provenance, providing rich contextual narrative.',
      },
      {
        title: 'Verifiable Documentation',
        description: 'Authenticated documentation supporting item value and authenticity.',
      },
    ],
    exampleReportUrl: 'https://drive.google.com/file/d/1n-JCAEZJaZDOzQ3mF4GRPmatRKrUsoUn/',
  },
  insurance: {
    features: [
      {
        title: 'Comprehensive Coverage Analysis',
        description: 'Detailed evaluation ensuring full insurance coverage and current market value.',
      },
      {
        title: 'Certified Insurance Documentation',
        description: 'Official documents recognized by insurance providers.',
      },
      {
        title: 'Risk Assessment',
        description: 'Expert assessment of potential risks and protective measures.',
      },
      {
        title: 'Support for Claim Processing',
        description: 'Professional guidance through insurance claim procedures.',
      },
    ],
    exampleReportUrl: 'https://drive.google.com/file/d/1n-JCAEZJaZDOzQ3mF4GRPmatRKrUsoUn/',
  },
  tax: {
    features: [
      {
        title: 'IRS Form 8283 Preparation',
        description: 'Complete preparation of required tax forms for charitable contributions.',
      },
      {
        title: 'Qualified Appraisal Reports',
        description: 'Comprehensive reports meeting IRS requirements for tax deductions.',
      },
      {
        title: 'Expert Art Evaluation',
        description: 'Meticulous evaluation of artwork considering all value factors.',
      },
      {
        title: 'Assistance with Documentation',
        description: 'Support in preparing all necessary donation documentation.',
      },
    ],
    exampleReportUrl: 'https://drive.google.com/file/d/1n-JCAEZJaZDOzQ3mF4GRPmatRKrUsoUn/',
  },
};

type ServiceType = keyof typeof services;

export default function App() {
  const [selectedService, setSelectedService] = useState<ServiceType | null>(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const handleServiceSelect = (service: ServiceType) => {
    if (selectedService === service) return;
    
    setSelectedService(service);
    setShowCheckout(service === 'regular');
    setSelectedDate(service === 'regular' ? 'Oct 26, 2024' : null);
  };

  const handleDateSelect = (date: string, service: ServiceType) => {
    setSelectedDate(date);
    if (service !== 'regular') {
      setShowCheckout(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">
            Select your service
          </h1>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-12 max-w-3xl mx-auto">
          {(Object.keys(services) as ServiceType[]).map((type) => (
            <button
              key={type}
              onClick={() => handleServiceSelect(type)}
              className={cn(
                "flex-1 py-6 px-4 text-lg font-medium rounded-lg border transition-all duration-200 outline-none focus:outline-none shadow-sm hover:shadow-md",
                selectedService === type
                  ? "border-[#007bff] bg-[#007bff] text-white shadow-[#007bff]/20"
                  : "border-gray-200 text-gray-700 hover:border-[#007bff] hover:text-[#007bff] bg-white"
              )}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)} Appraisal
            </button>
          ))}
        </div>

        {selectedService && (
          <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            <ServiceDetails
              type={selectedService}
              features={services[selectedService].features}
              exampleReportUrl={services[selectedService].exampleReportUrl}
              showCheckout={showCheckout}
              selectedDate={selectedDate}
              onDateSelect={(date, price) => {
                handleDateSelect(date, selectedService);
              }}
            />
          </div>
        )}
      </main>
      <ChatWidget />
    </div>
  );
}