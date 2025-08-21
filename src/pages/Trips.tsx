import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Star, MapPin, Calendar, Users, Heart } from 'lucide-react';
import { useTrips } from '../contexts/TripContext';
import TripFilters from '../components/trips/TripFilters';
import PageTransition from '../components/ui/PageTransition';

const Trips: React.FC = () => {
  const { trips } = useTrips();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [ setAdvancedFilters] = useState<any>({});

  // Sample trips data with Indian pricing
  const sampleTrips = [
    {
      id: 'kerala-backwaters',
      title: 'Kerala Backwaters',
      location: 'Kerala',
      duration: '5 Days / 4 Nights',
      groupSize: '8-12 people',
      rating: 4.8,
      reviews: 156,
      price: 15999,
      originalPrice: 18999,
      image: 'https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=500&h=350&fit=crop',
      category: 'Nature',
      featured: true,
      highlights: ['Houseboat Stay', 'Village Life', 'Ayurveda'],
      upcomingDates: ['15 Mar', '22 Mar', '29 Mar'],
      emi: true,
    },
    {
      id: 'ladakh-adventure',
      title: 'Ladakh Adventure',
      location: 'Leh-Ladakh',
      duration: '7 Days / 6 Nights',
      groupSize: '6-10 people',
      rating: 4.9,
      reviews: 203,
      price: 24999,
      originalPrice: 29999,
      image: 'https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&w=500&h=350&fit=crop',
      category: 'Adventure',
      featured: true,
      highlights: ['Pangong Lake', 'Nubra Valley', 'Biking'],
      upcomingDates: ['5 Apr', '12 Apr', '19 Apr'],
      emi: true,
    },
    {
      id: 'goa-honeymoon',
      title: 'Goa Honeymoon',
      location: 'Goa',
      duration: '4 Days / 3 Nights',
      groupSize: '2 people',
      rating: 4.7,
      reviews: 89,
      price: 12999,
      originalPrice: 15999,
      image: 'https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=500&h=350&fit=crop',
      category: 'Honeymoon',
      featured: true,
      highlights: ['Beach Resort', 'Sunset Cruise', 'Water Sports'],
      upcomingDates: ['10 May', '17 May', '24 May'],
      emi: true,
    },
  ];

  const allTrips = [...trips, ...sampleTrips];
  const categories = [
    { id: 'all', name: 'All Trips', count: allTrips.length },
    { id: 'honeymoon', name: 'Honeymoon', count: allTrips.filter(t => t.category.toLowerCase().includes('honeymoon')).length },
    { id: 'adventure', name: 'Adventure', count: allTrips.filter(t => t.category.toLowerCase().includes('adventure')).length },
    { id: 'nature', name: 'Nature', count: allTrips.filter(t => t.category.toLowerCase().includes('nature')).length },
    { id: 'temple', name: 'Temple & Spiritual', count: allTrips.filter(t => t.category.toLowerCase().includes('temple')).length },
    { id: 'famous', name: 'Famous Places', count: allTrips.filter(t => t.category.toLowerCase().includes('famous')).length },
  ];

  const filteredTrips = allTrips.filter(trip => {
    const matchesSearch = trip.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         trip.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
                           trip.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
                           (selectedCategory === 'golf' && trip.category.toLowerCase().includes('luxury')) ||
                           (selectedCategory === 'your-travel' && trip.category.toLowerCase().includes('beach')) ||
                           (selectedCategory === 'honeymoon' && trip.category.toLowerCase().includes('cultural')) ||
                           (selectedCategory === 'corporate' && trip.category.toLowerCase().includes('adventure')) ||
                           (selectedCategory === 'stories' && trip.category.toLowerCase().includes('cultural'));
    const matchesPrice = priceRange === 'all' ||
                        (priceRange === 'budget' && trip.price < 1000) ||
                        (priceRange === 'mid' && trip.price >= 1000 && trip.price < 2000) ||
                        (priceRange === 'luxury' && trip.price >= 2000);
    
    return matchesSearch && matchesCategory && matchesPrice;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'price-low': return a.price - b.price;
      case 'price-high': return b.price - a.price;
      case 'rating': return b.rating - a.rating;
      case 'duration': return parseInt(a.duration) - parseInt(b.duration);
      default: return b.featured ? 1 : -1;
    }
  });

  const handleAdvancedFilters = (filters: any) => {
    setAdvancedFilters(filters);
  };

  return (
    <PageTransition>
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Discover Amazing Destinations
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our curated collection of extraordinary travel experiences designed to create unforgettable memories.
            </p>
          </motion.div>

          {/* Advanced Filters */}
          <TripFilters onFiltersChange={handleAdvancedFilters} />

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-6 mb-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search destinations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name} ({category.count})
                  </option>
                ))}
              </select>

              {/* Price Range */}
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Prices</option>
                <option value="budget">Under ₹10,000</option>
                <option value="mid">₹10,000 - ₹50,000</option>
                <option value="luxury">₹50,000+</option>
              </select>

              {/* Sort By */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="featured">Featured First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="duration">Duration</option>
              </select>
            </div>
          </motion.div>

          {/* Results Count */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-8"
          >
            <p className="text-gray-600">
              Showing {filteredTrips.length} of {allTrips.length} trips
            </p>
          </motion.div>

          {/* Trip Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredTrips.map((trip, index) => (
              <motion.div
                key={trip.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
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
                          Save ₹{trip.originalPrice - trip.price}
                        </span>
                      </div>
                    )}

                    {trip.featured && (
                      <div className="absolute bottom-4 left-4">
                        <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                          Featured
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

                    {/* Upcoming Dates */}
                    {(trip as any).upcomingDates && (
                      <div className="mb-4">
                        <p className="text-sm text-gray-600 mb-2">Upcoming dates:</p>
                        <div className="flex flex-wrap gap-1">
                          {(trip as any).upcomingDates.map((date: string, idx: number) => (
                            <span
                              key={idx}
                              className="bg-green-50 text-green-600 px-2 py-1 rounded text-xs font-medium"
                            >
                              {date}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

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
                            ₹{trip.price.toLocaleString()}
                          </span>
                          {trip.originalPrice && (
                            <span className="text-sm text-gray-500 line-through">
                              ₹{trip.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                        <span className="text-sm text-gray-600">per person</span>
                        {(trip as any).emi && (
                          <div className="text-xs text-green-600 font-medium">
                            💳 No Cost EMI Available
                          </div>
                        )}
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

          {/* No Results */}
          {filteredTrips.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No trips found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search criteria or browse all destinations.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  setPriceRange('all');
                }}
                className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors duration-200"
              >
                Clear Filters
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </PageTransition>
  );
};

export default Trips;