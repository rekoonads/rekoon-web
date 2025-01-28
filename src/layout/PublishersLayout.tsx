import React from 'react';
import { UserButton, useUser } from '@clerk/clerk-react';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';

export default function PublishersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useUser();

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="flex items-center justify-between p-4 bg-white text-black">
        <div className="flex items-start">
          <h1 className="font-semibold p-2 bg-slate-200 rounded-lg">
            Publisher
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/dashboard">
            <Button className="text-white">Go to Dashboard</Button>
          </Link>
          <UserButton />
        </div>
      </header>
      <main className="p-4">{children}</main>
    </div>
  );
}
