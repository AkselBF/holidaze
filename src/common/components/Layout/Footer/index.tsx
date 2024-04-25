import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#000000] text-white p-6">
      <div className="container mx-auto justify-between flex flex-col md:flex-row">
        <p className='justify-start mb-4 md:mb-0 md:mr-5'>&copy; 2024 Holidaze Accommodation Booking. All rights reserved.</p>
        <p className='justify-end md:ml-5'>Email: holidaze@gmail.com</p>
      </div>
    </footer>
  );
};

export default Footer;