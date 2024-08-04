// DateBox.tsx
import React from 'react';

interface DateBoxProps {
  id: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const DateBox: React.FC<DateBoxProps> = ({ id, checked, onChange }) => (
  <input
    type="checkbox"
    id={id}
    checked={checked}
    onChange={onChange}
    className="form-checkbox"
  />
);

export default DateBox;
