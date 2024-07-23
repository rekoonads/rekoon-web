import { useState } from 'react';
import { FaInfoCircle, FaPlay } from 'react-icons/fa';
import { HiOutlineComputerDesktop } from 'react-icons/hi2';
import { IoMdRefreshCircle } from 'react-icons/io';
import { LuAirplay, LuRadioReceiver, LuSmartphone } from 'react-icons/lu';
import { Card, CardContent } from '../components/ui/card';

// Define a type for the campaign goal
interface Goal {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
}

const goals: Goal[] = [
  {
    id: 'awareness',
    icon: LuRadioReceiver,
    title: 'Build awareness',
    description: 'I want to reach as many different viewers as possible.',
  },
  {
    id: 'traffic',
    icon: HiOutlineComputerDesktop,
    title: 'Website traffic',
    description: 'I want TV audiences to visit my website.',
  },
  {
    id: 'retargeting',
    icon: IoMdRefreshCircle,
    title: 'Website retargeting',
    description: 'I want to convert my website visitors.',
  },
  {
    id: 'revenue',
    icon: LuSmartphone,
    title: 'Drive app revenue',
    description: 'I want TV viewers to download my app.',
  },
];

interface CampaignGoalSelectorProps {
  onSelect: (goalId: string) => void;
}

export default function CampaignGoalSelector({
  onSelect,
}: CampaignGoalSelectorProps) {
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);

  const handleSelect = (goalId: string) => {
    setSelectedGoal(goalId);
    onSelect(goalId); // Notify parent component
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center space-x-2">
        <FaPlay className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold">Campaign Goal</h2>
        <FaInfoCircle className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {goals.map((goal) => (
          <Card
            key={goal.id}
            className={`border-2 ${
              selectedGoal === goal.id ? 'border-primary' : 'border-gray-300'
            }`}
            onClick={() => handleSelect(goal.id)}
          >
            <CardContent className="space-y-2 mt-2">
              <div className="flex items-center space-x-2">
                <goal.icon
                  className={`h-5 w-5 ${
                    selectedGoal === goal.id
                      ? 'text-primary'
                      : 'text-muted-foreground'
                  }`}
                />
              </div>
              <h3 className="text-base font-semibold">{goal.title}</h3>
              <p className="text-sm text-muted-foreground">
                {goal.description}
              </p>
              <a href="#" className="text-sm font-medium text-primary">
                Learn more
              </a>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
