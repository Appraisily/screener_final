import { format, addDays } from 'date-fns';
import { cn } from '@/lib/utils';
import { Calendar } from 'lucide-react';

interface DateSelectorProps {
  selectedDate: string | null;
  onDateSelect: (date: string) => void;
}

export function DateSelector({ selectedDate, onDateSelect }: DateSelectorProps) {
  const today = new Date();
  
  const dates = [
    today,
    addDays(today, 1),
    addDays(today, 2)
  ];

  const handleDateSelect = (date: Date) => {
    onDateSelect(format(date, 'MMM dd, yyyy'));
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-center text-gray-900">
        When would you like the appraisal?
      </h3>
      <div className="flex flex-col gap-3">
        {dates.map((date) => (
          <button
            key={date.toISOString()}
            onClick={() => handleDateSelect(date)}
            className={cn(
              "w-full py-4 px-6 rounded-lg border-2 transition-all duration-200 shadow-sm hover:shadow-md",
              selectedDate === format(date, 'MMM dd, yyyy')
                ? "border-[#007bff] bg-[#007bff] text-white shadow-[#007bff]/20"
                : "border-gray-200 text-gray-700 hover:border-[#007bff] hover:text-[#007bff] bg-white"
            )}
          >
            <div className="flex flex-col items-center gap-1">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5" strokeWidth={1.5} />
                <span className="text-lg font-medium">
                  {format(date, "MMMM d, yyyy")}
                  {format(date, "MM/dd/yyyy") === format(today, "MM/dd/yyyy") && " (Today)"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm line-through opacity-75">$89</span>
                <span className="text-sm font-semibold text-green-600">$59</span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}