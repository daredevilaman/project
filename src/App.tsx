import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider } from './contexts/AuthContext';
import { TripProvider } from './contexts/TripContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Trips from './pages/Trips';
import TripDetail from './pages/TripDetail';
import Booking from './pages/Booking';
import Profile from './pages/Profile';
import Contact from './pages/Contact';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import AdminDashboard from './pages/admin/AdminDashboard';
import ProtectedRoute from './components/auth/ProtectedRoute';
import LoadingScreen from './components/ui/LoadingScreen';
import { useLoading } from './hooks/useLoading';

function App() {
  const { isLoading } = useLoading();

  return (
    <AuthProvider>
      <TripProvider>
        <Router>
          <div className="min-h-screen bg-slate-50">
            <AnimatePresence mode="wait">
              {isLoading ? (
                <LoadingScreen key="loading" />
              ) : (
                <div key="app">
                  <Header />
                  <main>
                    <AnimatePresence mode="wait">
                      <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/trips" element={<Trips />} />
                        <Route path="/trip/:id" element={<TripDetail />} />
                        <Route path="/booking/:id" element={
                          <ProtectedRoute>
                            <Booking />
                          </ProtectedRoute>
                        } />
                        <Route path="/profile" element={
                          <ProtectedRoute>
                            <Profile />
                          </ProtectedRoute>
                        } />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/admin" element={
                          <ProtectedRoute adminOnly>
                            <AdminDashboard />
                          </ProtectedRoute>
                        } />
                      </Routes>
                    </AnimatePresence>
                  </main>
                  <Footer />
                </div>
              )}
            </AnimatePresence>
          </div>
        </Router>
      </TripProvider>
    </AuthProvider>
  );
}

export default App;