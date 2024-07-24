import React from 'react';

interface Option {
  value: string;
  label: string;
}

interface SelectGroupOneProps {
  label?: string;
  options?: Option[];
  selected?: string;
  onSelect?: (value: string) => void;
  className?: string;
}

const SelectGroupOne: React.FC<SelectGroupOneProps> = ({
  label,
  options = [], // Provide a default empty array for options
  selected, // Add selected to props
  onSelect,
  className = '',
}) => {
  return (
    <div className={`flex flex-col w-full ${className}`}>
      {label && (
        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
          {label}
        </label>
      )}
      <select
        value={selected} // Use selected as the value
        onChange={(e) => onSelect && onSelect(e.target.value)} // Safely call onSelect if it is provided
        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectGroupOne;
