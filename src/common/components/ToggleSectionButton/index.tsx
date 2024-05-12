import React from 'react';

interface ToggleSectionButtonProps {
  onClick: () => void;
  showBookings: boolean;
}

const ToggleSectionButton: React.FC<ToggleSectionButtonProps> = ({ onClick, showBookings }) => {
  return (
    <button className='text-white text-lg font-semibold bg-black w-[200px] h-[50px] rounded-lg md:mr-[5%] mt-10 md:mt-24 mx-auto' onClick={onClick}>
      {showBookings ? 'Venues' : 'Bookings'}
    </button>
  );
};

export default ToggleSectionButton;