import React, { useState, useEffect } from 'react';
import { url } from '../../constants/apiUrl';
import { Link } from 'react-router-dom';
import { useVenuesStore } from '../../storage/venuesStore';
import { Venue } from '../../interfaces/Venue/venueInterface';
import RatingStars from '../../components/RatingStars';

import VenueFilters from './VenueFilters/index';
import Pagination from './Pagination/index';

import '../../Fonts/Fonts.css';

import venuesHero from '../../images/hotelBg.png';
import noImage from '../../images/no_image.png';

import LocationOnIcon from '@mui/icons-material/LocationOn';

const Venues: React.FC = () => {
  const { fetchVenues } = useVenuesStore();
  const [venues, setVenues] = useState<Venue[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [filteredVenues, setFilteredVenues] = useState<Venue[]>(venues);
  const [selectedCountry, setSelectedCountry] = useState<string>('Default');
  const [selectedGuests, setSelectedGuests] = useState<number>(0);
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [selectedPriceRange, setSelectedPriceRange] = useState<[number, number]>([0, 0]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isWifiChecked, setIsWifiChecked] = useState<boolean>(false);
  const [isParkingChecked, setIsParkingChecked] = useState<boolean>(false);
  const [isBreakfastChecked, setIsBreakfastChecked] = useState<boolean>(false);
  const [isPetsChecked, setIsPetsChecked] = useState<boolean>(false);

  useEffect(() => {
    fetchVenues();
  }, [fetchVenues]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${url}/venues?page=${currentPage}&sort=created&_bookings=true`);
        const data = await response.json();
        setVenues(data.data);
        setTotalPages(data.meta.pageCount);
      } 
      catch (error) {
        console.error('Error fetching venues:', error);
      }
    };
  
    fetchData();

    return () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
  }, [currentPage]);

  useEffect(() => {
    let filtered = venues.filter(venue => {
      return venue.media.some(media => {
        return media.url && media.url.trim() !== '' && media.alt && media.alt.trim() !== '';
      });
    });

    if (selectedCountry !== 'Default') {
      filtered = filtered.filter(venue => venue.location.country === selectedCountry);
    }

    if (selectedGuests !== 0) {
      filtered = filtered.filter(venue => venue.maxGuests === selectedGuests);
    }

    if (selectedRating !== 0) {
      filtered = filtered.filter(venue => venue.rating >= selectedRating && venue.rating < selectedRating + 1);
    }

    if (selectedPriceRange[0] !== 0) {
      filtered = filtered.filter(venue => venue.price >= selectedPriceRange[0] && venue.price <= selectedPriceRange[1]);
    }

    if (searchQuery.trim() !== '') {
      filtered = filtered.filter(venue => venue.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    if (isWifiChecked) {
      filtered = filtered.filter(venue => venue.meta.wifi);
    }

    if (isParkingChecked) {
      filtered = filtered.filter(venue => venue.meta.parking);
    }

    if (isBreakfastChecked) {
      filtered = filtered.filter(venue => venue.meta.breakfast);
    }

    if (isPetsChecked) {
      filtered = filtered.filter(venue => venue.meta.pets);
    }

    setFilteredVenues(filtered);
  }, [venues, selectedCountry, selectedGuests, selectedRating, selectedPriceRange, searchQuery, isWifiChecked, isParkingChecked, isBreakfastChecked, isPetsChecked]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleImageLoadError = (venueId: string) => {
    setFilteredVenues(prevVenues => prevVenues.filter(venue => venue.id !== venueId));
  };

  return (
    <div className='justify-center text-center'>
      <img src={venuesHero} alt="venues hero" className='w-full min-h-[260px] max-h-[580px] object-cover -mt-[80px]' />
      <div className='-mt-16 z-40'>
        <VenueFilters
          venues={venues}
          onChangeCountry={setSelectedCountry}
          onChangeGuests={setSelectedGuests}
          onChangeRating={setSelectedRating}
          onChangePriceRange={setSelectedPriceRange}
          onSearch={setSearchQuery}
          onFilterWifi={setIsWifiChecked}
          onFilterParking={setIsParkingChecked}
          onFilterBreakfast={setIsBreakfastChecked}
          onFilterPets={setIsPetsChecked}
        />
      </div>
      
      <ul className='text-left w-[90%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-center mt-20 mb-6 xl:my-5 mx-auto'>
      {filteredVenues.length > 0 ? (
        filteredVenues.map((venue) => (
          <li key={venue.id} className='relative mx-auto my-1 w-full min-w-[240px] max-w-[380px] bg-white rounded-lg'>
            <Link to={`/venues/${venue.id}`}>
              <div className='absolute right-0 bg-[#171717cc] rounded-tr-lg rounded-bl-lg'>
                <p className='text-white font-semibold px-8 py-2 text-center'>Bookings: {venue.bookings.length}</p>
              </div>
              <img 
                src={venue.media.length > 0 ? venue.media[0].url : noImage} 
                alt={venue.name} 
                className='w-full min-w-[240px] max-w-[380px] h-[180px] object-cover rounded-t-lg' 
                onError={() => handleImageLoadError(venue.id)}
               />
              <h2 className='inria-serif-regular text-center text-xl font-semibold my-3 line-clamp-1 w-[60%] mx-auto'>{venue.name}</h2>
              <div className='flex flex-row justify-center my-3 h-6'>
                {RatingStars(venue.rating)}
              </div>
              <p className='line-clamp-2 h-[48px] px-5 my-3 w-[93%]'>{venue.description}</p>
              <div className='text-white flex flex-row justify-between bg-[#171717] px-5 py-3 rounded-b-lg'>
                <div className='flex flex-row w-[50%]'>
                  <LocationOnIcon />
                  <p className='line-clamp-1 ml-2'>{venue.location.country}, {venue.location.city}</p>
                </div>
                <p className='line-clamp-1 font-bold text-[#FF5C00]'>{venue.price} kr,-</p>
              </div>
            </Link>
          </li>
        ))
      ) : (
        venues.map((venue) => (
          <li key={venue.id} className='relative mx-auto my-4 w-full min-w-[240px] max-w-[380px] bg-white rounded-lg'>
            <Link to={`/venues/${venue.id}`}>
              <div className='absolute right-0 bg-[#171717cc] rounded-tr-lg rounded-bl-lg'>
                <p className='text-white font-semibold px-8 py-2 text-center'>Bookings: </p>
              </div>
              <img 
                src={venue.media.length > 0 ? venue.media[0].url : noImage} 
                alt={venue.name} 
                className='w-full min-w-[240px] max-w-[380px] h-[180px] object-cover rounded-t-lg' 
                onError={() => handleImageLoadError(venue.id)}
               />
              <h2 className='text-center text-xl font-semibold my-3'>{venue.name}</h2>
              <div className='flex flex-row justify-center my-3 h-6'>
                {RatingStars(venue.rating)}
              </div>
              <p className='line-clamp-2 h-[48px] px-5 my-3'>{venue.description}</p>
              <div className='text-white flex flex-row justify-between bg-[#171717] px-5 py-3 rounded-b-lg'>
                <div className='flex flex-row w-[50%]'>
                  <LocationOnIcon />
                  <p className='line-clamp-1 ml-2'>{venue.location.country}, {venue.location.city}</p>
                </div>
                <p className='line-clamp-1 font-bold text-[#FF5C00]'>{venue.price} kr,-</p>
              </div>
            </Link>
          </li>
        ))
      )}
      </ul>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onNextPage={handleNextPage}
        onPreviousPage={handlePreviousPage}
      />
    </div>
  );
};

export default Venues;

/*
const [isLoading, setIsLoading] = useState(true);
const [isError, setIsError] = useState(false);

useEffect(() => {
    const img = new Image();
    img.src = venue.media[0]?.url;
    img.alt = venue.media[0]?.alt;
    img.onload = () => setIsLoading(false);
    img.onerror = () => setIsError(true);
  }, [venue]);

  if (isError) {
    return null;
  }
});
*/