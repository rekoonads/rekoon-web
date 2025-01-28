import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { useUser } from '@clerk/clerk-react';
import PublishersLayout from '../layout/PublishersLayout';
import { AddWebsiteModal } from '../components/AddWebsiteModal';
import axios from 'axios';
import { useToast } from '../components/ui/use-toast';

interface Website {
  _id: string;
  name: string;
  url: string;
  status: string;
  publisherId: string;
}

export default function PublishersDashboard() {
  const navigate = useNavigate();
  const { user } = useUser();
  const { toast } = useToast();
  const [isAddWebsiteModalOpen, setIsAddWebsiteModalOpen] = useState(false);
  const [websites, setWebsites] = useState<Website[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWebsites = async () => {
    setIsLoading(true);
    try {
      console.log('Fetching websites for user:', user?.id);
      const response = await axios.get(
        `http://localhost:3001/api/publishers/${user?.id}/websites`,
      );
      console.log('Fetched websites:', response.data);
      setWebsites(response.data);
    } catch (err) {
      console.error('Error fetching websites:', err);
      setError('Failed to fetch websites');
      toast({
        title: 'Error',
        description: 'Failed to fetch websites. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const createOrFetchPublisher = async () => {
    try {
      console.log('Creating or fetching publisher for user:', user?.id);
      const response = await axios.post(
        `http://localhost:3001/api/add-publisher`,
        {
          publisherId: user?.id,
          publisherName: `${user?.firstName} ${user?.lastName}`,
          email: user?.primaryEmailAddress?.emailAddress,
        },
      );
      console.log('Publisher created or fetched:', response.data);
    } catch (err) {
      console.error('Error creating or fetching publisher:', err);
      setError('Failed to initialize publisher account');
      toast({
        title: 'Error',
        description:
          'Failed to initialize publisher account. Please try again.',
        variant: 'destructive',
      });
    }
  };

  useEffect(() => {
    if (user?.id) {
      createOrFetchPublisher().then(() => fetchWebsites());
    }
  }, [user?.id]);

  const handleAddWebsite = async (websiteData: {
    name: string;
    url: string;
  }) => {
    try {
      console.log('Adding website for user:', user?.id);
      const response = await axios.post(
        `http://localhost:3001/api/publishers/${user?.id}/websites`,
        {
          name: websiteData.name,
          url: websiteData.url,
          publisherId: user?.id,
        },
      );
      console.log('Website added:', response.data);
      setWebsites([...websites, response.data]);
      setIsAddWebsiteModalOpen(false);
      toast({
        title: 'Success',
        description: 'Website added successfully.',
      });
    } catch (err) {
      console.error('Error adding website:', err);
      setError('Failed to add website');
      toast({
        title: 'Error',
        description: 'Failed to add website. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <PublishersLayout>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-2">
          <div className="bg-white p-4 rounded shadow mt-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Analytics</h2>
            </div>
            <p className="text-gray-600 mb-4">
              View and analyze your content performance and ad revenue
            </p>
            <div className="flex gap-4">
              <Button
                className="bg-blue-600 text-white"
                onClick={() => navigate('/analytics-dashboard')}
              >
                View Analytics
              </Button>
              <Button variant="outline">Generate Report</Button>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="bg-white p-4 rounded shadow">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Account Overview</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Publisher Name:</span>
                  <span>
                    {user?.firstName} {user?.lastName}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Email:</span>
                  <span>{user?.primaryEmailAddress?.emailAddress}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold mb-4">Website Details</h3>
            {isLoading ? (
              <p>Loading websites...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              websites.map((site) => (
                <div key={site._id} className="mb-4 p-3 border rounded">
                  <h4 className="font-medium">{site.name}</h4>
                  <p className="text-sm text-gray-600">{site.url}</p>
                  <p className="text-sm mt-2">
                    Status:{' '}
                    <span
                      className={
                        site.status === 'Active'
                          ? 'text-green-600'
                          : 'text-yellow-600'
                      }
                    >
                      {site.status}
                    </span>
                  </p>
                </div>
              ))
            )}
            <Button
              className="w-full mt-2 text-white"
              onClick={() => setIsAddWebsiteModalOpen(true)}
            >
              Add New Website
            </Button>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold">Ad Placement</h3>
            <div className="bg-yellow-100 p-4 rounded mt-2">
              <p className="text-yellow-600">
                Optimize your ad placements to increase your revenue.
                <a href="#" className="text-blue-600 ml-1">
                  Learn More
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <AddWebsiteModal
        isOpen={isAddWebsiteModalOpen}
        onClose={() => setIsAddWebsiteModalOpen(false)}
        onSubmit={handleAddWebsite}
      />
    </PublishersLayout>
  );
}
