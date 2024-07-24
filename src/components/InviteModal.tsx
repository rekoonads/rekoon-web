import React, { useState } from 'react';
import SelectGroupOne from './Forms/SelectGroup/SelectGroupOne';
import { Button } from './ui/button';

interface InviteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const InviteModal: React.FC<InviteModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState<string>('');
  const [role, setRole] = useState<string>('');

  const handleInvite = () => {
    // Handle invite logic
    console.log(`Inviting ${email} as ${role}`);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 backdrop-blur-sm z-50">
      <div
        className={`bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl relative transition-transform transform ${
          isOpen ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
        }`}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
        >
          &times;
        </button>
        <div className="mb-4">
          <h2 className="text-lg font-bold">Invite a Member</h2>
        </div>
        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-300 rounded"
            />
          </div>
          <div className="flex-1">
            <SelectGroupOne
              label="Select Role"
              options={[
                { value: 'admin', label: 'Admin' },
                { value: 'member', label: 'Member' },
              ]}
              onSelect={(selected) => setRole(selected)}
            />
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button onClick={onClose} className="bg-red-500 text-white">
            Cancel
          </Button>
          <Button onClick={handleInvite} className="bg-blue-500 text-white">
            Invite
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InviteModal;
