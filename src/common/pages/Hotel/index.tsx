import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../storage/authStore';
import { formatDate } from '../../components/DateFormatter/formatDate';
import { fetchVenueDetails } from '../../requests/Venues/venueDetails';
import { Venue } from '../../interfaces/Venue/venueInterface';
import LoginModal from '../../components/Modals/LoginModal';
import '../../components/Scrollbars/HotelScrollbar.css';
import '../../Fonts/Fonts.css';

import Allowed from '../../images/allowed.png';
import Unallowed from '../../images/unallowed.png';

import LocationOnIcon from '@mui/icons-material/LocationOn';
import StarIcon from '@mui/icons-material/Star';
import WifiIcon from '@mui/icons-material/Wifi';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import FreeBreakfastIcon from '@mui/icons-material/FreeBreakfast';
import PetsIcon from '@mui/icons-material/Pets';
import ManIcon from '@mui/icons-material/Man';
import WomanIcon from '@mui/icons-material/Woman';
import BoyIcon from '@mui/icons-material/Boy';
import GirlIcon from '@mui/icons-material/Girl';


const Hotel: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [venue, setVenue] = useState<Venue | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [primaryImage, setPrimaryImage] = useState<string>('');
  const [mediaSlideshowHeight, setMediaSlideshowHeight] = useState<number>(0);
  const discountedPrice = venue ? venue.price * 0.7 : 0;

  const mediaSlideshowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateMediaSlideshowHeight = () => {
      if (mediaSlideshowRef.current) {
        const slideshowHeight = mediaSlideshowRef.current.offsetHeight;
        setMediaSlideshowHeight(slideshowHeight);
      }
    };
  
    // Update height on mount and when the venue or primary image changes
    updateMediaSlideshowHeight();
    window.addEventListener('resize', updateMediaSlideshowHeight);
  
    return () => {
      window.removeEventListener('resize', updateMediaSlideshowHeight);
    };
  }, [venue, primaryImage]);
  
  const maxDescriptionHeight = mediaSlideshowHeight >= 290 ? 120 : 72;

  useEffect(() => {
    const fetchVenue = async () => {
      try {
        if (id) {
          const fetchedVenue = await fetchVenueDetails(id, user?.token ?? undefined);
          setVenue(fetchedVenue);
          if (fetchedVenue.media.length > 0) {
            setPrimaryImage(fetchedVenue.media[0].url);
          }
        }
      } catch (error) {
        console.error('Error fetching venue details:', error);
      }
    };

    fetchVenue();
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
      <div className='flex flex-col-reverse lg:flex-row relative my-5'>
        <h1 className='inria-serif-bold text-3xl text-center font-semibold mt-10 lg:mt-0 justify-center mx-auto w-[80%] lg:w-[40%] line-clamp-2'>{venue.name}</h1>
        <div className='absolute top-0 lg:top-2 right-[10%] flex flex-row w-[10%] line-clamp-1'>
          <LocationOnIcon />
          <p className='ml-2'> {venue.location.city}, {venue.location.country}</p>
        </div>
      </div>
      <div className='h-[3px] bg-[#ADADAD] w-[80%] justify-center mx-auto my-5'></div>
      
      <div className='w-[90%] md:w-[80%] mx-auto flex flex-col lg:flex-row'>
        <div ref={mediaSlideshowRef} className='media-slideshow w-full md:w-[80%] lg:w-[50%] mx-auto'>
          <img src={primaryImage} alt={venue.name} 
          className='w-full lg:max-h-[280px] lg:min-h-[280px] object-cover rounded-lg' />
          {venue.media.length > 1 && (
            <div className='scrollbar-hotel-desc mt-4 overflow-x-auto'>
              <div className='flex space-x-2'>
                {venue.media.map((mediaItem, index) => (
                  <img
                    key={index}
                    src={mediaItem.url}
                    alt={mediaItem.alt || `Venue Image ${index + 1}`}
                    className='h-20 w-28 min-w-28 object-cover cursor-pointer mb-3 rounded-md'
                    onClick={() => setPrimaryImage(mediaItem.url)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div className='w-full md:w-[80%] lg:w-[50%] mx-auto mt-6 lg:my-0 lg:ml-6 lg:mr-auto relative'>
          <div className="flex flex-col md:flex-row">
            <div className='flex flex-col space-y-1 mr-10 mb-5 md:mb-0'>
              <p>Rating</p>
              <div className='flex flex-row'>
                <StarIcon />
                <p className='ml-2 font-semibold text-[#FF5C00]'>{venue.rating.toFixed(1)}</p>
              </div>
            </div>
            <div className='flex flex-row mb-3 md:mb-0'>
              <div className='flex flex-col space-y-1 mr-8'>
                <p>Wifi</p>
                <div className='flex flex-row'>
                  <WifiIcon />
                  <p className='ml-2'>{venue.meta.wifi ? <img className="h-6 min-h-6 max-h-6 min-w-6 max-w-6" src={Allowed} alt="Allowed" /> : <img className="h-6 min-h-6 max-h-6 min-w-6 max-w-6" src={Unallowed} alt="Not allowed" />}</p>
                </div>
              </div>
              <div className='flex flex-col space-y-1 mr-8'>
                <p>Parking</p>
                <div className='flex flex-row'>
                  <LocalParkingIcon />
                  <p className='ml-2'>{venue.meta.parking ? <img className="h-6 min-h-6 max-h-6 min-w-6 max-w-6" src={Allowed} alt="Allowed" /> : <img className="h-6 min-h-6 max-h-6 min-w-6 max-w-6" src={Unallowed} alt="Not allowed" />}</p>
                </div>
              </div>
            </div>
            
            <div className='flex flex-row'>
              <div className='flex flex-col space-y-1 mr-8'>
                <p>Breakfast</p>
                <div className='flex flex-row'>
                  <FreeBreakfastIcon />
                  <p className='ml-2'>{venue.meta.breakfast ? <img className="h-6 min-h-6 max-h-6 min-w-6 max-w-6" src={Allowed} alt="Allowed" /> : <img className="h-6 min-h-6 max-h-6 min-w-6 max-w-6" src={Unallowed} alt="Not allowed" />}</p>
                </div>
              </div>
              <div className='flex flex-col space-y-1 mr-8'>
                <p>Pets</p>
                <div className='flex flex-row'>
                  <PetsIcon />
                  <p className='ml-2'>{venue.meta.pets ? <img className="h-6 min-h-6 max-h-6 min-w-6 max-w-6" src={Allowed} alt="Allowed" /> : <img className="h-6 min-h-6 max-h-6 min-w-6 max-w-6" src={Unallowed} alt="Not allowed" />}</p>
                </div>
              </div>
            </div>
          </div>
          <div className='my-8 md:my-5 flex flex-col sm:flex-row'>
            <div className='flex flex-col space-y-1 mr-10 mb-5 sm:mb-0'>
              <p>Price per adult</p>
              <div className='flex flex-row'>
                <div className='flex flex-row -space-x-3'>
                  <ManIcon />
                  <WomanIcon className='border-r-[3px] border-r-[#ADADAD]' />
                </div>
                <p className='font-semibold ml-3 text-[#FF5C00]'>{venue.price.toFixed(2)} kr,-</p>
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
          <p className={`scrollbar-hotel-desc max-h-[200px] lg:max-h-[${maxDescriptionHeight}px] overflow-y-auto px-2`}>
            {venue.description}
          </p>

          <div className='justify-end text-right'>
            <button 
              onClick={handleBookVenue} 
              className='lg:absolute lg:bottom-0 lg:right-0 mt-10 bg-black text-white font-semibold py-2 px-12 rounded-lg'
            >
              Book venue
            </button>
          </div>
        </div>
      </div>

      {venue && (
        <div className="w-[90%] md:w-[80%] mx-auto mt-16 mb-10 lg:my-10">
          <h3 className="text-xl font-semibold mb-4">Bookings</h3>
          {venue.bookings.length > 0 ? (
            <div className="space-y-4">
              {venue.bookings.map((booking) => (
                <div key={booking.id} className="p-4 border rounded-lg shadow-md">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Dates:</p>
                      <p className="text-lg font-medium">
                        {formatDate(booking.dateFrom)} - {formatDate(booking.dateTo)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Guests:</p>
                      <p className="text-lg font-medium">{booking.guests}</p>
                    </div>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm text-gray-600">Customer:</p>
                    <p className="text-lg font-medium">{booking.customer.name}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">This venue has not been booked yet.</p>
          )}
        </div>
      )}

      {isLoginModalOpen && <LoginModal onClose={() => setIsLoginModalOpen(false)} id={id || ''} />}
    </div>
  );
};

export default Hotel;