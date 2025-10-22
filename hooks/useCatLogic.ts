import { useMemo } from 'react';
import { Trades } from '../types';

export type CatMood = 'rich' | 'default' | 'sad' | 'verySad';

const PROFIT_THRESHOLD = 1000; // Threshold to be a "rich" cat
const SAD_THRESHOLD = -500; // Threshold to be a "sad" cat
const VERY_SAD_THRESHOLD = -2000; // Threshold to be a "very sad" cat

export const useCatLogic = (trades: Trades): CatMood => {
  const totalPnl = useMemo(() => {
    return Object.values(trades).reduce((sum, trade) => sum + trade.pnl, 0);
  }, [trades]);

  if (totalPnl > PROFIT_THRESHOLD) {
    return 'rich';
  }
  if (totalPnl <= VERY_SAD_THRESHOLD) {
    return 'verySad';
  }
  if (totalPnl <= SAD_THRESHOLD) {
    return 'sad';
  }
  return 'default';
};
