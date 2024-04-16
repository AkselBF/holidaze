import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './common/components/Layout/index';
import Home from './common/pages/Home/index';
import Venues from './common/pages/Venues/index';
import Hotel from './common/pages/Hotel/index';
import Booking from './common/pages/Booking/index';
import Success from './common/pages/Success/index';
import Login from './common/pages/Login/index';
import Profile from './common/pages/Profile/index';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/venues" element={<Venues />} />
          <Route path="/hotel" element={<Hotel />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/success" element={<Success />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
