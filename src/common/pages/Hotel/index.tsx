import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { url } from '../../constants/apiUrl';
import { useAuthStore } from '../../storage/authStore';
/*
import StarIcon from '../../images/starIcon.png';
import HalfStarIcon from '../../images/halfStarIcon.png';
import EmptyStarIcon from '../../images/emptyStarIcon.png';
*/
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Allowed from '../../images/allowed.png';
import Unallowed from '../../images/unallowed.png';

import StarIcon from '@mui/icons-material/Star';
import WifiIcon from '@mui/icons-material/Wifi';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import FreeBreakfastIcon from '@mui/icons-material/FreeBreakfast';
import PetsIcon from '@mui/icons-material/Pets';
//import ManIcon from '@mui/icons-material/Man';
//import WomanIcon from '@mui/icons-material/Woman';
//import BoyIcon from '@mui/icons-material/Boy';
//import GirlIcon from '@mui/icons-material/Girl';

import LoginModal from './LoginModal';

interface Venue {
  id: string;
  name: string;
  description: string;
  media: { url: string; alt: string }[];
  rating: number;
  price: number;
  location: { country: string; city: string };
  meta: { wifi: boolean; parking: boolean; breakfast: boolean; pets: boolean };
}

const Hotel: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [venue, setVenue] = useState<Venue | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { user } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVenueDetails = async () => {
      try {
        const response = await fetch(`${url}/venues/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product details');
        }
        const responseData = await response.json();
        const fetchedVenue = responseData.data;
        setVenue(fetchedVenue);
      } catch (error) {
        console.error('Error fetching venue details:', error);
      }
    };

    fetchVenueDetails();
  }, [id]);

  /*
  const renderRatingStars = (rating: number) => {
    const totalStars = 5;
    const fullStars = Math.floor(rating / 2);
    const halfStars = rating % 2 === 0 ? 0 : 1;
  
    const stars = [];
  
    for (let i = 0; i < fullStars; i++) {
      stars.push(<img key={`star-${i}`} src={StarIcon} alt="star" />);
    }
  
    if (halfStars === 1) {
      stars.push(<img key="half-star" src={HalfStarIcon} alt="half star" />);
    }
  
    for (let i = stars.length; i < totalStars; i++) {
      stars.push(<img key={`empty-star-${i}`} src={EmptyStarIcon} alt="empty star" />);
    }
  
    return stars;
  };*/

  const handleBookVenue = () => {
    if (user) {
      // Redirect to booking page for the specific venue
      // You can use react-router-dom's history or Link component for navigation
      
      //navigate(`/booking/${id}`);
      navigate(`/booking/${id}`, { state: { venue } });
    } else {
      setIsLoginModalOpen(true);
    }
  };

  if (!venue) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className='h-[3px] bg-[#ADADAD] w-[80%] justify-center mx-auto my-5'></div>
      <div className='flex flex-row relative mb-5'>
        <h1 className='text-3xl text-center font-semibold justify-center mx-auto'>{venue.name}</h1>
        <div className='absolute right-[10%] top-2 flex flex-row'>
          <LocationOnIcon />
          <p className='ml-2'> {venue.location.city}, {venue.location.country}</p>
        </div>
      </div>
      {/*
      <div className='flex flex-row justify-center my-5'>
        {renderRatingStars(venue.rating)}
      </div>
      */}
      
      <div className='px-[10%] flex flex-col md:flex-row'>
        <img src={venue.media.length > 0 ? venue.media[0].url : ''} alt={venue.name} 
        className='w-[50%] max-h-[280px] object-cover' />
        <div className='w-[50%] ml-6 relative'>
          <div className="flex flex-row space-x-8">
            <div className='flex flex-row'>
              <StarIcon />
              <p className='ml-2 font-semibold text-[#FF5C00]'>{venue.rating}</p>
            </div>
            <div className='flex flex-row'>
              <WifiIcon />
              <p className='ml-2'>{venue.meta.wifi ? <img className="h-6" src={Allowed} alt="Allowed" /> : <img className="h-6" src={Unallowed} alt="Not allowed" />}</p>
            </div>
            <div className='flex flex-row'>
              <LocalParkingIcon />
              <p className='ml-2'>{venue.meta.parking ? <img className="h-6" src={Allowed} alt="Allowed" /> : <img className="h-6" src={Unallowed} alt="Not allowed" />}</p>
            </div>
            <div className='flex flex-row'>
              <FreeBreakfastIcon />
              <p className='ml-2'>{venue.meta.breakfast ? <img className="h-6" src={Allowed} alt="Allowed" /> : <img className="h-6" src={Unallowed} alt="Not allowed" />}</p>
            </div>
            <div className='flex flex-row'>
              <PetsIcon />
              <p className='ml-2'>{venue.meta.pets ? <img className="h-6" src={Allowed} alt="Allowed" /> : <img className="h-6" src={Unallowed} alt="Not allowed" />}</p>
            </div>
          </div>
          <p>{venue.description}</p>
          <p className='font-semibold'>Price: {venue.price} kr,-</p>
          <button 
            onClick={handleBookVenue} 
            className='absolute bottom-0 right-0 bg-black text-white font-semibold py-2 px-12 rounded-lg'
          >
            Book venue
          </button>
        </div>
      </div>
      {isLoginModalOpen && <LoginModal onClose={() => setIsLoginModalOpen(false)} id={id || ''} />}
    </div>
  );
};

export default Hotel;