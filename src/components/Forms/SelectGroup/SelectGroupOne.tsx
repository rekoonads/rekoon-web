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
  options = [
    { value: '', label: 'Select Options' },
    { value: 'One time per day', label: 'One time per day' },
    { value: 'Maximum Three times per day', label: 'Maximum Three times per day' },
    { value: 'Maximum Five times per day', label: 'Maximum Five times per day' },
    { value: 'Maximum Seven times per day', label: 'Maximum Seven times per day' },
    { value: 'Maximum Ten times per day', label: 'Maximum Ten times per day' },
  ],
  selected,
  onSelect,
  className = '',
}) => {
  return (
    <div className={`flex flex-col w-full ${className}`}>
      {label && (
        <label className="mb-3 block text-blue-900 text-sm dark:text-white font-semibold">
          {label}
        </label>
      )}
      <select
        value={selected}
        onChange={(e) => onSelect && onSelect(e.target.value)}
        className="w-full rounded-lg text-blue-900 border-[1.5px] border-stroke bg-transparent py-3 px-5  outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} className='px-4'>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectGroupOne;

