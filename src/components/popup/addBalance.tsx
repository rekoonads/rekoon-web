import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { CiMoneyBill } from 'react-icons/ci';

interface PopupProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (amount: number) => void;
}

const PaymentPopup: React.FC<PopupProps> = ({ open, onClose, onSubmit }) => {
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);
  const [error, setError] = useState<string>('');
  console.log(open)
  const handlePlanSelect = (amount: number) => {
    setSelectedPlan(amount);
    setError(''); // Clear any existing error when a plan is selected
  };

  const handleSubmit = () => {
    if (selectedPlan && selectedPlan > 500) {
      onSubmit(selectedPlan);
      onClose();
    } else {
      setError(
        'Please select a plan and ensure the amount is greater than ₹500',
      );
    }
  };

  if (!open) return null;

  return ReactDOM.createPortal(
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>Choose Your Plan</DialogTitle>
          <DialogDescription>
            Select the plan that best fits your needs.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {[
            { amount: 5000, label: 'Starter' },
            { amount: 10000, label: 'Pro' },
            { amount: 20000, label: 'Enterprise' },
          ].map((plan) => (
            <div
              key={plan.amount}
              className={`flex items-center justify-between rounded-md border p-4 cursor-pointer ${
                selectedPlan === plan.amount
                  ? 'border-primary border-2 bg-muted'
                  : 'border-muted bg-background hover:bg-muted'
              }`}
              onClick={() => handlePlanSelect(plan.amount)}
            >
              <div>
                <p className="text-2xl font-medium">₹{plan.amount}</p>
                <p className="text-sm text-muted-foreground">{plan.label}</p>
              </div>
              <CiMoneyBill className="h-8 w-8 text-primary" />
            </div>
          ))}
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="text-white">
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>,
    document.body,
  );
};

export default PaymentPopup;
