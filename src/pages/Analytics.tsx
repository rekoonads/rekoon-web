import { AnalyticsDashboard } from './Strategy/AnalyticsDashboard';

const AnalyticsPage = () => {
  const strategyId = 'your-strategy-id'; // You would typically get this from your app's state or URL params

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Strategy Analytics</h1>
      <AnalyticsDashboard strategyId={strategyId} />
    </div>
  );
};

export default AnalyticsPage;
