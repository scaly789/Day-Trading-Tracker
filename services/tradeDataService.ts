import { TradeData, Trades } from '../types';

const STORAGE_KEY = 'dayTradingTrackerData';

const getInitialData = (): Trades => {
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const formatKey = (d: Date) => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return {
    [formatKey(yesterday)]: { input: 1000, output: 950, pnl: -50 },
    [formatKey(today)]: { input: 5000, output: 5250, pnl: 250 },
  };
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
