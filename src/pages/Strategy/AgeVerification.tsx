import { useState } from 'react';

interface AgeVerificationProps {
  targetedAgeGroups: string[];
  onVerification: (isInTargetGroup: boolean) => void;
}

export const AgeVerification: React.FC<AgeVerificationProps> = ({
  targetedAgeGroups,
  onVerification,
}) => {
  const [birthYear, setBirthYear] = useState<string>('');

  const verifyAge = () => {
    const currentYear = new Date().getFullYear();
    const age = currentYear - parseInt(birthYear, 10);

    const isInTargetGroup = targetedAgeGroups.some((group) => {
      const [min, max] = group.split('-').map(Number);
      return age >= min && (max ? age <= max : true);
    });

    onVerification(isInTargetGroup);
  };

  return (
    <div className="p-4 border rounded-md">
      <h3 className="text-lg font-semibold mb-2">Age Verification</h3>
      <input
        type="number"
        placeholder="Enter birth year"
        className="border p-2 rounded-md mr-2"
        value={birthYear}
        onChange={(e) => setBirthYear(e.target.value)}
      />
      <button
        onClick={verifyAge}
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Verify
      </button>
    </div>
  );
};
