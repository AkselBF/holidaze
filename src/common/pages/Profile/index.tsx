import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../storage/authStore';

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  useEffect(() => {
    if (!user) {
      // If user state is null, redirect to login page
      navigate('/login');
    }
  }, [user, navigate]);

  return (
    <div>
      {user && (
        <div>
          <h1>Profile</h1>
          <p>Welcome, {user.name}!</p>
          <button onClick={logout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default Profile;