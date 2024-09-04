// DateSelectionComp.tsx

import React from 'react';

interface Option {
  value: string;
  label: string;
}

interface DateSelectionCompProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const DateSelectionComp: React.FC<DateSelectionCompProps> = ({ options, value, onChange, disabled = false }) => {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)} disabled={disabled} className='accent-blue-500 bg-yellow-100 dark:bg-yellow-100 font-semibold text-black'>
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default DateSelectionComp;
