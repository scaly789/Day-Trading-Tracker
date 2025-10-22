import React, { useState, useMemo, useRef, useLayoutEffect } from 'react';
import { ChartDataPoint } from './TrendsSection';

interface LineChartProps {
  data: ChartDataPoint[];
}

const formatCurrency = (amount: number) => {
    const sign = amount > 0 ? '+' : amount < 0 ? '-' : '';
    return `${sign}$${Math.abs(amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

const LineChart: React.FC<LineChartProps> = ({ data }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [hoveredPoint, setHoveredPoint] = useState<{ index: number; label: string; value: number } | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  useLayoutEffect(() => {
    if (containerRef.current) {
      const observer = new ResizeObserver(entries => {
        if (entries[0]) {
            const { width, height } = entries[0].contentRect;
            setDimensions({ width, height });
        }
      });
      observer.observe(containerRef.current);
      return () => observer.disconnect();
    }
  }, []);

  const { pathData, points } = useMemo(() => {
    const { width, height } = dimensions;
    if (data.length === 0 || width === 0 || height === 0) {
      return { pathData: '', points: [] };
    }
    
    const maxVal = Math.max(...data.map(d => Math.abs(d.value)));
    const maxAbsValue = maxVal === 0 ? 1 : maxVal;

    const getX = (index: number) => (index / (data.length > 1 ? data.length - 1 : 1)) * width;
    const getY = (value: number) => (height / 2) - (value / maxAbsValue) * (height / 2);

    const calculatedPoints = data.map((item, index) => ({
      x: getX(index),
      y: getY(item.value),
    }));

    const newPathData = calculatedPoints.map((p, i) => (i === 0 ? 'M' : 'L') + `${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(' ');

    return { pathData: newPathData, points: calculatedPoints };
  }, [data, dimensions]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setTooltipPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-grow w-full relative" ref={containerRef} onMouseMove={handleMouseMove}>
        {dimensions.width > 0 && (
          <svg width="100%" height="100%" viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}>
            <line x1="0" y1={dimensions.height / 2} x2={dimensions.width} y2={dimensions.height / 2} stroke="#e2e8f0" strokeWidth="2" />
            <path d={pathData} fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            {points.map((point, index) => (
              <circle 
                key={index}
                cx={point.x}
                cy={point.y}
                r="8"
                fill="transparent"
                className="cursor-pointer"
                onMouseEnter={() => setHoveredPoint({ ...data[index], index })}
                onMouseLeave={() => setHoveredPoint(null)}
              />
            ))}
            {hoveredPoint && (
                <circle
                    cx={points[hoveredPoint.index].x}
                    cy={points[hoveredPoint.index].y}
                    r="5"
                    fill="white"
                    stroke="#3b82f6"
                    strokeWidth="2"
                    style={{ pointerEvents: 'none' }}
                />
            )}
          </svg>
        )}
         {hoveredPoint && (
            <div 
                className="absolute bg-slate-700 text-white text-xs rounded-md shadow-lg p-2 z-10 pointer-events-none transform -translate-x-1/2 -translate-y-[120%]"
                style={{ left: tooltipPosition.x, top: tooltipPosition.y }}
            >
                <p className="font-bold whitespace-nowrap">{hoveredPoint.label}</p>
                <p className="whitespace-nowrap">{formatCurrency(hoveredPoint.value)}</p>
            </div>
        )}
      </div>
      <div className="w-full h-6 flex justify-around text-xs font-semibold text-slate-500 pt-1">
        {data.map((item, index) => (
          <div key={item.label + index} className="flex-1 text-center truncate">
            {data.length > 15 && index % 2 !== 0 ? '' : item.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LineChart;
