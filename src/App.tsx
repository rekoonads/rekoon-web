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
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import DefaultLayout from './layout/DefaultLayout';
import SettingLayout from './layout/SettingLayout'; // Ensure you have this layout
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

function App() {
  const [loading, setLoading] = useState(true);
  const { pathname } = useLocation();
  const { user, isLoaded, isSignedIn } = useUser();
  const navigate = useNavigate();
  console.log(user?.id)

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      if (pathname === '/') {
        navigate('/login-options');
      }
    }
  }, [isLoaded, isSignedIn, pathname, navigate]);

  if (loading) {
    return <Loader />;
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login-options" element={<LoginWays />} />
      <Route path="/manage-advertise" element={<AdvertiseManagement />} />
      <Route path="/report" element={<ReportPage />} />
      <Route path="/auth/sign-in" element={<SignInPage />} />
      <Route path="/auth/sign-up" element={<SignUpPage />} />

      {isSignedIn ? (
        <>
          <Route path="/" element={<DefaultLayout />}>
            <Route
              path="dashboard"
              element={
                <>
                  <PageTitle title="Dashboard | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                  <ECommerce />
                </>
              }
            />
            <Route
              path="campaign"
              element={
                <>
                  <PageTitle title="Campaign | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                  <Campaigns />
                </>
              }
            />
            <Route
              path="strategy"
              element={
                <>
                  <PageTitle title="Strategy | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                  <Strategy />
                </>
              }
            />
            <Route
              path="summary"
              element={
                <>
                  <PageTitle title="Summary | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                  <Summary />
                </>
              }
            />
            <Route
              path="forms/form-elements"
              element={
                <>
                  <PageTitle title="Form Elements | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                  <FormElements />
                </>
              }
            />
            <Route
              path="forms/form-layout"
              element={
                <>
                  <PageTitle title="Form Layout | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                  <FormLayout />
                </>
              }
            />
            <Route
              path="tables"
              element={
                <>
                  <PageTitle title="Tables | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                  <Tables />
                </>
              }
            />
            <Route
              path="chart"
              element={
                <>
                  <PageTitle title="Basic Chart | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                  <Chart />
                </>
              }
            />
            <Route
              path="ui/alerts"
              element={
                <>
                  <PageTitle title="Alerts | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                  <Alerts />
                </>
              }
            />
            <Route
              path="ui/buttons"
              element={
                <>
                  <PageTitle title="Buttons | TailAdmin - Tailwind CSS Admin Dashboard Template" />
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
                  <Balance spentThisMonth={0.00} accountBalance={0.00} />
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
