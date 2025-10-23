import React from 'react';
import { Trades } from '../../types';
import { useCatLogic, CatMood } from '../../hooks/useCatLogic';
import { RichCat, DefaultCat, SadCat, VerySadCat } from './catDesigns';
import Cat from './Cat';

interface CatContainerProps {
  trades: Trades;
  currentDate: Date;
}

const catConfig: { [key in CatMood]: { Component: React.FC<React.SVGProps<SVGSVGElement>>, message: string, subMessage: string } } = {
  rich: {
    Component: RichCat,
    message: "Excellent Gains!",
    subMessage: "Your monthly return is looking great."
  },
  default: {
    Component: DefaultCat,
    message: "Awaiting market moves.",
    subMessage: "Keep an eye on your monthly performance."
  },
  sad: {
    Component: SadCat,
    message: "A slight downturn...",
    subMessage: "Your monthly return is in the red."
  },
  verySad: {
    Component: VerySadCat,
    message: "Tough Month.",
    subMessage: "Stay disciplined. The cat's rooting for you."
  }
};

const CatContainer: React.FC<CatContainerProps> = ({ trades, currentDate }) => {
  const catMood = useCatLogic(trades, currentDate);
  const { Component, message, subMessage } = catConfig[catMood];

  return (
    <section className="mt-8 bg-white p-4 sm:p-6 rounded-3xl shadow-lg flex flex-col sm:flex-row items-center justify-center gap-6 text-center sm:text-left">
      <div className="relative transform transition-transform duration-500 hover:scale-110">
        <Cat CatComponent={Component} />
      </div>
      <div>
        <h3 className="text-2xl font-bold text-slate-800">{message}</h3>
        <p className="text-slate-500 mt-1">{subMessage}</p>
      </div>
    </section>
  );
};

export default CatContainer;
