import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '../components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../components/ui/tabs';
import {
  MoreHorizontal,
  Clock,
  PlusCircle,
  ArrowLeft,
  DollarSign,
  Eye,
  Target,
  BarChart,
} from 'lucide-react';
import axios from 'axios';
import { useAuth, useUser } from '@clerk/clerk-react';
import Cookies from 'js-cookie';

const domainName = import.meta.env.VITE_DOMAIN;

interface Campaign {
  id: string;
  campaignName: string;
  startDate: string;
  endDate: string;
  campaignBudget: number;
  status: 'draft' | 'active' | 'completed';
  spend?: number;
  impressions?: number;
  costPerView?: number;
}

export default function ManageCampaign() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [draftCampaign, setDraftCampaign] = useState<Campaign | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { orgId } = useAuth();
  const { user } = useUser();

  useEffect(() => {
    const fetchCampaigns = async () => {
      setIsLoading(true);
      try {
        // Fetch draft campaign
        const campaignId = Cookies.get('campaignId');
        if (campaignId) {
          const draftResponse = await axios.get(
            `${domainName}/api/get-campaign?campaignId=${campaignId}`,
          );
          setDraftCampaign(draftResponse.data);
        }

        // Fetch all campaigns
        const response = await axios.get(
          `${domainName}/api/campaigns-${
            user?.publicMetadata?.type_of_user === 'Agency'
              ? 'agency'
              : 'advertiser'
          }/${user?.id || orgId}`,
        );
        setCampaigns(response.data);
      } catch (error) {
        console.error('Error fetching campaigns:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCampaigns();
  }, [user?.id, orgId, user?.publicMetadata?.type_of_user]);

  const CampaignCard = ({
    campaign,
    isDraft = false,
  }: {
    campaign: Campaign;
    isDraft?: boolean;
  }) => (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-bold">
            {campaign.campaignName}
          </CardTitle>
          <Button variant="ghost" size="icon" className="text-white">
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">More options</span>
          </Button>
        </div>
        <CardDescription className="text-blue-100">
          <Clock className="w-4 h-4 inline mr-1" />
          {campaign.startDate} - {campaign.endDate}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center">
            <DollarSign className="w-5 h-5 mr-2 text-green-500" />
            <div>
              <p className="text-sm text-gray-500">Daily Budget</p>
              <p className="font-semibold">₹{campaign.campaignBudget}</p>
            </div>
          </div>
          <div className="flex items-center">
            <Target className="w-5 h-5 mr-2 text-purple-500" />
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <p className="font-semibold capitalize">
                {isDraft ? 'Draft' : campaign.status}
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <Eye className="w-5 h-5 mr-2 text-blue-500" />
            <div>
              <p className="text-sm text-gray-500">Impressions</p>
              <p className="font-semibold">
                {campaign.impressions?.toLocaleString() || '-'}
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <BarChart className="w-5 h-5 mr-2 text-orange-500" />
            <div>
              <p className="text-sm text-gray-500">Cost Per View</p>
              <p className="font-semibold">
                ₹{campaign.costPerView?.toFixed(2) || '-'}
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="outline">View Reports</Button>
          {(isDraft || campaign.status === 'draft') && (
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Continue Editing
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Manage Campaigns
            </h1>
            <p className="text-gray-600 mt-1">
              Create and manage your advertising campaigns across channels.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
            <Button
              variant="outline"
              className="flex items-center justify-center w-full sm:w-auto"
              asChild
            >
              <Link to="/manage-advertise">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
              </Link>
            </Button>
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center w-full sm:w-auto"
              asChild
            >
              <Link to="/campaign">
                <PlusCircle className="mr-2 h-4 w-4" /> Create Campaign
              </Link>
            </Button>
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading campaigns...</p>
          </div>
        ) : (
          <>
            {draftCampaign && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Campaign Draft</h2>
                <CampaignCard campaign={draftCampaign} isDraft={true} />
              </div>
            )}

            <h2 className="text-xl font-semibold mb-4">
              All Campaigns ({campaigns.length})
            </h2>
            {campaigns.length > 0 ? (
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="mb-4">
                  <TabsTrigger value="all">All Campaigns</TabsTrigger>
                  <TabsTrigger value="active">Active</TabsTrigger>
                  <TabsTrigger value="draft">Drafts</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                </TabsList>
                <TabsContent value="all">
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {campaigns.map((campaign) => (
                      <CampaignCard key={campaign.id} campaign={campaign} />
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="active">
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {campaigns
                      .filter((c) => c.status === 'active')
                      .map((campaign) => (
                        <CampaignCard key={campaign.id} campaign={campaign} />
                      ))}
                  </div>
                </TabsContent>
                <TabsContent value="draft">
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {campaigns
                      .filter((c) => c.status === 'draft')
                      .map((campaign) => (
                        <CampaignCard key={campaign.id} campaign={campaign} />
                      ))}
                  </div>
                </TabsContent>
                <TabsContent value="completed">
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {campaigns
                      .filter((c) => c.status === 'completed')
                      .map((campaign) => (
                        <CampaignCard key={campaign.id} campaign={campaign} />
                      ))}
                  </div>
                </TabsContent>
              </Tabs>
            ) : (
              <Card className="text-center py-10">
                <CardContent>
                  <p className="mb-4 text-gray-600">
                    You haven't created any campaigns yet.
                  </p>
                  <Button
                    asChild
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Link to="/campaign">Create Your First Campaign</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>
    </div>
  );
}
