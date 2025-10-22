import React, { useState, useMemo, useRef } from 'react';
import { ChartDataPoint } from './TrendsSection';

interface BarChartProps {
  data: ChartDataPoint[];
}

const formatCurrency = (amount: number) => {
    const sign = amount > 0 ? '+' : amount < 0 ? '-' : '';
    return `${sign}$${Math.abs(amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

const formatYAxisLabel = (amount: number): string => {
    if (Math.abs(amount) < 0.01) return '$0';
    const sign = amount >= 0 ? '+' : '-';
    const absAmount = Math.abs(amount);
    if (absAmount >= 1000000) return `${sign}$${(absAmount / 1000000).toFixed(1)}M`;
    if (absAmount >= 1000) return `${sign}$${(absAmount / 1000).toFixed(1)}k`;
    return `${sign}$${Math.round(absAmount)}`;
};


const BarChart: React.FC<BarChartProps> = ({ data }) => {
  const [hoveredBar, setHoveredBar] = useState<{ index: number; label: string; value: number } | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const chartRef = useRef<HTMLDivElement>(null);

  const maxAbsValue = useMemo(() => {
    if (data.length === 0) return 1;
    const max = Math.max(...data.map(d => Math.abs(d.value)));
    return max === 0 ? 1 : max;
  }, [data]);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (chartRef.current) {
        const rect = chartRef.current.getBoundingClientRect();
        setTooltipPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }
  };

  return (
    <div className="w-full h-full flex">
        {/* Y Axis Labels */}
        <div className="w-14 h-full relative text-xs text-slate-500 text-right pr-2">
            <div className="absolute top-0">{formatYAxisLabel(maxAbsValue)}</div>
            <div className="absolute top-1/4 transform -translate-y-1/2">{formatYAxisLabel(maxAbsValue / 2)}</div>
            <div className="absolute top-1/2 transform -translate-y-1/2">{formatYAxisLabel(0)}</div>
            <div className="absolute top-3/4 transform -translate-y-1/2">{formatYAxisLabel(-maxAbsValue / 2)}</div>
            <div className="absolute bottom-0">{formatYAxisLabel(-maxAbsValue)}</div>
        </div>

        {/* Main Chart Content */}
        <div className="flex-1 h-full flex flex-col">
            {/* Chart Area */}
            <div className="flex-grow w-full relative" ref={chartRef} onMouseMove={handleMouseMove}>
                <div className="absolute top-1/2 left-0 w-full h-px bg-slate-200 z-0"></div>
                <div className="w-full h-full flex justify-around items-center gap-1">
                {data.map((item, index) => (
                    <div
                        key={item.label + index}
                        className="flex-1 h-full flex flex-col group"
                        onMouseEnter={() => setHoveredBar({ ...item, index })}
                        onMouseLeave={() => setHoveredBar(null)}
                    >
                        <div className="h-1/2 w-full flex flex-col justify-end items-center">
                            {/* Positive Bar */}
                            {item.value >= 0 && (
                                <div
                                    className="w-3/4 max-w-4 rounded-t-md bg-green-400 transition-all duration-300 ease-in-out group-hover:opacity-80"
                                    style={{ height: `${(item.value / maxAbsValue) * 100}%` }}
                                ></div>
                            )}
                        </div>
                        <div className="h-1/2 w-full flex flex-col justify-start items-center">
                            {/* Negative Bar */}
                            {item.value < 0 && (
                                <div
                                    className="w-3/4 max-w-4 rounded-b-md bg-red-400 transition-all duration-300 ease-in-out group-hover:opacity-80"
                                    style={{ height: `${(Math.abs(item.value) / maxAbsValue) * 100}%` }}
                                ></div>
                            )}
                        </div>
                    </div>
                ))}
                </div>
                {hoveredBar && (
                    <div 
                        className="absolute bg-slate-700 text-white text-xs rounded-md shadow-lg p-2 z-10 pointer-events-none transform -translate-x-1/2 -translate-y-[120%]"
                        style={{ left: tooltipPosition.x, top: tooltipPosition.y }}
                    >
                        <p className="font-bold whitespace-nowrap">{hoveredBar.label}</p>
                        <p className="whitespace-nowrap">{formatCurrency(hoveredBar.value)}</p>
                    </div>
                )}
            </div>
            
            {/* X Axis Labels */}
            <div className="w-full h-6 flex justify-around text-xs font-semibold text-slate-500 pt-1">
                {data.map((item, index) => (
                    <div key={item.label + index} className="flex-1 text-center truncate">
                        {data.length > 15 && index % 2 !== 0 ? '' : item.label}
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
};

export default BarChart;