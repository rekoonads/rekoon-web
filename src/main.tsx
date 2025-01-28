import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './css/style.css';
import './css/satoshi.css';
import 'jsvectormap/dist/css/jsvectormap.css';
import 'flatpickr/dist/flatpickr.min.css';
import { ClerkProvider } from '@clerk/clerk-react';
import { Toaster } from './components/ui/toaster';
import CrispChat from './components/CrispChat';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key');
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <Router>
        <App />
        <CrispChat websiteId="4f6dce7a-88d1-46dd-8463-f09ba4d9538e" />
        <Toaster />
      </Router>
    </ClerkProvider>
  </React.StrictMode>,
);
