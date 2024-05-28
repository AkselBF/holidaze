import React, { useEffect } from 'react';

const ScrollLock: React.FC<{ lock: boolean }> = ({ lock }) => {
  useEffect(() => {
    const handleScroll = (event: Event) => {
      if (lock) {
        event.preventDefault();
        event.stopPropagation();
      }
    };

    if (lock) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('scroll', handleScroll, { passive: false });
    } else {
      document.body.style.overflow = '';
      document.removeEventListener('scroll', handleScroll);
    }

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('scroll', handleScroll);
    };
  }, [lock]);

  return null;
};

export default ScrollLock;