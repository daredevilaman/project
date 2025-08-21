import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

// Use only Indian destinations and visuals
const HeroSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  // Replace with copyright-free Indian video/GIF for hero background
  // Example: Kerala backwaters, Himalayas, Taj Mahal, Goa beach, etc.
  // For demo, use high-res Indian images (replace with video/GIF if available)
  const slides = [
    {
      id: 1,
      image: 'https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop', // Kerala backwaters
      title: 'Kerala Backwaters',
      subtitle: 'Serenity in God\'s Own Country',
      description: 'Cruise through lush green landscapes, tranquil waters, and palm-fringed villages in Kerala\'s enchanting backwaters.',
      rating: 4.9,
      reviews: 2847,
      price: 'From ₹15,999',
      location: 'Kerala',
    },
    {
      id: 2,
      image: 'https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop', // Himalayas
      title: 'Himalayan Adventure',
      subtitle: 'Majestic Peaks & Spiritual Vibes',
      description: 'Experience the grandeur of the Himalayas—perfect for trekking, meditation, and breathtaking mountain views.',
      rating: 4.8,
      reviews: 1653,
      price: 'From ₹12,999',
      location: 'Himachal & Uttarakhand',
    },
    {
      id: 3,
      image: 'https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop', // Goa beach
      title: 'Goa Beaches',
      subtitle: 'Sun, Sand & Vibrant Culture',
      description: 'Relax on golden sands, enjoy vibrant nightlife, and soak in the beauty of Goa\'s iconic beaches.',
      rating: 4.9,
      reviews: 3241,
      price: 'From ₹9,999',
      location: 'Goa',
    },
    {
      id: 4,
      image: 'https://images.pexels.com/photos/417142/pexels-photo-417142.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop', // Taj Mahal
      title: 'Taj Mahal, Agra',
      subtitle: 'Eternal Symbol of Love',
      description: 'Marvel at the world-famous Taj Mahal, a UNESCO World Heritage site and one of India\'s most celebrated wonders.',
      rating: 5.0,
      reviews: 4120,
      price: 'From ₹2,499',
      location: 'Agra, Uttar Pradesh',
    },
  ];

  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlay, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlay(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlay(false);
  };

  return (
    <div className="relative h-screen overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
          >
            <div className="absolute inset-0 bg-black/40" />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-white"
              >
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="flex items-center space-x-2 mb-4"
                >
                  <div className="flex items-center space-x-1">
                    <Star className="w-5 h-5 fill-orange-400 text-orange-400" />
                    <span className="text-orange-400 font-semibold">
                      {slides[currentSlide].rating}
                    </span>
                  </div>
                  <span className="text-white/80">
                    ({slides[currentSlide].reviews.toLocaleString()} reviews)
                  </span>
                  <span className="text-white/60">•</span>
                  <span className="text-white/80">{slides[currentSlide].location}</span>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="text-orange-400 text-lg font-medium mb-2"
                >
                  Incredible India Awaits
                </motion.p>

                <motion.h1
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
                >
                  {slides[currentSlide].title}
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="text-xl text-white/90 mb-8 max-w-2xl leading-relaxed"
                >
                  {slides[currentSlide].description}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6"
                >
                  <div className="flex items-center space-x-4">
                    <Link
                      to="/trips"
                      className="group bg-orange-500 text-white px-8 py-4 rounded-full hover:bg-orange-600 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                    >
                      <span className="flex items-center space-x-2">
                        <span className="font-semibold">Explore India</span>
                        <motion.div
                          className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center"
                          whileHover={{ x: 5 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <ChevronRight size={12} />
                        </motion.div>
                      </span>
                    </Link>
                  </div>
                  <div className="text-white">
                    <span className="text-sm text-white/70">Starting from</span>
                    <div className="text-2xl font-bold">{slides[currentSlide].price}</div>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-200 group"
      >
        <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-200" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-200 group"
      >
        <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform duration-200" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentSlide(index);
              setIsAutoPlay(false);
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-orange-500 w-8'
                : 'bg-white/50 hover:bg-white/70'
            }`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
        <motion.div
          key={currentSlide}
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 6, ease: "linear" }}
          className="h-full bg-orange-500"
        />
      </div>
    </div>
  );
};

export default HeroSlider;