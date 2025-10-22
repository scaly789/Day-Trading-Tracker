
import React, { useMemo } from 'react';
import { Trades } from '../types';

interface CalendarProps {
  currentDate: Date;
  trades: Trades;
  onDayClick: (date: Date) => void;
}

const CalendarCell: React.FC<{
    day: Date | null;
    isToday: boolean;
    tradePnl?: number;
    tradeDetails?: string;
    onClick: () => void;
}> = ({ day, isToday, tradePnl, tradeDetails, onClick }) => {
    
    if (!day) {
        return <div className="rounded-xl bg-slate-50" />;
    }

    const dayOfMonth = day.getDate();
    
    let cellBgColor = 'bg-gray-100 hover:bg-gray-200';
    let pnlTextColor = 'text-gray-800';
    let detailTextColor = 'text-gray-500';

    if (tradePnl !== undefined) {
        if (tradePnl > 0) {
            cellBgColor = 'bg-green-100 hover:bg-green-200';
            pnlTextColor = 'text-green-700';
            detailTextColor = 'text-green-600';
        } else if (tradePnl < 0) {
            cellBgColor = 'bg-red-100 hover:bg-red-200';
            pnlTextColor = 'text-red-700';
            detailTextColor = 'text-red-600';
        }
    }
    
    const formatCurrency = (amount: number) => {
        const sign = amount > 0 ? '+' : amount < 0 ? '-' : '';
        return `${sign}$${Math.abs(amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    };

    const animationClasses = tradePnl !== undefined 
      ? 'shadow-md transform transition-all duration-300 ease-in-out hover:scale-[1.03] hover:shadow-xl' 
      : 'transition-colors duration-200';

    return (
        <div 
            className={`relative flex flex-col justify-center items-center h-24 sm:h-28 md:h-32 lg:h-40 p-2 rounded-xl cursor-pointer ${cellBgColor} ${animationClasses}`}
            onClick={onClick}
        >
            <div className={`absolute top-2 right-2 text-sm font-semibold text-gray-500 w-7 h-7 flex items-center justify-center rounded-full ${isToday ? 'bg-blue-500 text-white' : ''}`}>
                {dayOfMonth}
            </div>
            <div className="flex flex-col items-center justify-center text-center w-full px-1">
                {tradePnl !== undefined && tradeDetails && (
                    <p className="text-[0.6rem] sm:text-xs font-semibold whitespace-nowrap -mt-2 mb-1 sm:mb-2" style={{color: detailTextColor}}>
                        {tradeDetails}
                    </p>
                )}
                {tradePnl !== undefined ? (
                    <p className={`text-xl sm:text-2xl md:text-3xl font-extrabold whitespace-nowrap ${pnlTextColor}`}>
                        {formatCurrency(tradePnl)}
                    </p>
                ) : (
                    <p className="text-sm sm:text-base font-semibold text-gray-400">No Trade</p>
                )}
            </div>
        </div>
    );
};


const Calendar: React.FC<CalendarProps> = ({ currentDate, trades, onDayClick }) => {
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  const calendarGrid = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const grid: (Date | null)[] = [];
    
    for (let i = 0; i < firstDayOfMonth; i++) {
        grid.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
        grid.push(new Date(year, month, i));
    }
    return grid;
  }, [currentDate]);

  const today = new Date();

  const formatDateToKey = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="mt-4">
      <div className="grid grid-cols-7 gap-2 text-center text-xs sm:text-sm font-bold text-gray-500 mb-2">
        {weekdays.map(day => <div key={day}>{day}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {calendarGrid.map((day, index) => {
          if (!day) return <div key={`empty-${index}`} className="rounded-xl bg-transparent" />;
          
          const dateKey = formatDateToKey(day);
          const tradeData = trades[dateKey];

          return (
            <CalendarCell 
                key={dateKey}
                day={day}
                isToday={day.toDateString() === today.toDateString()}
                tradePnl={tradeData?.pnl}
                tradeDetails={tradeData ? `$${tradeData.input.toLocaleString()} → $${tradeData.output.toLocaleString()}` : undefined}
                onClick={() => onDayClick(day)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
