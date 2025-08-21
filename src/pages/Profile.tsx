import React from 'react';
import PageTransition from '../components/ui/PageTransition';

const Profile: React.FC = () => {
  return (
    <PageTransition>
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">My Profile</h1>
          <p className="text-xl text-gray-600">
            Manage your account and view your bookings.
          </p>
          {/* Profile content will be implemented here */}
        </div>
      </div>
    </PageTransition>
  );
};

export default Profile;