import React from 'react';

interface ToggleOption {
  label: string;
  value: string;
}

interface ToggleSwitchProps<T extends string> {
  options: { label: string; value: T }[];
  selected: T;
  onChange: (value: T) => void;
}

const ToggleSwitch = <T extends string>({ options, selected, onChange }: ToggleSwitchProps<T>) => {
  return (
    <div className="flex items-center bg-slate-100 rounded-full p-1">
      {options.map(({ label, value }) => (
        <button
          key={value}
          onClick={() => onChange(value)}
          className={`px-4 py-1.5 text-sm font-semibold rounded-full transition-colors duration-300 ease-in-out
            ${selected === value ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default ToggleSwitch;
