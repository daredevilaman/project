import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Star, MapPin, Calendar, Users, Heart } from 'lucide-react';

// Only Indian destinations
const FeaturedTrips: React.FC = () => {
  const trips = [
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
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: ["easeOut"] },
    },
  };

  return (
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="inline-block bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
          Recommended Destinations
        </span>
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Best Sellers
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Discover our most sought-after luxury destinations, carefully curated for discerning travelers.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {trips.map((trip) => (
          <motion.div
            key={trip.id}
            variants={cardVariants}
            whileHover={{ y: -10 }}
            transition={{ duration: 0.3 }}
            className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
          >
            <Link to={`/trip/${trip.id}`}>
              <div className="relative">
                {/* Image */}
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={trip.image}
                    alt={trip.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>

                {/* Overlay Elements */}
                <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                  <span className="bg-white/90 backdrop-blur-sm text-gray-900 px-3 py-1 rounded-full text-sm font-medium">
                    {trip.category}
                  </span>
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-600 hover:text-red-500 transition-colors duration-200"
                  >
                    <Heart size={20} />
                  </motion.button>
                </div>

                {trip.originalPrice && (
                  <div className="absolute top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Save ${trip.originalPrice - trip.price}
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Rating and Reviews */}
                <div className="flex items-center space-x-2 mb-3">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-orange-400 text-orange-400" />
                    <span className="text-sm font-semibold text-gray-900">
                      {trip.rating}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">
                    ({trip.reviews} reviews)
                  </span>
                </div>

                {/* Title and Location */}
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                  {trip.title}
                </h3>
                
                <div className="flex items-center space-x-1 text-gray-600 mb-4">
                  <MapPin size={16} />
                  <span className="text-sm">{trip.location}</span>
                </div>

                {/* Trip Details */}
                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <div className="flex items-center space-x-1">
                    <Calendar size={16} />
                    <span>{trip.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users size={16} />
                    <span>{trip.groupSize}</span>
                  </div>
                </div>

                {/* Highlights */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {trip.highlights.slice(0, 2).map((highlight, idx) => (
                      <span
                        key={idx}
                        className="bg-blue-50 text-blue-600 px-2 py-1 rounded text-xs font-medium"
                      >
                        {highlight}
                      </span>
                    ))}
                    {trip.highlights.length > 2 && (
                      <span className="text-xs text-gray-500 px-2 py-1">
                        +{trip.highlights.length - 2} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Price and CTA */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-gray-900">
                        ${trip.price}
                      </span>
                      {trip.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          ${trip.originalPrice}
                        </span>
                      )}
                    </div>
                    <span className="text-sm text-gray-600">per person</span>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors duration-200 font-medium"
                  >
                    View Details
                  </motion.button>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
        className="text-center mt-16"
      >
        <Link
          to="/trips"
          className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-full hover:from-orange-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
        >
          <span className="font-semibold">Explore All Trips</span>
          <motion.div
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            →
          </motion.div>
        </Link>
      </motion.div>
    </div>
  );
};

export default FeaturedTrips;