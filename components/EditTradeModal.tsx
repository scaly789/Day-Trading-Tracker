import React, { useState, useEffect, useMemo, useRef } from 'react';
import { TradeData } from '../types';
import CloseIcon from './icons/CloseIcon';

interface EditTradeModalProps {
  date: Date;
  tradeData?: TradeData;
  onSave: (date: Date, trade: { input: number; output: number }) => void;
  onDelete: (date: Date) => void;
  onClose: () => void;
}

const EditTradeModal: React.FC<EditTradeModalProps> = ({ date, tradeData, onSave, onDelete, onClose }) => {
  const [input, setInput] = useState<string>(tradeData?.input.toString() ?? '');
  const [output, setOutput] = useState<string>(tradeData?.output.toString() ?? '');
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setInput(tradeData?.input.toString() ?? '');
    setOutput(tradeData?.output.toString() ?? '');
  }, [tradeData]);
  
  // Accessibility enhancements: Focus trapping and keyboard navigation
  useEffect(() => {
    const previouslyFocusedElement = document.activeElement as HTMLElement;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }

      if (event.key === 'Tab') {
        if (!modalRef.current) return;

        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey) { // Shift + Tab
          if (document.activeElement === firstElement) {
            lastElement.focus();
            event.preventDefault();
          }
        } else { // Tab
          if (document.activeElement === lastElement) {
            firstElement.focus();
            event.preventDefault();
          }
        }
      }
    };
    
    // Auto-focus the first input field for better UX
    const firstInput = modalRef.current?.querySelector('input');
    firstInput?.focus();

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      previouslyFocusedElement?.focus();
    };
  }, [onClose]);


  const pnl = useMemo(() => {
    const inputNum = parseFloat(input) || 0;
    const outputNum = parseFloat(output) || 0;
    return outputNum - inputNum;
  }, [input, output]);
  
  const formatCurrency = (amount: number) => {
    const sign = amount > 0 ? '+' : amount < 0 ? '-' : '';
    return `${sign}$${Math.abs(amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };
  
  const pnlColorClasses = pnl >= 0 ? 'text-green-600' : 'text-red-600';

  const handleSave = () => {
    const inputNum = parseFloat(input) || 0;
    const outputNum = parseFloat(output) || 0;
    if (inputNum > 0 || outputNum > 0) {
        onSave(date, { input: inputNum, output: outputNum });
    } else {
        onDelete(date); // If both are 0, treat it as a deletion
    }
  };

  const handleDelete = () => {
    onDelete(date);
  };

  const formattedDate = date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-trade-title"
        className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-6 sm:p-8 transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 id="edit-trade-title" className="text-2xl font-bold text-slate-800">Edit Trade</h2>
            <p className="text-slate-500">{formattedDate}</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200 transition-colors">
            <CloseIcon className="w-6 h-6 text-gray-500" />
          </button>
        </div>
        
        <div className="space-y-6 mt-6">
          <div>
            <label htmlFor="input" className="block text-sm font-semibold text-slate-700 mb-1">Input Amount ($)</label>
            <input 
              id="input"
              type="number"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g., 5000"
              className="w-full p-3 bg-white text-slate-800 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition placeholder:text-slate-400"
            />
          </div>
          <div>
            <label htmlFor="output" className="block text-sm font-semibold text-slate-700 mb-1">Output Amount ($)</label>
            <input 
              id="output"
              type="number"
              value={output}
              onChange={(e) => setOutput(e.target.value)}
              placeholder="e.g., 5150"
              className="w-full p-3 bg-white text-slate-800 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition placeholder:text-slate-400"
            />
          </div>
        </div>

        <div className="mt-8 text-center bg-gray-100 p-4 rounded-xl">
            <p className="text-sm font-semibold text-gray-600">Daily P/L</p>
            <p className={`text-3xl font-extrabold ${pnlColorClasses}`}>{formatCurrency(pnl)}</p>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          {tradeData && (
             <button
              onClick={handleDelete}
              className="w-full sm:w-auto flex-1 py-3 px-6 bg-red-100 text-red-700 font-bold rounded-xl hover:bg-red-200 transition outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
            >
              Clear Trade
            </button>
          )}
          <button
            onClick={handleSave}
            className="w-full sm:w-auto flex-1 py-3 px-6 bg-blue-500 text-white font-bold rounded-xl hover:bg-blue-600 transition outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTradeModal;