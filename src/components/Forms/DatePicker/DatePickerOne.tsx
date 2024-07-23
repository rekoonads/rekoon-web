import { useEffect } from 'react';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/themes/material_green.css'; // Import your flatpickr theme

interface DatePickerOneProps {
  onDateSelect?: (date: Date | null) => void;
}

const DatePickerOne = ({ onDateSelect }: DatePickerOneProps) => {
  useEffect(() => {
    // Initialize flatpickr
    const picker = flatpickr('.form-datepicker', {
      mode: 'single',
      static: true,
      monthSelectorType: 'static',
      dateFormat: 'M j, Y',
      prevArrow:
        '<svg className="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M5.4 10.8l1.4-1.4-4-4 4-4L5.4 0 0 5.4z" /></svg>',
      nextArrow:
        '<svg className="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M1.4 10.8L0 9.4l4-4-4-4L1.4 0l5.4 5.4z" /></svg>',
      onChange: (selectedDates) => {
        onDateSelect?.(selectedDates[0] || null); // Handle date selection
      },
    });

    // Cleanup
    return () => {
      if (picker instanceof Array) {
        picker.forEach((p) => p.destroy());
      } else {
        picker.destroy(); // Correct typecasting
      }
    };
  }, [onDateSelect]);

  return (
    <div>
      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
        Date picker
      </label>
      <input
        type="text"
        className="form-datepicker w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
      />
    </div>
  );
};

export default DatePickerOne;
