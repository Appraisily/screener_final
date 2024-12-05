import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ServiceButtonProps {
  name: string;
  isSelected: boolean;
  onClick: () => void;
}

export function ServiceButton({ name, isSelected, onClick }: ServiceButtonProps) {
  return (
    <Button
      variant="outline"
      className={cn(
        "w-full py-6 text-lg font-medium transition-all duration-200",
        isSelected ? "border-[#007bff] text-[#007bff] bg-[#007bff]/5" : "text-gray-500 hover:text-[#007bff] hover:border-[#007bff]"
      )}
      onClick={onClick}
    >
      {name}
    </Button>
  );
}