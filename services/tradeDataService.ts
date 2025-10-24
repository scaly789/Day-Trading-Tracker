import { Trades } from '../types';

const STORAGE_KEY = 'dayTradingTrackerData';

const getInitialData = (): Trades => {
  const trades: Trades = {};
  
  // Define specific trade entries with date, input, and output.
  // This makes the default state consistent for all users, regardless of when they open the app.
  // The date string MUST be in "YYYY-MM-DD" format.
  const sampleTrades = [
    { date: '2025-10-15', input: 280, output: 420 }, 
    { date: '2025-10-16', input: 218, output: 380 }, 
    { date: '2025-10-17', input: 752, output: 654 }, 
    { date: '2025-10-20', input: 296, output: 420 }, 
    { date: '2025-10-21', input: 1067, output: 951 },
    { date: '2025-10-22', input: 408, output: 720 }, 
    { date: '2025-10-23', input: 424, output: 490 },
    { date: '2025-10-24', input: 408, output: 357 },
  ];

  for (const trade of sampleTrades) {
      // The date is already in the correct "YYYY-MM-DD" key format
      const dateKey = trade.date;
      trades[dateKey] = {
        input: trade.input,
        output: trade.output,
        pnl: trade.output - trade.input,
      };
  }
  
  return trades;
};

export const getTrades = (): Trades => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    } else {
      const initialData = getInitialData();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
      return initialData;
    }
  } catch (error) {
    console.error("Failed to parse trades from localStorage", error);
    return {};
  }
};

export const saveTrades = (trades: Trades): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trades));
  } catch (error) {
    console.error("Failed to save trades to localStorage", error);
  }
};
