import React from 'react';

interface DateBoxProps {
  id: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

const DateBox: React.FC<DateBoxProps> = ({ id, checked, onChange, disabled = false }) => (
  <input
    type="checkbox"
    id={id}
    checked={checked}
    onChange={onChange}
    className="form-checkbox "
    disabled={disabled}
  />
);

export default DateBox;
