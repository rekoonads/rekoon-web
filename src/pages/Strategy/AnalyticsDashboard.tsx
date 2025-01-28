import { useState, useEffect } from 'react';
import axios from 'axios';

interface AgeGroupAnalytics {
  _id: string;
  totalImpressions: number;
  targetGroupImpressions: number;
}

interface AnalyticsDashboardProps {
  strategyId: string;
}

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({
  strategyId,
}) => {
  const [analytics, setAnalytics] = useState<AgeGroupAnalytics[]>([]);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await axios.get(
          `/api/age-group-analytics?strategyId=${strategyId}`,
        );
        setAnalytics(response.data);
      } catch (error) {
        console.error('Error fetching analytics:', error);
      }
    };

    fetchAnalytics();
    // Set up an interval to fetch analytics every 5 minutes
    const intervalId = setInterval(fetchAnalytics, 5 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, [strategyId]);

  return (
    <div className="p-4 border rounded-md">
      <h2 className="text-xl font-semibold mb-4">Age Group Analytics</h2>
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left">Age Group</th>
            <th className="text-left">Total Impressions</th>
            <th className="text-left">Target Group Impressions</th>
            <th className="text-left">Accuracy</th>
          </tr>
        </thead>
        <tbody>
          {analytics.map((item) => (
            <tr key={item._id}>
              <td>{item._id}</td>
              <td>{item.totalImpressions}</td>
              <td>{item.targetGroupImpressions}</td>
              <td>
                {(
                  (item.targetGroupImpressions / item.totalImpressions) *
                  100
                ).toFixed(2)}
                %
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
