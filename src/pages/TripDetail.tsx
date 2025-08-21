import React from 'react';
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Star, MapPin, Calendar, Users, Clock, Award, 
  ChevronLeft, ChevronRight, Heart, Share2, 
  Check, X, Camera
} from 'lucide-react';
import { useTrips } from '../contexts/TripContext';
import { useAuth } from '../contexts/AuthContext';
import PageTransition from '../components/ui/PageTransition';

const TripDetail: React.FC = () => {
  const { id } = useParams();
  const { getTrip } = useTrips();
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showGallery, setShowGallery] = useState(false);

  const trip = getTrip(id || '');

  if (!trip) {
    return (
      <PageTransition>
        <div className="pt-24 pb-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Trip Not Found</h1>
            <p className="text-xl text-gray-600 mb-8">
              The trip you're looking for doesn't exist or has been removed.
            </p>
            <Link
              to="/trips"
              className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors duration-200"
            >
              Browse All Trips
            </Link>
          </div>
        </div>
      </PageTransition>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'itinerary', label: 'Itinerary' },
    { id: 'included', label: 'What\'s Included' },
    { id: 'gallery', label: 'Gallery' },
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % trip.gallery.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + trip.gallery.length) % trip.gallery.length);
  };

  return (
    <PageTransition>
      <div className="pt-24 pb-16">
        {/* Hero Section */}
        <div className="relative h-96 md:h-[500px] overflow-hidden">
          <img
            src={trip.image}
            alt={trip.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
          
          <div className="absolute inset-0 flex items-end">
            <div className="container mx-auto px-4 pb-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-white"
              >
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex items-center space-x-1">
                    <Star className="w-5 h-5 fill-orange-400 text-orange-400" />
                    <span className="text-orange-400 font-semibold">{trip.rating}</span>
                  </div>
                  <span className="text-white/80">({trip.reviews} reviews)</span>
                  <span className="text-white/60">•</span>
                  <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                    {trip.category}
                  </span>
                </div>
                
                <h1 className="text-4xl md:text-6xl font-bold mb-4">{trip.title}</h1>
                
                <div className="flex items-center space-x-4 text-white/90">
                  <div className="flex items-center space-x-1">
                    <MapPin size={20} />
                    <span>{trip.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar size={20} />
                    <span>{trip.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users size={20} />
                    <span>{trip.groupSize}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="absolute top-4 right-4 flex space-x-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-200"
            >
              <Heart size={20} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-200"
            >
              <Share2 size={20} />
            </motion.button>
          </div>
        </div>

        <div className="container mx-auto px-4 -mt-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Booking Card - Mobile */}
              <div className="lg:hidden bg-white rounded-2xl shadow-lg p-6 mb-8">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-3xl font-bold text-gray-900">${trip.price}</span>
                      {trip.originalPrice && (
                        <span className="text-lg text-gray-500 line-through">
                          ${trip.originalPrice}
                        </span>
                      )}
                    </div>
                    <span className="text-gray-600">per person</span>
                  </div>
                  {trip.originalPrice && (
                    <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium">
                      Save ${trip.originalPrice - trip.price}
                    </span>
                  )}
                </div>
                
                <Link
                  to={isAuthenticated ? `/booking/${trip.id}` : '/login'}
                  className="block w-full bg-orange-500 text-white text-center py-4 rounded-full hover:bg-orange-600 transition-colors duration-200 font-semibold"
                >
                  {isAuthenticated ? 'Book Now' : 'Login to Book'}
                </Link>
              </div>

              {/* Tabs */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
                <div className="border-b border-gray-200">
                  <div className="flex overflow-x-auto">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`relative px-6 py-4 font-medium whitespace-nowrap transition-colors duration-200 ${
                          activeTab === tab.id
                            ? 'text-blue-600 border-b-2 border-blue-600'
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-6">
                  <AnimatePresence mode="wait">
                    {activeTab === 'overview' && (
                      <motion.div
                        key="overview"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">About This Trip</h3>
                        <p className="text-gray-700 mb-6 leading-relaxed">{trip.description}</p>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                          <div className="text-center p-4 bg-gray-50 rounded-lg">
                            <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                            <div className="font-semibold text-gray-900">{trip.duration}</div>
                            <div className="text-sm text-gray-600">Duration</div>
                          </div>
                          <div className="text-center p-4 bg-gray-50 rounded-lg">
                            <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                            <div className="font-semibold text-gray-900">{trip.groupSize}</div>
                            <div className="text-sm text-gray-600">Group Size</div>
                          </div>
                          <div className="text-center p-4 bg-gray-50 rounded-lg">
                            <Award className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                            <div className="font-semibold text-gray-900">{trip.difficulty}</div>
                            <div className="text-sm text-gray-600">Difficulty</div>
                          </div>
                          <div className="text-center p-4 bg-gray-50 rounded-lg">
                            <Calendar className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                            <div className="font-semibold text-gray-900">{trip.bestTime}</div>
                            <div className="text-sm text-gray-600">Best Time</div>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 mb-3">Highlights</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {trip.highlights.map((highlight, index) => (
                              <div key={index} className="flex items-center space-x-2">
                                <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                                <span className="text-gray-700">{highlight}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {activeTab === 'itinerary' && (
                      <motion.div
                        key="itinerary"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">Day by Day Itinerary</h3>
                        <div className="space-y-4">
                          {trip.itinerary.map((day, index) => (
                            <div key={index} className="flex space-x-4">
                              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
                                {index + 1}
                              </div>
                              <div className="flex-1">
                                <p className="text-gray-700">{day}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {activeTab === 'included' && (
                      <motion.div
                        key="included"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                              <Check className="w-5 h-5 text-green-500 mr-2" />
                              What's Included
                            </h4>
                            <ul className="space-y-2">
                              {trip.included.map((item, index) => (
                                <li key={index} className="flex items-center space-x-2">
                                  <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                                  <span className="text-gray-700">{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                              <X className="w-5 h-5 text-red-500 mr-2" />
                              What's Not Included
                            </h4>
                            <ul className="space-y-2">
                              {trip.excluded.map((item, index) => (
                                <li key={index} className="flex items-center space-x-2">
                                  <X className="w-4 h-4 text-red-500 flex-shrink-0" />
                                  <span className="text-gray-700">{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {activeTab === 'gallery' && (
                      <motion.div
                        key="gallery"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">Photo Gallery</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {trip.gallery.map((image, index) => (
                            <motion.div
                              key={index}
                              whileHover={{ scale: 1.05 }}
                              className="relative aspect-square overflow-hidden rounded-lg cursor-pointer group"
                              onClick={() => {
                                setCurrentImageIndex(index);
                                setShowGallery(true);
                              }}
                            >
                              <img
                                src={image}
                                alt={`${trip.title} - Image ${index + 1}`}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                              />
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                                <Camera className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Booking Sidebar - Desktop */}
            <div className="hidden lg:block">
              <div className="sticky top-24">
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-3xl font-bold text-gray-900">${trip.price}</span>
                        {trip.originalPrice && (
                          <span className="text-lg text-gray-500 line-through">
                            ${trip.originalPrice}
                          </span>
                        )}
                      </div>
                      <span className="text-gray-600">per person</span>
                    </div>
                    {trip.originalPrice && (
                      <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium">
                        Save ${trip.originalPrice - trip.price}
                      </span>
                    )}
                  </div>
                  
                  <Link
                    to={isAuthenticated ? `/booking/${trip.id}` : '/login'}
                    className="block w-full bg-orange-500 text-white text-center py-4 rounded-full hover:bg-orange-600 transition-colors duration-200 font-semibold mb-4"
                  >
                    {isAuthenticated ? 'Book Now' : 'Login to Book'}
                  </Link>
                  
                  <div className="text-center text-sm text-gray-600 mb-6">
                    Free cancellation up to 24 hours before departure
                  </div>
                  
                  <div className="border-t border-gray-200 pt-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Why book with us?</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-center space-x-2">
                        <Check className="w-4 h-4 text-green-500" />
                        <span>Best price guarantee</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Check className="w-4 h-4 text-green-500" />
                        <span>24/7 customer support</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Check className="w-4 h-4 text-green-500" />
                        <span>Secure payment</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Check className="w-4 h-4 text-green-500" />
                        <span>Instant confirmation</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Gallery Modal */}
        <AnimatePresence>
          {showGallery && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
              onClick={() => setShowGallery(false)}
            >
              <div className="relative max-w-4xl max-h-full p-4" onClick={(e) => e.stopPropagation()}>
                <img
                  src={trip.gallery[currentImageIndex]}
                  alt={`${trip.title} - Image ${currentImageIndex + 1}`}
                  className="max-w-full max-h-full object-contain"
                />
                
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-200"
                >
                  <ChevronLeft size={24} />
                </button>
                
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-200"
                >
                  <ChevronRight size={24} />
                </button>
                
                <button
                  onClick={() => setShowGallery(false)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-200"
                >
                  <X size={20} />
                </button>
                
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm">
                  {currentImageIndex + 1} / {trip.gallery.length}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        </div>
    
    </PageTransition>
  );
};

export default TripDetail;