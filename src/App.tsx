import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignInPage from './auth/sign-in';
import SignUpPage from './auth/sign-up';
import Calendar from './pages/Calendar';
import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/ECommerce';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import DefaultLayout from './layout/DefaultLayout';
import Home from './pages/Home';
import { useUser } from '@clerk/clerk-react';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();
  const { user, isLoaded, isSignedIn } = useUser();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  if (isLoaded) {
    // Redirect logged-in users away from the sign-in and sign-up pages
    if (
      isSignedIn &&
      (pathname === '/auth/sign-in' || pathname === '/auth/sign-up')
    ) {
      return <Navigate to="/" />;
    }

    // Redirect not logged-in users to the sign-in page for protected routes
    if (
      !isSignedIn &&
      pathname !== '/auth/sign-in' &&
      pathname !== '/auth/sign-up'
    ) {
      return <Navigate to="/auth/sign-in" />;
    }
  }

  return loading ? (
    <Loader />
  ) : (
    <Routes>
      <Route path="/" element={<Home />} />
      {!isSignedIn && <Route path="/auth/sign-in" element={<SignInPage />} />}
      {!isSignedIn && <Route path="auth/sign-up" element={<SignUpPage />} />}
      {isSignedIn && (
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
            path="calendar"
            element={
              <>
                <PageTitle title="Calendar | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <Calendar />
              </>
            }
          />
          <Route
            path="profile"
            element={
              <>
                <PageTitle title="Profile | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <Profile />
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
            path="settings"
            element={
              <>
                <PageTitle title="Settings | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <Settings />
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
      )}
    </Routes>
  );
}

export default App;
