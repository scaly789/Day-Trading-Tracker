import React, { useState, useMemo } from 'react';
import { Trades } from '../types';
import ToggleSwitch from './ToggleSwitch';
import BarChart from './BarChart';
import LineChart from './LineChart';
import TrendsCatIcon from './icons/TrendsCatIcon';

interface TrendsSectionProps {
  trades: Trades;
  currentDate: Date;
}

export type ChartDataPoint = {
  label: string;
  value: number;
};

const formatDateToKey = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const TrendsSection: React.FC<TrendsSectionProps> = ({ trades, currentDate }) => {
  const [view, setView] = useState<'monthly' | 'yearly'>('monthly');
  const [chartType, setChartType] = useState<'bar' | 'line'>('bar');

  const chartData: ChartDataPoint[] = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    if (view === 'monthly') {
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const monthlyData: ChartDataPoint[] = [];
      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        const dateKey = formatDateToKey(date);
        monthlyData.push({
          label: day.toString(),
          value: trades[dateKey]?.pnl ?? 0,
        });
      }
      return monthlyData;
    } else { // yearly view
      const yearlyData: ChartDataPoint[] = [];
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      for (let i = 0; i < 12; i++) {
        const monthlyTotal = Object.keys(trades)
          .filter(dateKey => {
            const [tradeYear, tradeMonth] = dateKey.split('-').map(Number);
            return tradeYear === year && tradeMonth - 1 === i;
          })
          .reduce((sum, dateKey) => sum + trades[dateKey].pnl, 0);
        
        yearlyData.push({
          label: monthNames[i],
          value: monthlyTotal,
        });
      }
      return yearlyData;
    }
  }, [trades, currentDate, view]);

  return (
    <section className="mt-8 bg-white p-4 sm:p-6 rounded-3xl shadow-lg trends-section">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
        <div className="flex items-center gap-3">
          <TrendsCatIcon className="w-12 h-12" />
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">P/L Trends</h2>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <ToggleSwitch
              options={[
                { label: 'Bar', value: 'bar' },
                { label: 'Line', value: 'line' },
              ]}
              selected={chartType}
              onChange={(value) => setChartType(value as 'bar' | 'line')}
            />
            <ToggleSwitch
              options={[
                { label: 'Monthly', value: 'monthly' },
                { label: 'Yearly', value: 'yearly' },
              ]}
              selected={view}
              onChange={(value) => setView(value as 'monthly' | 'yearly')}
            />
        </div>
      </div>
      <div className="h-72 w-full">
        {chartType === 'bar' 
          ? <BarChart data={chartData} /> 
          : <LineChart data={chartData} />
        }
      </div>
    </section>
  );
};

export default TrendsSection;