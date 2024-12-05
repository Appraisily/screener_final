import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  addDays,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isAfter,
  isBefore,
  isSameDay,
  format
} from 'date-fns';

interface CalendarProps {
  onDateSelect: (date: string, price: number) => void;
}

export function Calendar({ onDateSelect }: CalendarProps) {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today);
  const [selectedDate, setSelectedDate] = useState(today);
  const nextAvailableDate = addDays(today, 7);

  // Trigger initial date selection
  useEffect(() => {
    onDateSelect(format(today, 'MMM dd, yyyy'), 59);
  }, []);

  const isDateAvailable = (date: Date) => {
    const isToday = isSameDay(date, today);
    const isAfterWaitPeriod = isAfter(date, nextAvailableDate);
    return isToday || isAfterWaitPeriod;
  };

  const getDatePrice = (date: Date) => {
    return isSameDay(date, today) ? 59 : 119;
  };

  const handleDateSelect = (date: Date) => {
    if (isDateAvailable(date)) {
      setSelectedDate(date);
      onDateSelect(format(date, 'MMM dd, yyyy'), getDatePrice(date));
    }
  };

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const previousMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const generateCalendarDays = () => {
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    const days = eachDayOfInterval({ start, end });
    
    const startDay = start.getDay();
    const adjustedStartDay = startDay === 0 ? 6 : startDay - 1;

    const daysWithPadding = [];

    for (let i = 0; i < adjustedStartDay; i++) {
      daysWithPadding.push(<div key={`empty-${i}`} className="h-12 bg-white" />);
    }

    days.forEach((date) => {
      const isAvailable = isDateAvailable(date);
      const price = getDatePrice(date);
      const isSelected = selectedDate && isSameDay(selectedDate, date);
      const isToday = isSameDay(date, today);
      const isPastDate = isBefore(date, today);
      const isWithinWeek = isBefore(date, addDays(today, 8)) && isAfter(date, today);

      const dayElement = (
        <div key={date.toISOString()}>
          <button
            disabled={!isAvailable || isPastDate}
            className={cn(
              "w-full h-12 flex flex-col items-center justify-center rounded-lg",
              "text-sm transition-colors duration-200 bg-white",
              isPastDate ? "text-gray-300" : "text-gray-700",
              isSelected && "bg-[#007bff] text-white shadow-md",
              isToday && !isSelected && "text-[#007bff] font-semibold border-2 border-[#007bff]",
              isWithinWeek && !isSelected && !isToday && "text-red-500",
              isAvailable && !isSelected && "hover:bg-gray-50",
              !isAvailable && !isPastDate && "cursor-not-allowed"
            )}
            onClick={() => handleDateSelect(date)}
          >
            <span className="font-medium">{format(date, 'd')}</span>
            {isAvailable && !isWithinWeek && (
              <span className={cn(
                "text-xs",
                isSelected ? "text-white" : "text-green-600"
              )}>${price}</span>
            )}
          </button>
        </div>
      );

      if (isWithinWeek && !isToday && !isPastDate) {
        daysWithPadding.push(
          <Tooltip key={`tooltip-${date.toISOString()}`}>
            <TooltipTrigger asChild>
              {dayElement}
            </TooltipTrigger>
            <TooltipContent className="bg-white text-red-500 border border-red-100 p-2">
              No appraisal slots available
            </TooltipContent>
          </Tooltip>
        );
      } else {
        daysWithPadding.push(dayElement);
      }
    });

    return daysWithPadding;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 w-full max-w-md mx-auto">
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">When do you want the appraisal?</h3>
      </div>
      
      <div className="flex justify-between items-center mb-4">
        <button 
          onClick={previousMonth}
          className="w-8 h-8 flex items-center justify-center rounded-full text-[#007bff] hover:bg-[#007bff]/5 transition-colors"
          style={{ background: 'none' }}
        >
          <span className="text-2xl font-light leading-none select-none">‹</span>
        </button>
        <span className="text-base font-medium text-gray-900">
          {format(currentMonth, 'MMMM yyyy')}
        </span>
        <button 
          onClick={nextMonth}
          className="w-8 h-8 flex items-center justify-center rounded-full text-[#007bff] hover:bg-[#007bff]/5 transition-colors"
          style={{ background: 'none' }}
        >
          <span className="text-2xl font-light leading-none select-none">›</span>
        </button>
      </div>

      <div className="grid grid-cols-7 gap-px mb-2 text-center">
        {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((day) => (
          <div key={day} className="text-xs font-medium text-gray-500 py-1">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 bg-white">
        {generateCalendarDays()}
      </div>

      {!selectedDate && (
        <div className="mt-4 text-center">
          <div className="text-sm font-medium text-red-500 mb-1">
            Last spot available today! - due to cancellation
          </div>
          <div className="flex items-center justify-center gap-2">
            <span className="line-through text-gray-400">$119</span>
            <span className="text-green-600 font-semibold">$59</span>
          </div>
        </div>
      )}
    </div>
  );
}