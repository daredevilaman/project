import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import { Users, BookOpen, Compass, Heart, Sparkles } from 'lucide-react';


const TripCategories: React.FC = () => {
  const categories = [
    {
      id: 'honeymoon',
      name: 'Honeymoon',
      description: 'Romantic escapes: Manali, Goa, Udaipur, Munnar, Andaman, Ooty, Kashmir',
      icon: Heart,
      image: 'https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      color: 'from-pink-500 to-rose-500',
      trips: 40,
    },
    {
      id: 'adventure',
      name: 'Adventure',
      description: 'Thrills: Rishikesh, Ladakh, Spiti, Meghalaya, Jim Corbett',
      icon: Users,
      image: 'https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      color: 'from-green-500 to-emerald-500',
      trips: 35,
    },
    {
      id: 'temple',
      name: 'Temple & Spiritual',
      description: 'Spiritual journeys: Varanasi, Tirupati, Rameswaram, Kedarnath, Golden Temple',
      icon: BookOpen,
      image: 'https://images.pexels.com/photos/356844/pexels-photo-356844.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      color: 'from-indigo-500 to-blue-500',
      trips: 30,
    },
    {
      id: 'nature',
      name: 'Nature & Scenery',
      description: 'Natural wonders: Kerala, Coorg, Nainital, Sikkim, Valley of Flowers',
      icon: Sparkles,
      image: 'https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      color: 'from-orange-500 to-red-500',
      trips: 28,
    },
    {
      id: 'famous',
      name: 'Famous Places',
      description: 'Must-see: Taj Mahal, Jaipur, Delhi, Mumbai, Mysore, Hampi',
      icon: Compass,
      image: 'https://images.pexels.com/photos/417142/pexels-photo-417142.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      color: 'from-purple-500 to-pink-500',
      trips: 50,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
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
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Choose Your Experience
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          From exclusive golf retreats to romantic getaways, discover luxury experiences tailored to your desires.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {categories.map((category, index) => (
          <motion.div
            key={category.id}
            variants={itemVariants}
            whileHover={{ y: -10 }}
            transition={{ duration: 0.3 }}
            className="group"
          >
            <Link to={`/trips?category=${category.id}`}>
              <div className="relative overflow-hidden rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-500">
                {/* Background Image */}
                <div className="aspect-[4/3] relative">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-80 group-hover:opacity-70 transition-opacity duration-300`} />
                </div>

                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between text-white">
                  <div className="flex justify-between items-start">
                    <motion.div
                      whileHover={{ rotate: 15, scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
                    >
                      <category.icon size={24} />
                    </motion.div>
                    
                    <div className="text-right">
                      <span className="text-sm font-medium bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                        {category.trips} trips
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold group-hover:text-orange-200 transition-colors duration-300">
                      {category.name}
                    </h3>
                    <p className="text-white/90 text-sm">
                      {category.description}
                    </p>
                    
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: '100%' }}
                      transition={{ duration: 0.8, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="h-1 bg-white/30 rounded-full overflow-hidden"
                    >
                      <motion.div
                        initial={{ x: '-100%' }}
                        whileInView={{ x: 0 }}
                        transition={{ duration: 0.8, delay: index * 0.1 + 0.2 }}
                        className="h-full bg-white rounded-full"
                      />
                    </motion.div>
                  </div>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <motion.button
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white text-gray-900 px-6 py-2 rounded-full font-semibold transform hover:scale-105 transition-transform duration-200"
                  >
                    Explore {category.name}
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
          className="inline-flex items-center space-x-2 bg-blue-600 text-white px-8 py-4 rounded-full hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
        >
          <span className="font-semibold">View All Destinations</span>
          <motion.div
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Compass size={20} />
          </motion.div>
        </Link>
      </motion.div>
    </div>
  );
};

export default TripCategories;