import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, DollarSign, Clock, Filter } from 'lucide-react';

interface TripFiltersProps {
  onFiltersChange: (filters: any) => void;
}

const TripFilters: React.FC<TripFiltersProps> = ({ onFiltersChange }) => {
  const [filters, setFilters] = useState({
    checkIn: '',
    checkOut: '',
    destination: '',
    budget: [0, 200000],
    duration: '',
  });

  const destinations = [
    'Leh Ladakh', 'Spiti Valley', 'Manali', 'Kerala', 'Goa', 
    'Ooty', 'Jaipur', 'Varanasi', 'Andaman', 'Udaipur'
  ];

  const durations = [
    { value: '1-3', label: '1-3 nights' },
    { value: '4-6', label: '4-6 nights' },
    { value: '7+', label: '7+ nights' },
  ];

  const handleFilterChange = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-2xl shadow-lg p-6 mb-8"
    >
      <div className="flex items-center space-x-2 mb-6">
        <Filter className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-900">Filter Trips</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Check-in Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Calendar className="w-4 h-4 inline mr-1" />
            Check-in
          </label>
          <input
            type="date"
            value={filters.checkIn}
            onChange={(e) => handleFilterChange('checkIn', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Check-out Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Calendar className="w-4 h-4 inline mr-1" />
            Check-out
          </label>
          <input
            type="date"
            value={filters.checkOut}
            onChange={(e) => handleFilterChange('checkOut', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Destination */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <MapPin className="w-4 h-4 inline mr-1" />
            Destination
          </label>
          <select
            value={filters.destination}
            onChange={(e) => handleFilterChange('destination', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Destinations</option>
            {destinations.map(dest => (
              <option key={dest} value={dest}>{dest}</option>
            ))}
          </select>
        </div>

        {/* Budget Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <DollarSign className="w-4 h-4 inline mr-1" />
            Budget Range
          </label>
          <select
            value={`${filters.budget[0]}-${filters.budget[1]}`}
            onChange={(e) => {
              const [min, max] = e.target.value.split('-').map(Number);
              handleFilterChange('budget', [min, max]);
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="0-200000">All Budgets</option>
            <option value="0-10000">Under ₹10,000</option>
            <option value="10000-25000">₹10,000 - ₹25,000</option>
            <option value="25000-50000">₹25,000 - ₹50,000</option>
            <option value="50000-100000">₹50,000 - ₹1,00,000</option>
            <option value="100000-200000">₹1,00,000+</option>
          </select>
        </div>

        {/* Duration */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Clock className="w-4 h-4 inline mr-1" />
            Duration
          </label>
          <select
            value={filters.duration}
            onChange={(e) => handleFilterChange('duration', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Durations</option>
            {durations.map(duration => (
              <option key={duration.value} value={duration.value}>
                {duration.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Clear Filters */}
      <div className="mt-4 flex justify-end">
        <button
          onClick={() => {
            const resetFilters = {
              checkIn: '',
              checkOut: '',
              destination: '',
              budget: [0, 200000],
              duration: '',
            };
            setFilters(resetFilters);
            onFiltersChange(resetFilters);
          }}
          className="text-blue-600 hover:text-blue-700 font-medium text-sm"
        >
          Clear All Filters
        </button>
      </div>
    </motion.div>
  );
};

export default TripFilters;