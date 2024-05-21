import React, { useState } from 'react';
import { useAuthStore } from '../../storage/authStore';
import { useNavigate } from 'react-router-dom';
import './Modal.css';

const LoginModal: React.FC<{ onClose: () => void; id: string }> = ({ onClose, id }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { login } = useAuthStore();

  const handleLogin = async () => {
    try {
      await login(email, password);
      navigate(`/booking/${id}`);
      onClose();
    } 
    catch (error) {
      setError('Invalid email or password');
    }
  };

  const closeModal = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-container">
        <h2 className="text-2xl text-white font-semibold mb-4">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="modal-input"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="modal-input"
        />
        <button onClick={handleLogin} className="modal-confirm-button">
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginModal;