import { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignInPage from './auth/sign-in';
import SignUpPage from './auth/sign-up';
import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/ECommerce';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import DefaultLayout from './layout/DefaultLayout';
import SettingLayout from './layout/SettingLayout';
import Home from './pages/Home';
import { useUser } from '@clerk/clerk-react';
import Campaigns from './pages/Campaign';
import Summary from './pages/Summary';
import Strategy from './pages/Strategy';
import LoginWays from './pages/LoginWays';
import AdvertiseManagement from './pages/AdvertiseManagement';
import General from './pages/Settings/General';
import ReportPage from './pages/ReportPage';
import Members from './pages/Settings/Members';
import Advertisers from './pages/Settings/Advertisers';
import Balance from './pages/Settings/Balance';
import PaymentMethods from './pages/Settings/PaymentMethods';
import Invoices from './pages/Settings/Invoices';
import Receipts from './pages/Settings/Receipts';
import Coupons from './pages/Settings/Coupons';
import WebTracking from './pages/Settings/WebTracking';
import AppTracking from './pages/Settings/AppTracking';
import CorporateAds from './pages/CorporateAds';
import NewHome from './pages/NewHome';
import ManageCampaign from './pages/ManageCampaigns';
import ThankYouPage from './pages/ThankYouPage';
import AdminDashboard from './pages/AdminDashboard';
import { useGoogleAnalytics } from './hooks/useGoogleAnalytics';
import YouTubeAdPublisherPage from './pages/youtube-ad-publisher';
import IPTrack from './pages/IPTrack';
import PrivacyPolicy from './pages/Privacy';
import DeviceAtlasInfo from './pages/DeviceAtlas';
import AnalyticsPage from './pages/Analytics';
import PublishersDashboard from './pages/PublishersDashboard';
import AnalyticsDashboard from './components/PublishersAnalyticsDashboard';

function App() {
  const [loading, setLoading] = useState(true);
  const { pathname } = useLocation();
  const { user, isLoaded, isSignedIn } = useUser();
  const navigate = useNavigate();
  console.log(user);

  useGoogleAnalytics();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      console.log('User metadata:', user.publicMetadata);
      const hasAgency = user.publicMetadata?.hasAgency;
      const isPublisher = user.publicMetadata?.isPublisher;
      if (pathname === '/') {
        if (isPublisher) {
          navigate('/publishers-dashboard');
        } else if (!hasAgency) {
          navigate('/manage-advertise');
        } else {
          navigate('/login-options');
        }
      }
    }
  }, [isLoaded, isSignedIn, pathname, navigate, user]);

  if (loading) {
    return <Loader />;
  }

  return (
    <Routes>
      <Route path="/" element={<NewHome />} />
      <Route path="/login-options" element={<LoginWays />} />
      <Route path="/manage-advertise" element={<AdvertiseManagement />} />
      <Route path="/publishers-dashboard" element={<PublishersDashboard />} />
      <Route path="/analytics-dashboard" element={<AnalyticsDashboard />} />
      <Route path="/manage-campaign" element={<ManageCampaign />} />
      <Route path="/report" element={<ReportPage />} />
      <Route path="/auth/sign-in" element={<SignInPage />} />
      <Route path="/auth/sign-up" element={<SignUpPage />} />
      <Route path="/dv360-integration" element={<YouTubeAdPublisherPage />} />
      <Route path="/analytics" element={<AnalyticsPage />} />
      <Route path="/iptrack" element={<IPTrack />} />
      <Route path="/device-atlas" element={<DeviceAtlasInfo />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route
        path="view-advertisement"
        element={
          <>
            <PageTitle title="Viewing Advertisement | Sweven" />
            <CorporateAds />
          </>
        }
      />
      <Route
        path="admin-dashboard"
        element={
          <>
            <PageTitle title="Admin Dashboard | Sweven" />
            <AdminDashboard />
          </>
        }
      />
      <Route
        path="thank-you"
        element={
          <>
            <PageTitle title="Thank you | Sweven" />
            <ThankYouPage />
          </>
        }
      />
      {isSignedIn ? (
        <>
          <Route path="/" element={<DefaultLayout />}>
            <Route
              path="dashboard"
              element={
                <>
                  <PageTitle title="Dashboard | Sweven" />
                  <ECommerce />
                </>
              }
            />
            <Route
              path="campaign"
              element={
                <>
                  <PageTitle title="Campaign | Sweven" />
                  <Campaigns />
                </>
              }
            />
            <Route
              path="strategy"
              element={
                <>
                  <PageTitle title="Strategy | Sweven" />
                  <Strategy />
                </>
              }
            />
            <Route
              path="summary"
              element={
                <>
                  <PageTitle title="Summary | Sweven" />
                  <Summary />
                </>
              }
            />
            <Route
              path="forms/form-elements"
              element={
                <>
                  <PageTitle title="Form Elements | Sweven" />
                  <FormElements />
                </>
              }
            />
            <Route
              path="forms/form-layout"
              element={
                <>
                  <PageTitle title="Form Layout | Sweven" />
                  <FormLayout />
                </>
              }
            />
            <Route
              path="tables"
              element={
                <>
                  <PageTitle title="Tables | Sweven" />
                  <Tables />
                </>
              }
            />
            <Route
              path="chart"
              element={
                <>
                  <PageTitle title="Basic Chart | Sweven" />
                  <Chart />
                </>
              }
            />
            <Route
              path="ui/alerts"
              element={
                <>
                  <PageTitle title="Alerts | Sweven" />
                  <Alerts />
                </>
              }
            />
            <Route
              path="ui/buttons"
              element={
                <>
                  <PageTitle title="Buttons | Sweven" />
                  <Buttons />
                </>
              }
            />
          </Route>
          <Route path="/settings/*" element={<SettingLayout />}>
            <Route
              path="general"
              element={
                <>
                  <PageTitle title="Dashboard | Settings Layout" />
                  <General />
                </>
              }
            />
            <Route
              path="members"
              element={
                <>
                  <PageTitle title="Campaign | Settings Layout" />
                  <Members />
                </>
              }
            />
            <Route
              path="advertisers"
              element={
                <>
                  <PageTitle title="Campaign | Settings Layout" />
                  <Advertisers />
                </>
              }
            />
            <Route
              path="web-tracking"
              element={
                <>
                  <PageTitle title="Campaign | Settings Layout" />
                  <WebTracking />
                </>
              }
            />
            <Route
              path="app-tracking"
              element={
                <>
                  <PageTitle title="Campaign | Settings Layout" />
                  <AppTracking />
                </>
              }
            />
            <Route
              path="balance-transaction"
              element={
                <>
                  <PageTitle title="Campaign | Settings Layout" />
                  <Balance spentThisMonth={0.0} accountBalance={0.0} />
                </>
              }
            />
            <Route
              path="payment-methods"
              element={
                <>
                  <PageTitle title="Campaign | Settings Layout" />
                  <PaymentMethods />
                </>
              }
            />
            <Route
              path="invoices"
              element={
                <>
                  <PageTitle title="Campaign | Settings Layout" />
                  <Invoices />
                </>
              }
            />
            <Route
              path="receipts"
              element={
                <>
                  <PageTitle title="Campaign | Settings Layout" />
                  <Receipts />
                </>
              }
            />
            <Route
              path="coupons"
              element={
                <>
                  <PageTitle title="Campaign | Settings Layout" />
                  <Coupons />
                </>
              }
            />
            {/* Add other routes as necessary */}
          </Route>
        </>
      ) : (
        <>
          <Route path="/auth/sign-in" element={<SignInPage />} />
          <Route path="/auth/sign-up" element={<SignUpPage />} />
        </>
      )}
    </Routes>
  );
}

export default App;
