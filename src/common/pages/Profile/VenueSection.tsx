import React, {useState} from 'react';
import AddVenueForm from '../../components/Forms/AddVenueForm';

import HotelRoundedIcon from '@mui/icons-material/HotelRounded';

/*
interface VenueSectionProps {
  // Define any props needed for the VenueSection component
}*/

const VenueSection: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleAddVenue = () => {
    openModal();
  };
  
  return (
    <div className='mt-10'>
      <div className='w-[90%] text-white mx-auto bg-[#171717cc] px-10 py-5 rounded-xl'>
        <h2 className='text-xl font-semibold'>My venues</h2>
        <div className='w-[50%] h-[2px] bg-[#ADADAD] rounded-full mt-2 mb-5'></div>
        <div className='flex flex-row items-end'>
          <div className='w-[50%]'>
            <p>Review any venues you have made as venue manager. All those successfully made will be kept in your profile in this part of the page.</p>
            <p>To close the venues, simply press the close button on the far right corner of this part.</p>
          </div>
          <div className='w-[50%] text-right'>
            <button className='relative bg-[#FF5C00] p-6 rounded-full' onClick={handleAddVenue}>
              <HotelRoundedIcon style={{ fontSize: '2rem' }} className='absolute text-black top-[20%] left-[18%]' />
              <p className='absolute font-bold text-3xl top-[30%] left-[50%]'>+</p>
            </button>
          </div>
        </div>
        
        <div className='w-[95%] h-1 bg-[#ADADAD] rounded-full my-5'></div>
      </div>
      
      {showModal && <AddVenueForm onClose={closeModal} />}
      {/* List of added venues */}
      <div className='px-10 mx-auto grid-cols-3'></div>
    </div>
  );
};

export default VenueSection;