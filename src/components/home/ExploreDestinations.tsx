import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight } from 'lucide-react';

const ExploreDestinations: React.FC = () => {
  const destinations = [
    {
      id: 'leh',
      name: 'Leh Ladakh',
      image: 'https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      trips: 24,
      startingPrice: 24999,
      region: 'North',
    },
    {
      id: 'spiti',
      name: 'Spiti Valley',
      image: 'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      trips: 18,
      startingPrice: 19999,
      region: 'North',
    },
    {
      id: 'manali',
      name: 'Manali',
      image: 'https://images.pexels.com/photos/1559826/pexels-photo-1559826.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      trips: 32,
      startingPrice: 8999,
      region: 'North',
    },
    {
      id: 'kerala',
      name: 'Kerala',
      image: 'https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      trips: 28,
      startingPrice: 15999,
      region: 'South',
    },
    {
      id: 'andaman',
      name: 'Andaman',
      image: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      trips: 16,
      startingPrice: 24999,
      region: 'East',
    },
    {
      id: 'ooty',
      name: 'Ooty',
      image: 'https://images.pexels.com/photos/325807/pexels-photo-325807.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      trips: 12,
      startingPrice: 10999,
      region: 'South',
    },
    {
      id: 'jaipur',
      name: 'Jaipur',
      image: 'https://images.pexels.com/photos/417142/pexels-photo-417142.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      trips: 20,
      startingPrice: 8999,
      region: 'West',
    },
    {
      id: 'varanasi',
      name: 'Varanasi',
      image: 'https://images.pexels.com/photos/356844/pexels-photo-356844.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      trips: 10,
      startingPrice: 7999,
      region: 'East',
    },
  ];

  const regions = [
    { id: 'north', name: 'North India', count: 74 },
    { id: 'south', name: 'South India', count: 40 },
    { id: 'east', name: 'East India', count: 26 },
    { id: 'west', name: 'West India', count: 20 },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
            🧭 Explore Destinations
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Where Will You Go Next?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover amazing destinations around the world with our carefully curated travel experiences.
          </p>
        </motion.div>

        {/* Region Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {regions.map((region, index) => (
            <motion.div
              key={region.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link
                to={`/trips?region=${region.id}`}
                className="group flex items-center space-x-2 bg-gray-100 hover:bg-blue-600 text-gray-700 hover:text-white px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105"
              >
                <span className="font-medium">{region.name}</span>
                <span className="text-sm bg-white/20 px-2 py-1 rounded-full">
                  {region.count}
                </span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((destination, index) => (
            <motion.div
              key={destination.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden"
            >
              <Link to={`/trips?destination=${destination.id}`}>
                <div className="relative">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={destination.image}
                      alt={destination.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  
                  <div className="absolute top-4 right-4">
                    <span className="bg-white/90 backdrop-blur-sm text-gray-900 px-3 py-1 rounded-full text-sm font-medium">
                      {destination.region}
                    </span>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="p-6">
                  <div className="flex items-center space-x-2 mb-2">
                    <MapPin size={16} className="text-blue-600" />
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                      {destination.name}
                    </h3>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm text-gray-600">{destination.trips} trips available</span>
                      <div className="text-lg font-bold text-gray-900">
                        ₹{destination.startingPrice.toLocaleString()}
                      </div>
                      <span className="text-sm text-gray-500">starting from</span>
                    </div>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors duration-200"
                    >
                      <ArrowRight size={16} />
                    </motion.button>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Upcoming Trips Promo Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-black/10" />
          <div className="relative z-10">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              🎉 Explore All Upcoming Trips
            </h3>
            <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
              Don't miss out on our exciting upcoming adventures. Book early and get the best deals!
            </p>
            <Link
              to="/trips?category=upcoming"
              className="inline-flex items-center space-x-2 bg-white text-orange-600 px-8 py-4 rounded-full hover:bg-orange-50 transition-all duration-300 transform hover:scale-105 font-semibold"
            >
              <span>View Upcoming Trips</span>
              <ArrowRight size={20} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExploreDestinations;