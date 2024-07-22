import { useState } from 'react';

interface CheckboxOneProps {
  text?: string;
  onChange?: (text: string, isChecked: boolean) => void;
  className?: string; // Add className to the props
}

const CheckboxOne: React.FC<CheckboxOneProps> = ({
  text,
  onChange,
  className,
}) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const handleChange = () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);
    if (onChange) onChange(text || '', newCheckedState); // Notify parent about the change
  };

  return (
    <div className={`flex items-center ${className}`}>
      {' '}
      {/* Apply className here */}
      <label
        htmlFor={`checkboxLabel${text}`}
        className="flex cursor-pointer select-none items-center"
      >
        <div className="relative">
          <input
            type="checkbox"
            id={`checkboxLabel${text}`}
            className="sr-only"
            checked={isChecked}
            onChange={handleChange}
          />
          <div
            className={`mr-4 flex h-5 w-5 items-center justify-center rounded border ${
              isChecked ? 'border-primary bg-gray dark:bg-transparent' : ''
            }`}
          >
            <span
              className={`h-2.5 w-2.5 rounded-sm ${
                isChecked ? 'bg-primary' : ''
              }`}
            ></span>
          </div>
        </div>
        {text}
      </label>
    </div>
  );
};

export default CheckboxOne;
