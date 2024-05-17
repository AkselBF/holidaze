import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { url, apiKey } from '../../constants/apiUrl';
import { useAuthStore } from '../../storage/authStore';

import LocationOnIcon from '@mui/icons-material/LocationOn';
import Allowed from '../../images/allowed.png';
import Unallowed from '../../images/unallowed.png';

import StarIcon from '@mui/icons-material/Star';
import WifiIcon from '@mui/icons-material/Wifi';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import FreeBreakfastIcon from '@mui/icons-material/FreeBreakfast';
import PetsIcon from '@mui/icons-material/Pets';
import ManIcon from '@mui/icons-material/Man';
import WomanIcon from '@mui/icons-material/Woman';
import BoyIcon from '@mui/icons-material/Boy';
import GirlIcon from '@mui/icons-material/Girl';

import LoginModal from './LoginModal';

interface Customer {
  name: string;
  email: string;
  bio: string;
  avatar: {
    url: string;
    alt: string;
  };
  banner: {
    url: string;
    alt: string;
  };
}

interface Booking {
  id: string;
  dateFrom: string;
  dateTo: string;
  guests: number;
  created: string;
  updated: string;
  customer: Customer;
}

interface Venue {
  id: string;
  name: string;
  description: string;
  media: { url: string; alt: string }[];
  rating: number;
  price: number;
  location: { country: string; city: string };
  meta: { wifi: boolean; parking: boolean; breakfast: boolean; pets: boolean };
  owner: {
    name: string;
    email: string;
    bio: string;
    avatar: {
      url: string;
      alt: string;
    };
    banner: {
      url: string;
      alt: string;
    };
  };
  bookings: Booking[];
}

const Hotel: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [venue, setVenue] = useState<Venue | null>(null);
  //const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const discountedPrice = venue ? venue.price * 0.7 : 0;

  useEffect(() => {
    const fetchVenueDetails = async () => {
      try {
        const response = await fetch(`${url}/venues/${id}?_bookings=true`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user?.token}`,
            'X-Noroff-API-Key': apiKey,
          },
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch venue details');
        }
  
        const responseData = await response.json();
        const fetchedVenue = responseData.data;
        setVenue(fetchedVenue);
      } catch (error) {
        console.error('Error fetching venue details:', error);
      }
    };
  
    fetchVenueDetails();
  }, [id, user?.token]);

  const handleBookVenue = () => {
    if (user) {
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
      <div className='flex flex-row relative my-5'>
        <h1 className='text-3xl text-center font-semibold justify-center mx-auto'>{venue.name}</h1>
        <div className='absolute right-[10%] top-2 flex flex-row'>
          <LocationOnIcon />
          <p className='ml-2'> {venue.location.city}, {venue.location.country}</p>
        </div>
      </div>
      <div className='h-[3px] bg-[#ADADAD] w-[80%] justify-center mx-auto my-5'></div>
      
      <div className='px-[10%] flex flex-col md:flex-row'>
        <img src={venue.media.length > 0 ? venue.media[0].url : ''} alt={venue.name} 
        className='w-[50%] max-h-[280px] object-cover' />
        <div className='w-[50%] ml-6 relative'>
          <div className="flex flex-row space-x-10">
            <div className='flex flex-col space-y-1'>
              <p>Rating</p>
              <div className='flex flex-row'>
                <StarIcon />
                <p className='ml-2 font-semibold text-[#FF5C00]'>{venue.rating}</p>
              </div>
            </div>
            <div className='flex flex-col space-y-1'>
              <p>Wifi</p>
              <div className='flex flex-row'>
                <WifiIcon />
                <p className='ml-2'>{venue.meta.wifi ? <img className="h-6" src={Allowed} alt="Allowed" /> : <img className="h-6" src={Unallowed} alt="Not allowed" />}</p>
              </div>
            </div>
            <div className='flex flex-col space-y-1'>
              <p>Parking</p>
              <div className='flex flex-row'>
                <LocalParkingIcon />
                <p className='ml-2'>{venue.meta.parking ? <img className="h-6" src={Allowed} alt="Allowed" /> : <img className="h-6" src={Unallowed} alt="Not allowed" />}</p>
              </div>
            </div>
            <div className='flex flex-col space-y-1'>
              <p>Breakfast</p>
              <div className='flex flex-row'>
                <FreeBreakfastIcon />
                <p className='ml-2'>{venue.meta.breakfast ? <img className="h-6" src={Allowed} alt="Allowed" /> : <img className="h-6" src={Unallowed} alt="Not allowed" />}</p>
              </div>
            </div>
            <div className='flex flex-col space-y-1'>
              <p>Pets</p>
              <div className='flex flex-row'>
                <PetsIcon />
                <p className='ml-2'>{venue.meta.pets ? <img className="h-6" src={Allowed} alt="Allowed" /> : <img className="h-6" src={Unallowed} alt="Not allowed" />}</p>
              </div>
            </div>
          </div>
          <div className='my-5 flex flex-row space-x-10'>
            <div className='flex flex-col space-y-1'>
              <p>Price per adult</p>
              <div className='flex flex-row space-x-3'>
                <div className='flex flex-row -space-x-3'>
                  <ManIcon />
                  <WomanIcon className='border-r-[3px] border-r-[#ADADAD]' />
                </div>
                <p className='font-semibold text-[#FF5C00]'>{venue.price.toFixed(2)} kr,-</p>
              </div>
            </div>
            
            <div className='flex flex-col space-y-1'>
              <p>Price per child</p>
              <div className='flex flex-row space-x-3'>
                <div className='flex flex-row -space-x-3'>
                  <BoyIcon />
                  <GirlIcon className='border-r-[3px] border-r-[#ADADAD]' />
                </div>
                <p className="font-semibold text-[#FF5C00]">{discountedPrice.toFixed(2)} kr,-</p>
              </div>
            </div>
          </div>
          <p className='max-h-[72px] overflow-y-auto'>{venue.description}</p>
          <button 
            onClick={handleBookVenue} 
            className='absolute bottom-0 right-0 bg-black text-white font-semibold py-2 px-12 rounded-lg'
          >
            Book venue
          </button>
        </div>
      </div>

      {venue && (
      <div>
        <h2>Bookings</h2>
        <ul>
          {venue.bookings.map((booking) => (
            <li key={booking.id}>
              <p>Date From: {booking.dateFrom}</p>
              <p>Date To: {booking.dateTo}</p>
              <p>Guests: {booking.guests}</p>
              <p>Customer Name: {booking.customer.name}</p>
              <p>Customer Email: {booking.customer.email}</p>
            </li>
          ))}
        </ul>
      </div>
    )}

      {isLoginModalOpen && <LoginModal onClose={() => setIsLoginModalOpen(false)} id={id || ''} />}
    </div>
  );
};

export default Hotel;