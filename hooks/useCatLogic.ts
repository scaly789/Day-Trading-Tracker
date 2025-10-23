import { useMemo } from 'react';
import { Trades } from '../types';

export type CatMood = 'rich' | 'default' | 'sad' | 'verySad';

// New thresholds are based on the monthly percentage return on input.
const PROFIT_THRESHOLD = 20;   // > 20% return
const SAD_THRESHOLD = -5;      // <= -5% return
const VERY_SAD_THRESHOLD = -50; // <= -50% return

export const useCatLogic = (trades: Trades, currentDate: Date): CatMood => {
  const percentageChange = useMemo(() => {
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const monthlyTrades = Object.entries(trades).filter(([dateKey]) => {
      const [year, month] = dateKey.split('-').map(Number);
      return year === currentYear && month - 1 === currentMonth;
    });

    if (monthlyTrades.length === 0) {
      return 0;
    }

    const monthlyInput = monthlyTrades.reduce((sum, [, trade]) => sum + trade.input, 0);
    const monthlyPnl = monthlyTrades.reduce((sum, [, trade]) => sum + trade.pnl, 0);

    if (monthlyInput === 0) {
      // If there's PNL but no input (e.g. from a free trade or bonus), any gain is infinite profit.
      // We can treat positive pnl as a win.
      if (monthlyPnl > 0) return PROFIT_THRESHOLD + 1;
      return 0;
    }

    return (monthlyPnl / monthlyInput) * 100;
  }, [trades, currentDate]);

  if (percentageChange > PROFIT_THRESHOLD) {
    return 'rich';
  }
  if (percentageChange <= VERY_SAD_THRESHOLD) {
    return 'verySad';
  }
  if (percentageChange <= SAD_THRESHOLD) {
    return 'sad';
  }
  return 'default';
};
