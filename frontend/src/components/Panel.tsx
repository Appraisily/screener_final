import React from 'react';
import { LucideIcon } from 'lucide-react';

interface PanelProps {
  title: string;
  description: string;
  image?: string;
  icon: LucideIcon;
  isActive?: boolean;
  isComplete?: boolean;
}

const Panel: React.FC<PanelProps> = ({
  title,
  description,
  image,
  icon: Icon,
  isActive = false,
  isComplete = false,
}) => {
  return (
    <div
      className={`relative bg-white rounded-xl shadow-sm border 
                 ${isActive 
                   ? 'border-[rgb(0,123,255)] shadow-[rgb(0,123,255)]/10' 
                   : isComplete
                     ? 'border-green-500 shadow-green-500/10'
                     : 'border-gray-100'
                 } 
                 hover:shadow-md transition-all duration-300 p-4`}
    >
      <div className="flex items-center gap-4">
        <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
          {image ? (
            <>
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </>
          ) : (
            <div className={`w-full h-full flex items-center justify-center rounded-lg
                          ${isActive 
                            ? 'bg-[rgb(0,123,255)]/5' 
                            : isComplete
                              ? 'bg-green-500/5'
                              : 'bg-gray-50'
                          }`}>
              <Icon className={`w-6 h-6 
                            ${isActive 
                              ? 'text-[rgb(0,123,255)] animate-pulse' 
                              : isComplete
                                ? 'text-green-500'
                                : 'text-gray-400'
                            }`} />
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-gray-900 mb-0.5">{title}</h3>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default Panel;