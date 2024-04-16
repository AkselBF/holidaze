import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#000000] text-white p-4 mt-auto">
      <div className="container mx-auto justify-between flex flex-row">
        <p className='justify-start mr-5'>&copy; 2024 Holidaze Accommodation Booking. All rights reserved.</p>
        <p className='justify-end ml-5'>Email: holidaze@gmail.com</p>
      </div>
    </footer>
  );
};

export default Footer;