import React, { useState, useEffect } from 'react';
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
    } catch (error) {
      setError('Invalid email or password');
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
      <div className="modal-container w-[95%] sm:w-[400px]">
        <h2 className="text-2xl text-white text-center font-semibold mb-4">Login</h2>
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
        <div className='justify-center text-center'>
          <button onClick={handleLogin} className="modal-confirm-button font-semibold mt-3 px-16 mx-auto">
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;