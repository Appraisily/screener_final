import React from 'react';
import { User, Fingerprint, MapPin, Stamp, Calendar, Search } from 'lucide-react';
import Panel from './Panel';

// Separate tools for Art and Antiques
const artTools = [
  {
    id: 'visual',
    name: 'Visual Search',
    description: 'Find similar artworks',
    icon: Search,
    image: 'https://ik.imagekit.io/appraisily/WebPage/visual?updatedAt=1732003934468',
    step: 1
  },
  {
    id: 'maker',
    name: 'Maker Analysis',
    description: 'Identify potential creator',
    icon: User,
    image: 'https://ik.imagekit.io/appraisily/WebPage/maker?updatedAt=1732004009063',
    step: 2
  },
  {
    id: 'age',
    name: 'Age Analysis',
    description: 'Estimate creation period',
    icon: Calendar,
    image: 'https://ik.imagekit.io/appraisily/WebPage/age?updatedAt=1732003886959',
    step: 3
  },
  {
    id: 'signature',
    name: 'Signature Check',
    description: 'Analyze signatures',
    icon: Fingerprint,
    image: 'https://ik.imagekit.io/appraisily/WebPage/signature?updatedAt=1732003919574',
    step: 4
  }
];

const antiqueTools = [
  {
    id: 'visual',
    name: 'Visual Search',
    description: 'Find similar antiques',
    icon: Search,
    image: 'https://ik.imagekit.io/appraisily/WebPage/visual?updatedAt=1732003934468',
    step: 1
  },
  {
    id: 'marks',
    name: 'Marks Recognition',
    description: 'Identify maker marks',
    icon: Stamp,
    image: 'https://ik.imagekit.io/appraisily/WebPage/marks?updatedAt=1732003867308',
    step: 2
  },
  {
    id: 'origin',
    name: 'Origin Analysis',
    description: 'Determine likely origin',
    icon: MapPin,
    image: 'https://ik.imagekit.io/appraisily/WebPage/origin?updatedAt=1732003994998',
    step: 3
  },
  {
    id: 'age',
    name: 'Age Analysis',
    description: 'Estimate creation period',
    icon: Calendar,
    image: 'https://ik.imagekit.io/appraisily/WebPage/age?updatedAt=1732003886959',
    step: 4
  }
];

interface ServicesProps {
  activeService?: string;
  itemType: 'Art' | 'Antique' | null;
  currentStep: number;
}

const Services: React.FC<ServicesProps> = ({ activeService, itemType, currentStep }) => {
  const tools = itemType === 'Art' ? artTools : itemType === 'Antique' ? antiqueTools : [];

  if (!itemType) return null;

  return (
    <div className="relative">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#007bff,_transparent_70%)] opacity-[0.15]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,_#007bff,_transparent_70%)] opacity-[0.15]"></div>
      </div>
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <div className="mb-6">
            <span className="inline-flex items-center rounded-full bg-[#007bff]/10 px-4 py-2 text-sm font-medium text-[#007bff]">
              Step {currentStep} of 4
            </span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {itemType} Analysis Tools
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Follow each step to analyze your {itemType.toLowerCase()} and get detailed insights
          </p>
        </div>

        {/* Progress bar */}
        <div className="mx-auto max-w-3xl mb-16">
          <div className="h-2 bg-gray-100 rounded-full">
            <div 
              className="h-full bg-[#007bff] rounded-full transition-all duration-500"
              style={{ width: `${(currentStep / 4) * 100}%` }}
            />
          </div>
          <div className="mt-4 grid grid-cols-4 gap-2">
            {[1, 2, 3, 4].map((step) => (
              <div 
                key={step}
                className={`text-xs text-center ${
                  step <= currentStep ? 'text-[#007bff]' : 'text-gray-400'
                }`}
              >
                Step {step}
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-4">
          {tools.map((tool) => (
            <Panel
              key={tool.id}
              title={tool.name}
              description={tool.description}
              image={tool.image}
              icon={tool.icon}
              isActive={currentStep === tool.step}
              isComplete={currentStep > tool.step}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;