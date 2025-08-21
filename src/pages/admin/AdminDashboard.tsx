import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart3, Users, MapPin, Calendar, DollarSign, Star, 
  Plus, Edit, Trash2, Eye, Search, Filter, Download,
  Settings, Bell, Menu, X, ChevronDown, Check, Clock,
  MessageSquare, Image, Tag, Globe, Shield
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTrips, Trip } from '../../contexts/TripContext';
import PageTransition from '../../components/ui/PageTransition';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const { trips, addTrip, updateTrip, deleteTrip } = useTrips();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showAddTripModal, setShowAddTripModal] = useState(false);
  const [editingTrip, setEditingTrip] = useState<Trip | null>(null);
  const [selectedBookings, setSelectedBookings] = useState<string[]>([]);

  // Mock data for dashboard
  const stats = [
    { label: 'Total Trips', value: '156', change: '+12%', icon: MapPin, color: 'bg-blue-500' },
    { label: 'Active Bookings', value: '2,847', change: '+8%', icon: Calendar, color: 'bg-green-500' },
    { label: 'Total Revenue', value: '₹45.2L', change: '+15%', icon: DollarSign, color: 'bg-purple-500' },
    { label: 'Avg Rating', value: '4.9', change: '+0.2', icon: Star, color: 'bg-orange-500' },
  ];

  const recentBookings = [
    { id: 'BK001', trip: 'Bali Paradise', customer: 'John Doe', amount: '₹89,999', status: 'confirmed', date: '2024-01-15' },
    { id: 'BK002', trip: 'Swiss Alps', customer: 'Jane Smith', amount: '₹1,59,999', status: 'pending', date: '2024-01-14' },
    { id: 'BK003', trip: 'Tokyo Cultural', customer: 'Mike Johnson', amount: '₹1,29,999', status: 'confirmed', date: '2024-01-13' },
    { id: 'BK004', trip: 'Leh Ladakh', customer: 'Sarah Wilson', amount: '₹15,999', status: 'cancelled', date: '2024-01-12' },
    { id: 'BK005', trip: 'Kerala Backwaters', customer: 'David Brown', amount: '₹25,999', status: 'completed', date: '2024-01-11' },
  ];

  const topTrips = [
    { name: 'Bali Paradise Getaway', bookings: 324, rating: 4.9, revenue: '₹28.8L' },
    { name: 'Swiss Alps Adventure', bookings: 187, rating: 4.8, revenue: '₹29.9L' },
    { name: 'Tokyo Cultural Experience', bookings: 456, rating: 4.9, revenue: '₹59.2L' },
  ];

  const recentUsers = [
    { name: 'Alice Cooper', email: 'alice@example.com', joined: '2024-01-15', bookings: 3 },
    { name: 'Bob Wilson', email: 'bob@example.com', joined: '2024-01-14', bookings: 1 },
    { name: 'Carol Davis', email: 'carol@example.com', joined: '2024-01-13', bookings: 2 },
  ];

  const reviews = [
    { id: 1, customer: 'John Doe', trip: 'Bali Paradise', rating: 5, comment: 'Amazing experience!', status: 'approved', date: '2024-01-15' },
    { id: 2, customer: 'Jane Smith', trip: 'Swiss Alps', rating: 4, comment: 'Great trip, loved the mountains.', status: 'pending', date: '2024-01-14' },
    { id: 3, customer: 'Mike Johnson', trip: 'Tokyo Cultural', rating: 5, comment: 'Perfect cultural immersion.', status: 'approved', date: '2024-01-13' },
  ];

  const enquiries = [
    { id: 1, name: 'Sarah Wilson', email: 'sarah@example.com', subject: 'Group booking inquiry', message: 'Hi, I want to book for 15 people...', status: 'unread', date: '2024-01-15' },
    { id: 2, name: 'David Brown', email: 'david@example.com', subject: 'Custom itinerary', message: 'Can you create a custom package for...', status: 'replied', date: '2024-01-14' },
  ];

  const [newTrip, setNewTrip] = useState({
    title: '',
    location: '',
    duration: '',
    groupSize: '',
    price: 0,
    originalPrice: 0,
    category: '',
    description: '',
    highlights: [''],
    itinerary: [''],
    included: [''],
    excluded: [''],
    difficulty: 'Easy' as const,
    bestTime: '',
    image: '',
    gallery: [''],
    featured: false,
  });

  const handleAddTrip = () => {
    if (newTrip.title && newTrip.location && newTrip.price) {
      addTrip({
        ...newTrip,
        rating: 4.5,
        reviews: 0,
        highlights: newTrip.highlights.filter(h => h.trim() !== ''),
        itinerary: newTrip.itinerary.filter(i => i.trim() !== ''),
        included: newTrip.included.filter(i => i.trim() !== ''),
        excluded: newTrip.excluded.filter(e => e.trim() !== ''),
        gallery: newTrip.gallery.filter(g => g.trim() !== ''),
      });
      setShowAddTripModal(false);
      setNewTrip({
        title: '',
        location: '',
        duration: '',
        groupSize: '',
        price: 0,
        originalPrice: 0,
        category: '',
        description: '',
        highlights: [''],
        itinerary: [''],
        included: [''],
        excluded: [''],
        difficulty: 'Easy',
        bestTime: '',
        image: '',
        gallery: [''],
        featured: false,
      });
    }
  };

  const handleEditTrip = (trip: Trip) => {
    setEditingTrip(trip);
    setNewTrip(trip);
    setShowAddTripModal(true);
  };

  const handleUpdateTrip = () => {
    if (editingTrip && newTrip.title && newTrip.location && newTrip.price) {
      updateTrip(editingTrip.id, {
        ...newTrip,
        highlights: newTrip.highlights.filter(h => h.trim() !== ''),
        itinerary: newTrip.itinerary.filter(i => i.trim() !== ''),
        included: newTrip.included.filter(i => i.trim() !== ''),
        excluded: newTrip.excluded.filter(e => e.trim() !== ''),
        gallery: newTrip.gallery.filter(g => g.trim() !== ''),
      });
      setShowAddTripModal(false);
      setEditingTrip(null);
      setNewTrip({
        title: '',
        location: '',
        duration: '',
        groupSize: '',
        price: 0,
        originalPrice: 0,
        category: '',
        description: '',
        highlights: [''],
        itinerary: [''],
        included: [''],
        excluded: [''],
        difficulty: 'Easy',
        bestTime: '',
        image: '',
        gallery: [''],
        featured: false,
      });
    }
  };

  const handleDeleteTrip = (tripId: string) => {
    if (window.confirm('Are you sure you want to delete this trip?')) {
      deleteTrip(tripId);
    }
  };

  const addArrayField = (field: keyof typeof newTrip, value: string = '') => {
    setNewTrip(prev => ({
      ...prev,
      [field]: [...(prev[field] as string[]), value]
    }));
  };

  const updateArrayField = (field: keyof typeof newTrip, index: number, value: string) => {
    setNewTrip(prev => ({
      ...prev,
      [field]: (prev[field] as string[]).map((item, i) => i === index ? value : item)
    }));
  };

  const removeArrayField = (field: keyof typeof newTrip, index: number) => {
    setNewTrip(prev => ({
      ...prev,
      [field]: (prev[field] as string[]).filter((_, i) => i !== index)
    }));
  };

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'trips', label: 'Trips', icon: MapPin },
    { id: 'bookings', label: 'Bookings', icon: Calendar },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'reviews', label: 'Reviews', icon: Star },
    { id: 'enquiries', label: 'Enquiries', icon: MessageSquare },
    { id: 'banners', label: 'Banners', icon: Image },
    { id: 'promotions', label: 'Promotions', icon: Tag },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': case 'approved': case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': case 'unread': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': case 'rejected': return 'bg-red-100 text-red-800';
      case 'replied': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderDashboard = () => (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-medium text-green-600">{stat.change}</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
            <p className="text-gray-600">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Bookings */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Bookings</h3>
          <div className="space-y-4">
            {recentBookings.slice(0, 5).map((booking) => (
              <div key={booking.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-semibold text-gray-900">{booking.customer}</p>
                  <p className="text-sm text-gray-600">{booking.trip}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{booking.amount}</p>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                    {booking.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Trips */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Top Performing Trips</h3>
          <div className="space-y-4">
            {topTrips.map((trip, index) => (
              <div key={trip.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-semibold text-gray-900">{trip.name}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>{trip.bookings} bookings</span>
                    <span className="flex items-center">
                      <Star className="w-4 h-4 text-orange-400 mr-1" />
                      {trip.rating}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{trip.revenue}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Users */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Recent User Signups</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Name</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Email</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Joined</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Bookings</th>
              </tr>
            </thead>
            <tbody>
              {recentUsers.map((user) => (
                <tr key={user.email} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">{user.name}</td>
                  <td className="py-3 px-4 text-gray-600">{user.email}</td>
                  <td className="py-3 px-4 text-gray-600">{user.joined}</td>
                  <td className="py-3 px-4">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                      {user.bookings}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderTrips = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Trip Management</h2>
        <button
          onClick={() => setShowAddTripModal(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>Add New Trip</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Trip</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Location</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Duration</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Price</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Rating</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Status</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {trips.map((trip) => (
                <tr key={trip.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <img
                        src={trip.image}
                        alt={trip.title}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <p className="font-semibold text-gray-900">{trip.title}</p>
                        <p className="text-sm text-gray-600">{trip.category}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-600">{trip.location}</td>
                  <td className="py-4 px-6 text-gray-600">{trip.duration}</td>
                  <td className="py-4 px-6">
                    <div>
                      <p className="font-semibold text-gray-900">₹{trip.price.toLocaleString()}</p>
                      {trip.originalPrice && (
                        <p className="text-sm text-gray-500 line-through">₹{trip.originalPrice.toLocaleString()}</p>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-orange-400" />
                      <span className="text-gray-900">{trip.rating}</span>
                      <span className="text-gray-500">({trip.reviews})</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      trip.featured ? 'bg-orange-100 text-orange-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {trip.featured ? 'Featured' : 'Regular'}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEditTrip(trip)}
                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors duration-200"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteTrip(trip.id)}
                        className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors duration-200"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderBookings = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Booking Management</h2>
        <div className="flex items-center space-x-4">
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center space-x-2">
            <Download size={16} />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="rounded border-gray-300"
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedBookings(recentBookings.map(b => b.id));
                  } else {
                    setSelectedBookings([]);
                  }
                }}
              />
              <span className="text-sm text-gray-600">Select All</span>
            </div>
            {selectedBookings.length > 0 && (
              <div className="flex items-center space-x-2">
                <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                  Bulk Update
                </button>
                <button className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700">
                  Delete Selected
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">
                  <input type="checkbox" className="rounded border-gray-300" />
                </th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Booking ID</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Trip</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Customer</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Amount</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Date</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Status</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentBookings.map((booking) => (
                <tr key={booking.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300"
                      checked={selectedBookings.includes(booking.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedBookings([...selectedBookings, booking.id]);
                        } else {
                          setSelectedBookings(selectedBookings.filter(id => id !== booking.id));
                        }
                      }}
                    />
                  </td>
                  <td className="py-4 px-6 font-mono text-sm">{booking.id}</td>
                  <td className="py-4 px-6">{booking.trip}</td>
                  <td className="py-4 px-6">{booking.customer}</td>
                  <td className="py-4 px-6 font-semibold">{booking.amount}</td>
                  <td className="py-4 px-6 text-gray-600">{booking.date}</td>
                  <td className="py-4 px-6">
                    <select
                      value={booking.status}
                      className={`px-3 py-1 rounded-full text-sm font-medium border-0 ${getStatusColor(booking.status)}`}
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="cancelled">Cancelled</option>
                      <option value="completed">Completed</option>
                    </select>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors duration-200">
                        <Eye size={16} />
                      </button>
                      <button className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors duration-200">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
      
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">User</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Email</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Join Date</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Bookings</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Status</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentUsers.map((user) => (
                <tr key={user.email} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-semibold">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <span className="font-semibold text-gray-900">{user.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-600">{user.email}</td>
                  <td className="py-4 px-6 text-gray-600">{user.joined}</td>
                  <td className="py-4 px-6">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                      {user.bookings}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      Active
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors duration-200">
                        <Eye size={16} />
                      </button>
                      <button className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors duration-200">
                        <Shield size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderReviews = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Reviews & Testimonials</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-1">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-orange-400 fill-current" />
                ))}
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(review.status)}`}>
                {review.status}
              </span>
            </div>
            
            <p className="text-gray-700 mb-4">"{review.comment}"</p>
            
            <div className="border-t pt-4">
              <p className="font-semibold text-gray-900">{review.customer}</p>
              <p className="text-sm text-gray-600">{review.trip}</p>
              <p className="text-xs text-gray-500 mt-1">{review.date}</p>
            </div>
            
            <div className="flex items-center space-x-2 mt-4">
              <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200 text-sm">
                Approve
              </button>
              <button className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors duration-200 text-sm">
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderEnquiries = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Customer Enquiries</h2>
      
      <div className="space-y-4">
        {enquiries.map((enquiry) => (
          <div key={enquiry.id} className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-gray-900">{enquiry.subject}</h3>
                <p className="text-sm text-gray-600">From: {enquiry.name} ({enquiry.email})</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(enquiry.status)}`}>
                  {enquiry.status}
                </span>
                <span className="text-sm text-gray-500">{enquiry.date}</span>
              </div>
            </div>
            
            <p className="text-gray-700 mb-4">{enquiry.message}</p>
            
            <div className="flex items-center space-x-2">
              <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm">
                Reply
              </button>
              <button className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors duration-200 text-sm">
                Archive
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderBanners = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Banner Management</h2>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2">
          <Plus size={20} />
          <span>Add New Banner</span>
        </button>
      </div>
      
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Homepage Hero Banners</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-4">
              <img src="https://images.pexels.com/photos/1174732/pexels-photo-1174732.jpeg?auto=compress&cs=tinysrgb&w=100&h=60&fit=crop" alt="Banner" className="w-16 h-10 rounded object-cover" />
              <div>
                <h4 className="font-semibold">Luxury Paradise Banner</h4>
                <p className="text-sm text-gray-600">Active • Position 1</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg">
                <Edit size={16} />
              </button>
              <button className="p-2 text-red-600 hover:bg-red-100 rounded-lg">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPromotions = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Promotions & Offers</h2>
        <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center space-x-2">
          <Plus size={20} />
          <span>Create Promotion</span>
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Early Bird Discount</h3>
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">Active</span>
          </div>
          <p className="text-gray-600 mb-4">20% off on bookings made 60 days in advance</p>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-green-600">20% OFF</span>
            <div className="flex space-x-2">
              <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg">
                <Edit size={16} />
              </button>
              <button className="p-2 text-red-600 hover:bg-red-100 rounded-lg">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold mb-4">General Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Site Name</label>
              <input type="text" defaultValue="Just Merit" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Contact Email</label>
              <input type="email" defaultValue="hello@justmerit.com" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Save Changes
            </button>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Appearance</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                <option>Light</option>
                <option>Dark</option>
                <option>Auto</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Primary Color</label>
              <input type="color" defaultValue="#2563eb" className="w-full h-10 border border-gray-300 rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return renderDashboard();
      case 'trips': return renderTrips();
      case 'bookings': return renderBookings();
      case 'users': return renderUsers();
      case 'reviews': return renderReviews();
      case 'enquiries': return renderEnquiries();
      case 'banners': return renderBanners();
      case 'promotions': return renderPromotions();
      case 'settings': return renderSettings();
      default: return renderDashboard();
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50 flex">
        {/* Sidebar */}
        <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:static lg:inset-0`}>
          <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
            <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              <X size={20} />
            </button>
          </div>
          
          <nav className="mt-6">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-6 py-3 text-left hover:bg-gray-100 transition-colors duration-200 ${
                  activeTab === item.id ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' : 'text-gray-700'
                }`}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
          
          {/* User Profile */}
          <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold">
                  {user?.name?.split(' ').map(n => n[0]).join('') || 'A'}
                </span>
              </div>
              <div>
                <p className="font-semibold text-gray-900">{user?.name}</p>
                <p className="text-sm text-gray-600">Administrator</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 lg:ml-0">
          {/* Header */}
          <header className="bg-white shadow-sm border-b border-gray-200">
            <div className="flex items-center justify-between h-16 px-6">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
                >
                  <Menu size={20} />
                </button>
                <h2 className="text-xl font-semibold text-gray-900 capitalize">
                  {activeTab === 'dashboard' ? 'Dashboard Overview' : `${activeTab} Management`}
                </h2>
              </div>
              
              <div className="flex items-center space-x-4">
                <button className="p-2 rounded-lg hover:bg-gray-100 relative">
                  <Bell size={20} />
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    3
                  </span>
                </button>
              </div>
            </div>
          </header>

          {/* Content */}
          <main className="p-6">
            {renderContent()}
          </main>
        </div>

        {/* Add/Edit Trip Modal */}
        <AnimatePresence>
          {showAddTripModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
              onClick={() => {
                setShowAddTripModal(false);
                setEditingTrip(null);
              }}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  {editingTrip ? 'Edit Trip' : 'Add New Trip'}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                    <input
                      type="text"
                      value={newTrip.title}
                      onChange={(e) => setNewTrip({...newTrip, title: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Trip title"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                    <input
                      type="text"
                      value={newTrip.location}
                      onChange={(e) => setNewTrip({...newTrip, location: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Destination"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                    <input
                      type="text"
                      value={newTrip.duration}
                      onChange={(e) => setNewTrip({...newTrip, duration: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., 7 Days"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Group Size</label>
                    <input
                      type="text"
                      value={newTrip.groupSize}
                      onChange={(e) => setNewTrip({...newTrip, groupSize: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., 12 people"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Price (₹)</label>
                    <input
                      type="number"
                      value={newTrip.price}
                      onChange={(e) => setNewTrip({...newTrip, price: parseInt(e.target.value) || 0})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Price"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Original Price (₹)</label>
                    <input
                      type="number"
                      value={newTrip.originalPrice}
                      onChange={(e) => setNewTrip({...newTrip, originalPrice: parseInt(e.target.value) || 0})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Original price (optional)"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select
                      value={newTrip.category}
                      onChange={(e) => setNewTrip({...newTrip, category: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select category</option>
                      <option value="Adventure">Adventure</option>
                      <option value="Beach & Culture">Beach & Culture</option>
                      <option value="Cultural">Cultural</option>
                      <option value="Luxury">Luxury</option>
                      <option value="Wildlife">Wildlife</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
                    <select
                      value={newTrip.difficulty}
                      onChange={(e) => setNewTrip({...newTrip, difficulty: e.target.value as 'Easy' | 'Moderate' | 'Challenging'})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="Easy">Easy</option>
                      <option value="Moderate">Moderate</option>
                      <option value="Challenging">Challenging</option>
                    </select>
                  </div>
                </div>
                
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={newTrip.description}
                    onChange={(e) => setNewTrip({...newTrip, description: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Trip description"
                  />
                </div>
                
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                  <input
                    type="url"
                    value={newTrip.image}
                    onChange={(e) => setNewTrip({...newTrip, image: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Main image URL"
                  />
                </div>
                
                <div className="mt-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <input
                      type="checkbox"
                      checked={newTrip.featured}
                      onChange={(e) => setNewTrip({...newTrip, featured: e.target.checked})}
                      className="rounded border-gray-300"
                    />
                    <label className="text-sm font-medium text-gray-700">Featured Trip</label>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-4 mt-8">
                  <button
                    onClick={() => {
                      setShowAddTripModal(false);
                      setEditingTrip(null);
                    }}
                    className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={editingTrip ? handleUpdateTrip : handleAddTrip}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    {editingTrip ? 'Update Trip' : 'Add Trip'}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  );
};

export default AdminDashboard;