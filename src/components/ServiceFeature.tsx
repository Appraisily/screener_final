import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';

interface ServiceFeatureProps {
  title: string;
  description: string;
}

export function ServiceFeature({ title, description }: ServiceFeatureProps) {
  return (
    <li className="flex items-center gap-2 text-gray-700">
      <span>{title}</span>
      <Tooltip>
        <TooltipTrigger asChild>
          <Info className="h-4 w-4 text-[#007bff] cursor-help" />
        </TooltipTrigger>
        <TooltipContent className="max-w-[300px] text-sm">
          <p>{description}</p>
        </TooltipContent>
      </Tooltip>
    </li>
  );
}