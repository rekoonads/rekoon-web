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
}

const DateSelectionComp: React.FC<DateSelectionCompProps> = ({ options, value, onChange }) => {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default DateSelectionComp;
