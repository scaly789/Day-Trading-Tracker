import React from 'react';
import ChevronLeftIcon from './icons/ChevronLeftIcon';
import ChevronRightIcon from './icons/ChevronRightIcon';

interface CalendarHeaderProps {
  currentDate: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  monthlyPL: number;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({ currentDate, onPrevMonth, onNextMonth, monthlyPL }) => {
  const monthName = currentDate.toLocaleString('default', { month: 'long' });
  const year = currentDate.getFullYear();

  const plColorClasses = monthlyPL >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  
  const formatCurrency = (amount: number) => {
    const sign = amount > 0 ? '+' : amount < 0 ? '-' : '';
    return `${sign}$${Math.abs(amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };
  
  return (
    <div className="calendar-header">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 w-1/3 text-left">
                {monthName} <span className="text-slate-400">{year}</span>
            </h2>
            <div className="flex items-center justify-center w-1/3">
                <button onClick={onPrevMonth} className="p-2 rounded-full hover:bg-gray-200 transition-colors">
                    <ChevronLeftIcon className="w-6 h-6 text-gray-600" />
                </button>
                <button onClick={onNextMonth} className="p-2 rounded-full hover:bg-gray-200 transition-colors">
                    <ChevronRightIcon className="w-6 h-6 text-gray-600" />
                </button>
            </div>
             <div className="w-1/3 flex justify-end"></div>
        </div>
        <div className={`p-4 rounded-2xl ${plColorClasses} text-center`}>
            <p className="text-sm font-semibold opacity-80">Monthly P/L</p>
            <p className="text-3xl sm:text-4xl font-extrabold">{formatCurrency(monthlyPL)}</p>
        </div>
    </div>
  );
};

export default CalendarHeader;