import React from 'react';
import { useParams } from 'react-router-dom';
import PageTransition from '../components/ui/PageTransition';

const Booking: React.FC = () => {
  const { id } = useParams();

  return (
    <PageTransition>
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Book Your Trip</h1>
          <p className="text-xl text-gray-600">
            Booking form for trip ID: {id}
          </p>
          {/* Booking form will be implemented here */}
        </div>
      </div>
    </PageTransition>
  );
};

export default Booking;