import React, { useState, useEffect } from 'react';
import AddVenueForm from '../../components/Forms/AddVenueForm';
import { useAuthStore } from '../../storage/authStore';
import { Venue } from '../../storage/venuesStore';
import { url, apiKey } from '../../constants/apiUrl';

import noImage from '../../images/no_image.png';
import StarIcon from '../../images/starIcon.png';
import HalfStarIcon from '../../images/halfStarIcon.png';
import EmptyStarIcon from '../../images/emptyStarIcon.png';

import LocationOnIcon from '@mui/icons-material/LocationOn';
import HotelRoundedIcon from '@mui/icons-material/HotelRounded';

/*
interface VenueSectionProps {
  // Define any props needed for the VenueSection component
}*/

const VenueSection: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [venues, setVenues] = useState<Venue[]>([]);
  const { user } = useAuthStore();

  const renderRatingStars = (rating: number) => {
    const totalStars = 5;
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    const stars = [];
  
    // Render full stars
    for (let i = 0; i < fullStars; i++) {
        stars.push(<img key={`star-${i}`} src={StarIcon} alt="star" />);
    }
  
    // Render half star if applicable
    if (hasHalfStar) {
        stars.push(<img key="half-star" src={HalfStarIcon} alt="half star" />);
    }
  
    // Render empty stars to fill the rest
    const emptyStars = totalStars - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
        stars.push(<img key={`empty-star-${i}`} src={EmptyStarIcon} alt="empty star" />);
    }
  
    return stars;
  };

  useEffect(() => {
    if (user && user.name) {
      fetchVenues();
    }
  }, [user]);

  const fetchVenues = async () => {
    try {
      if (!user || !user.name) {
        return;
      }
      const response = await fetch(`${url}/profiles/${user.name}/venues`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
          'X-Noroff-API-Key': apiKey,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch venues');
      }
      const data = await response.json();
      setVenues(data.data);
    } catch (error) {
      console.error('Error fetching venues:', error);
    }
  };

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

        {/* List of added venues */}
        <ul className='text-left text-black w-[90%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-0 gap-y-4 justify-center my-5 mx-auto'>
        {venues.length > 0 ? (
          venues.map((venue) => (
            <li key={venue.id} className='mx-auto my-4 w-[260px] bg-white rounded-lg'>
              <img 
                src={venue.media.length > 0 ? venue.media[0].url : noImage} 
                alt={venue.name} 
                className='w-[300px] h-[180px] object-cover rounded-t-lg'
              />
              <h2 className='text-center text-xl font-semibold my-3 line-clamp-1 w-[60%] mx-auto'>{venue.name}</h2>
              <div className='flex flex-row justify-center my-3 h-6'>
                {renderRatingStars(venue.rating)}
              </div>
              <p className='line-clamp-2 h-[48px] px-5 my-3'>{venue.description}</p>
              <div className='text-white flex flex-row justify-between bg-[#171717] px-5 py-3 rounded-b-lg'>
                <div className='flex flex-row w-[50%]'>
                  <LocationOnIcon />
                  <p className='line-clamp-1 ml-2'>{venue.location.country}, {venue.location.city}</p>
                </div>
                <p className='line-clamp-1'>{venue.price} kr,-</p>
              </div>
            </li>
          ))
        ) : (
          venues.map((venue) => (
            <li key={venue.id} className='mx-auto my-4 w-[300px] bg-white rounded-lg'>
              <img 
                src={venue.media.length > 0 ? venue.media[0].url : noImage} 
                alt={venue.name} 
                className='w-[300px] h-[180px] object-cover rounded-t-lg'
              />
              <h2 className='text-center text-xl font-semibold my-3'>{venue.name}</h2>
              <div className='flex flex-row justify-center my-3 h-6'>
                {renderRatingStars(venue.rating)}
              </div>
              <p className='line-clamp-2 h-[48px] px-5 my-3'>{venue.description}</p>
              <div className='text-white flex flex-row justify-between bg-[#171717] px-5 py-3 rounded-b-lg'>
                <div className='flex flex-row w-[50%]'>
                  <LocationOnIcon />
                  <p className='line-clamp-1 ml-2'>{venue.location.country}, {venue.location.city}</p>
                </div>
                <p className='line-clamp-1'>{venue.price} kr,-</p>
              </div>
            </li>
          ))
        )}
        </ul>
      </div>
      
      {showModal && <AddVenueForm onClose={closeModal} />}
    </div>
  );
};

export default VenueSection;