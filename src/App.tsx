import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './common/components/Layout/index';
import Home from './common/pages/Home/index';
import Venues from './common/pages/Venues/index';
import Hotel from './common/pages/Hotel/index';
import Booking from './common/pages/Booking/index';
import Success from './common/pages/Success/index';
import Login from './common/pages/Login/index';
import Profile from './common/pages/Profile/index';
import { useAuthStore } from './common/storage/authStore';

const App: React.FC = () => {
  const { user } = useAuthStore();

  const handleNewBooking = () => {
    console.log('New booking made!');
  };

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/venues" element={<Venues />} />
          <Route path="/venues/:id" element={<Hotel />} />
          <Route path="/booking/:id" element={<Booking onNewBooking={handleNewBooking} user={user} />} />
          <Route path="/success" element={<Success />} />
          <Route path="/login" element={user ? <Navigate to="/profile" /> : <Login />} />
          <Route path="/profiles/:name" element={user ? <Profile /> : <Navigate to="/login" />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
