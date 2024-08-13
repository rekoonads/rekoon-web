import React, { useState } from 'react';
import ReactDOM from 'react-dom';

interface PopupProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (amount: number) => void;
}

const PaymentPopup: React.FC<PopupProps> = ({ open, onClose, onSubmit }) => {
  const [amount, setAmount] = useState<number>(0);
  const [error, setError] = useState<string>('');

  const handleSubmit = () => {
    if (amount > 500) {
      onSubmit(amount);
      onClose();
    } else {
      setError('Amount must be greater than 500');
    }
  };

  if (!open) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-bold mb-4">Enter Amount</h2>
        <input
          type="number"
          className="border p-2 w-full mb-4"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          placeholder="Enter amount"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded mr-2"
          onClick={handleSubmit}
        >
          Pay Now
        </button>
        <button
          className="bg-gray-500 text-white py-2 px-4 rounded"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>,
    document.body
  );
};

export default PaymentPopup;
