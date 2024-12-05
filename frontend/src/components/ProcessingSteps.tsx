import React from 'react';
import { Search, Brain, Sparkles, MessageSquare } from 'lucide-react';
import Panel from './Panel';
import type { AnalysisStep } from '../hooks/useImageAnalysis';

interface ProcessingStepsProps {
  steps: AnalysisStep[];
}

const STEP_ICONS = {
  visual: Search,
  vision: Brain,
  similarity: Sparkles,
  analysis: MessageSquare,
};

const ProcessingSteps: React.FC<ProcessingStepsProps> = ({ steps }) => {
  // Only show steps that are either processing or completed
  const activeSteps = steps.filter(step => 
    step.status === 'processing' || step.status === 'completed'
  );

  // If no active steps, don't render anything
  if (activeSteps.length === 0) return null;

  return (
    <div className="space-y-4">
      {activeSteps.map((step) => (
        <div 
          key={step.id}
          className="animate-fade-in"
        >
          <Panel
            title={step.title}
            description={step.description}
            icon={STEP_ICONS[step.id as keyof typeof STEP_ICONS]}
            isActive={step.status === 'processing'}
            isComplete={step.status === 'completed'}
            image={step.image}
          />
        </div>
      ))}
    </div>
  );
};

export default ProcessingSteps;