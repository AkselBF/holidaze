import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../../storage/authStore';
import { useNavigate } from 'react-router-dom';
import ScrollLock from '../ScrollLock';
import ErrorMessage from '../ErrorMessage';
import './Modal.css';

const LoginModal: React.FC<{ onClose: () => void; id: string }> = ({ onClose, id }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [lockScroll] = useState(true);

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Email and password are required');
      setTimeout(() => setError(''), 3000);
      return;
    }

    try {
      await login(email, password);
      const token = localStorage.getItem('accessToken');
      if (token) {
        navigate(`/booking/${id}`);
        onClose();
      } else {
        setError('Invalid email or password');
        setTimeout(() => setError(''), 3000);
      }
    } catch (error) {
      setError('Invalid email or password');
      setTimeout(() => setError(''), 3000);
    }
  };

  const closeModal = () => {
    onClose();
  };

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (e.target instanceof HTMLElement && !e.target.closest('.modal-container')) {
        document.addEventListener('mouseup', handleMouseUp);
      }
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (e.target instanceof HTMLElement && !e.target.closest('.modal-container')) {
        document.removeEventListener('mouseup', handleMouseUp);
        closeModal();
      }
    };

    document.addEventListener('mousedown', handleMouseDown);

    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, [closeModal]);

  return (
    <div className="modal-overlay">
      <ScrollLock lock={lockScroll} />
      <div className="modal-container w-[95%] sm:w-[400px]">
        <h2 className="text-2xl text-white text-center font-semibold mb-4">Login</h2>
        {error && <ErrorMessage message={error} onClose={() => setError('')} />}
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
        <div className="justify-center text-center">
          <button onClick={handleLogin} className="modal-confirm-button font-semibold mt-3 px-16 mx-auto">
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;