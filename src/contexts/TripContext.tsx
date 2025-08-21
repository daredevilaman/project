import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Trip {
  id: string;
  title: string;
  location: string;
  duration: string;
  groupSize: string;
  rating: number;
  reviews: number;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  featured: boolean;
  highlights: string[];
  description: string;
  itinerary: string[];
  included: string[];
  excluded: string[];
  difficulty: 'Easy' | 'Moderate' | 'Challenging';
  bestTime: string;
  gallery: string[];
}

interface TripContextType {
  trips: Trip[];
  addTrip: (trip: Omit<Trip, 'id'>) => void;
  updateTrip: (id: string, trip: Partial<Trip>) => void;
  deleteTrip: (id: string) => void;
  getTrip: (id: string) => Trip | undefined;
  getFeaturedTrips: () => Trip[];
  getTripsByCategory: (category: string) => Trip[];
}

const TripContext = createContext<TripContextType | undefined>(undefined);

export const useTrips = () => {
  const context = useContext(TripContext);
  if (context === undefined) {
    throw new Error('useTrips must be used within a TripProvider');
  }
  return context;
};

interface TripProviderProps {
  children: ReactNode;
}

export const TripProvider: React.FC<TripProviderProps> = ({ children }) => {
  const [trips, setTrips] = useState<Trip[]>([
    {
      id: 'kerala-backwaters',
      title: 'Kerala Backwaters',
      location: 'Kerala',
      duration: '5 Days',
      groupSize: '10 people',
      rating: 4.9,
      reviews: 324,
      price: 15999,
      originalPrice: 18999,
      image: 'https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=500&h=350&fit=crop',
      category: 'Nature',
      featured: true,
      highlights: ['Houseboat Stay', 'Village Life', 'Ayurveda'],
      description: 'Cruise through Kerala\'s enchanting backwaters, experience village life, and rejuvenate with Ayurveda.',
      itinerary: [
        'Day 1: Arrival in Kochi, transfer to houseboat',
        'Day 2: Backwater cruise and village visit',
        'Day 3: Ayurveda spa and local cuisine',
        'Day 4: Explore Alleppey and Kumarakom',
        'Day 5: Departure'
      ],
      included: ['Accommodation', 'All meals', 'Transportation', 'Guide', 'Activities'],
      excluded: ['Flights', 'Travel insurance', 'Personal expenses'],
      difficulty: 'Easy',
      bestTime: 'October to March',
      gallery: [
        'https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
        'https://images.pexels.com/photos/325807/pexels-photo-325807.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
        'https://images.pexels.com/photos/1174732/pexels-photo-1174732.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
      ]
    },
    {
      id: 'ladakh-adventure',
      title: 'Ladakh Adventure',
      location: 'Leh-Ladakh',
      duration: '7 Days',
      groupSize: '12 people',
      rating: 4.8,
      reviews: 187,
      price: 24999,
      originalPrice: 29999,
      image: 'https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&w=500&h=350&fit=crop',
      category: 'Adventure',
      featured: true,
      highlights: ['Pangong Lake', 'Nubra Valley', 'Biking'],
      description: 'Explore the high-altitude deserts, lakes, and monasteries of Ladakh on an unforgettable adventure.',
      itinerary: [
        'Day 1: Arrival in Leh, acclimatization',
        'Day 2: Leh local sightseeing',
        'Day 3: Nubra Valley via Khardung La',
        'Day 4: Pangong Lake excursion',
        'Day 5: Monastery visits',
        'Day 6: Biking and local markets',
        'Day 7: Departure'
      ],
      included: ['Hotels', 'Meals', 'Guide', 'Transport', 'Permits'],
      excluded: ['Flights', 'Travel insurance', 'Personal expenses'],
      difficulty: 'Moderate',
      bestTime: 'June to September',
      gallery: [
        'https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
        'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
        'https://images.pexels.com/photos/2166559/pexels-photo-2166559.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
      ]
    },
    {
      id: 'goa-honeymoon',
      title: 'Goa Honeymoon',
      location: 'Goa',
      duration: '4 Days',
      groupSize: '2 people',
      rating: 4.9,
      reviews: 456,
      price: 12999,
      originalPrice: 15999,
      image: 'https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=500&h=350&fit=crop',
      category: 'Honeymoon',
      featured: true,
      highlights: ['Beach Resort', 'Sunset Cruise', 'Water Sports'],
      description: 'Enjoy a romantic getaway in Goa with luxury beach resorts, sunset cruises, and vibrant nightlife.',
      itinerary: [
        'Day 1: Arrival in Goa, beach resort check-in',
        'Day 2: North Goa sightseeing and water sports',
        'Day 3: Sunset cruise and South Goa beaches',
        'Day 4: Leisure and departure'
      ],
      included: ['Resort stay', 'Breakfast', 'Sightseeing', 'Cruise'],
      excluded: ['Flights', 'Lunch & dinner', 'Personal expenses'],
      difficulty: 'Easy',
      bestTime: 'November to February',
      gallery: [
        'https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
        'https://images.pexels.com/photos/1174732/pexels-photo-1174732.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
        'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
      ]
    }
  ]);

  const addTrip = (trip: Omit<Trip, 'id'>) => {
    const newTrip: Trip = {
      ...trip,
      id: `trip-${Date.now()}`
    };
    setTrips(prev => [...prev, newTrip]);
  };

  const updateTrip = (id: string, updatedTrip: Partial<Trip>) => {
    setTrips(prev => prev.map(trip => 
      trip.id === id ? { ...trip, ...updatedTrip } : trip
    ));
  };

  const deleteTrip = (id: string) => {
    setTrips(prev => prev.filter(trip => trip.id !== id));
  };

  const getTrip = (id: string) => {
    return trips.find(trip => trip.id === id);
  };

  const getFeaturedTrips = () => {
    return trips.filter(trip => trip.featured);
  };

  const getTripsByCategory = (category: string) => {
    return trips.filter(trip => trip.category.toLowerCase().includes(category.toLowerCase()));
  };

  const value: TripContextType = {
    trips,
    addTrip,
    updateTrip,
    deleteTrip,
    getTrip,
    getFeaturedTrips,
    getTripsByCategory
  };

  return (
    <TripContext.Provider value={value}>
      {children}
    </TripContext.Provider>
  );
};