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
      className={`group relative bg-white rounded-xl shadow-sm border overflow-hidden
                 ${isActive 
                   ? 'border-[rgb(0,123,255)] shadow-[rgb(0,123,255)]/10 ring-2 ring-[rgb(0,123,255)]/20' 
                   : isComplete
                     ? 'border-green-500 shadow-green-500/10'
                     : 'border-gray-100'
                 } 
                 hover:shadow-md transition-all duration-300`}
    >
      {image && (
        <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
          <img
            src={image}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white" />
        </div>
      )}
      
      <div className="relative p-6">
        <div className={`w-12 h-12 rounded-lg mb-4 flex items-center justify-center
                      ${isActive 
                        ? 'bg-[rgb(0,123,255)]/10' 
                        : isComplete
                          ? 'bg-green-500/10'
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
        
        <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
        
        {isActive && (
          <div className="absolute bottom-0 left-0 w-full h-1 bg-[rgb(0,123,255)]">
            <div className="h-full bg-white/30 animate-[progress_2s_ease-in-out_infinite]" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Panel;