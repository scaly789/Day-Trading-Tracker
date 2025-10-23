import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { TradeData, Trades } from './types';
import { getTrades, saveTrades } from './services/tradeDataService';
import Calendar from './components/Calendar';
import CalendarHeader from './components/CalendarHeader';
import EditTradeModal from './components/EditTradeModal';
import TrendsSection from './components/TrendsSection';
import DataPersistence from './components/DataPersistence';
import HeaderCatIcon from './components/icons/HeaderCatIcon';
import CatContainer from './components/cat/CatContainer';

const validateAndProcessTrades = (data: any): Trades | null => {
  if (typeof data !== 'object' || data === null || Array.isArray(data)) {
    return null;
  }

  const processedTrades: Trades = {};
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      if (!dateRegex.test(key)) {
        console.error(`Invalid date key format: ${key}`);
        return null;
      }

      const trade = data[key];
      if (
        typeof trade !== 'object' ||
        trade === null ||
        typeof trade.input !== 'number' ||
        typeof trade.output !== 'number'
      ) {
        console.error(`Invalid trade data for key ${key}:`, trade);
        return null;
      }
      
      processedTrades[key] = {
        input: trade.input,
        output: trade.output,
        pnl: trade.output - trade.input, // Recalculate PNL for consistency
      };
    }
  }
  return processedTrades;
};


const App: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [trades, setTrades] = useState<Trades>({});
  const [editingDate, setEditingDate] = useState<Date | null>(null);

  useEffect(() => {
    setTrades(getTrades());
  }, []);

  const handlePrevMonth = useCallback(() => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  }, []);

  const handleNextMonth = useCallback(() => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  }, []);
  
  const formatDateToKey = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleSaveTrade = useCallback((date: Date, trade: { input: number; output: number }) => {
    const dateKey = formatDateToKey(date);
    const newTradeData: TradeData = { ...trade, pnl: trade.output - trade.input };
    
    setTrades(prevTrades => {
        const newTrades = { ...prevTrades, [dateKey]: newTradeData };
        saveTrades(newTrades);
        return newTrades;
    });
    setEditingDate(null);
  }, []);

  const handleDeleteTrade = useCallback((date: Date) => {
    const dateKey = formatDateToKey(date);
    
    setTrades(prevTrades => {
        const newTrades = { ...prevTrades };
        delete newTrades[dateKey];
        saveTrades(newTrades);
        return newTrades;
    });
    setEditingDate(null);
  }, []);
  
  const handleExport = useCallback(() => {
    try {
        const dataToExport = Object.keys(trades).reduce((acc, key) => {
          const { input, output, pnl } = trades[key];
          acc[key] = { input, output, pnl };
          return acc;
        }, {} as Trades);

        const data = JSON.stringify(dataToExport, null, 2);
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `day-trading-data-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    } catch (error) {
        console.error("Failed to export data:", error);
        alert("Could not export data.");
    }
  }, [trades]);

  const handleImport = useCallback((importedData: any) => {
    const processedTrades = validateAndProcessTrades(importedData);

    if (!processedTrades) {
      alert(
`Import failed: The file format is incorrect.

Please ensure the file is a JSON object where:
- Each key is a date string in "YYYY-MM-DD" format.
- Each value is an object with "input" and "output" numbers.

Example:
{
  "2023-10-26": {
    "input": 5000,
    "output": 5250
  }
}`
      );
      return;
    }

    if (window.confirm("This will overwrite all your current data. Are you sure you want to continue?")) {
        try {
            saveTrades(processedTrades);
            setTrades(processedTrades);

            const dateKeys = Object.keys(processedTrades);
            if (dateKeys.length > 0) {
              dateKeys.sort();
              const firstDateKey = dateKeys[0];
              const [year, month, day] = firstDateKey.split('-').map(Number);
              setCurrentDate(new Date(year, month - 1, day));
            }

            alert('Data imported successfully!');
        } catch (error) {
            console.error('Failed to import data:', error);
            alert('An unexpected error occurred during import.');
        }
    }
  }, []);

  const monthlyPL = useMemo(() => {
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    
    return Object.keys(trades)
      .filter((dateKey) => {
        const [year, month] = dateKey.split('-').map(Number);
        return year === currentYear && month - 1 === currentMonth;
      })
      .reduce((sum, dateKey) => sum + trades[dateKey].pnl, 0);
  }, [trades, currentDate]);


  return (
    <div className="min-h-screen text-gray-800 p-4 sm:p-6 lg:p-8 flex flex-col items-center relative overflow-hidden">
      <div className="w-full max-w-7xl mx-auto z-10">
        <header className="text-center mb-8">
            <div className="flex justify-center items-center gap-4">
                <HeaderCatIcon className="w-16 h-16 sm:w-20 sm:h-20" />
                <div>
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-700">Day Trading Tracker</h1>
                    <p className="text-slate-500 mt-2 text-left">Your daily P/L at a glance.</p>
                </div>
            </div>
        </header>

        <DataPersistence onExport={handleExport} onImport={handleImport} />
        
        <main className="bg-white p-4 sm:p-6 rounded-3xl shadow-lg">
          <CalendarHeader 
            currentDate={currentDate}
            onPrevMonth={handlePrevMonth}
            onNextMonth={handleNextMonth}
            monthlyPL={monthlyPL}
          />
          <Calendar 
            currentDate={currentDate}
            trades={trades}
            onDayClick={(date) => setEditingDate(date)}
          />
        </main>

        <CatContainer trades={trades} currentDate={currentDate} />

        <TrendsSection trades={trades} currentDate={currentDate} />
      </div>

      {editingDate && (
        <EditTradeModal
          date={editingDate}
          tradeData={trades[formatDateToKey(editingDate)]}
          onSave={handleSaveTrade}
          onDelete={handleDeleteTrade}
          onClose={() => setEditingDate(null)}
        />
      )}
    </div>
  );
};

export default App;
