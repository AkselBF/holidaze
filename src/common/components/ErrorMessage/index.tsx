import React, { useState, useEffect } from 'react';

interface ErrorMessageProps {
  message: string;
  onClose: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return visible ? (
    <div className={`fixed top-[100px] left-1/2 transform -translate-x-1/2 bg-gray-200 rounded-md px-6 py-2 mb-4 transition-all duration-300 ${visible ? 'opacity-100' : 'opacity-0'}`}>
      <p className="text-md text-red-600">{message}</p>
    </div>
  ) : null;
};

export default ErrorMessage;