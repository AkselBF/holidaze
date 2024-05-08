import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Venue, useVenuesStore } from '../../storage/venuesStore';

import VenueFilters from './VenueFilters/index';

import venuesHero from '../../images/hotelBg.png';
import noImage from '../../images/no_image.png';
import StarIcon from '../../images/starIcon.png';
import HalfStarIcon from '../../images/halfStarIcon.png';
import EmptyStarIcon from '../../images/emptyStarIcon.png';

import LocationOnIcon from '@mui/icons-material/LocationOn';

const Venues: React.FC = () => {
  const { venues, fetchVenues } = useVenuesStore();
  const [filteredVenues, setFilteredVenues] = useState<Venue[]>(venues);
  const [selectedCountry, setSelectedCountry] = useState<string>('Default');
  const [selectedGuests, setSelectedGuests] = useState<number>(0);
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [selectedPriceRange, setSelectedPriceRange] = useState<[number, number]>([0, 0]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    fetchVenues();
  }, [fetchVenues]);

  useEffect(() => {
    let filtered = venues;

    // Filter by country
    if (selectedCountry !== 'Default') {
      filtered = filtered.filter(venue => venue.location.country === selectedCountry);
    }

    // Filter by max guests
    if (selectedGuests !== 0) {
      filtered = filtered.filter(venue => venue.maxGuests === selectedGuests);
    }

    // Filter by rating
    if (selectedRating !== 0) {
      filtered = filtered.filter(venue => venue.rating >= selectedRating && venue.rating < selectedRating + 1);
    }

    // Filter by price
    if (selectedPriceRange[0] !== 0) {
      filtered = filtered.filter(venue => venue.price >= selectedPriceRange[0] && venue.price <= selectedPriceRange[1]);
    }

    // Filter by search query
    if (searchQuery.trim() !== '') {
      filtered = filtered.filter(venue => venue.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    setFilteredVenues(filtered);
  }, [venues, selectedCountry, selectedGuests, selectedRating, selectedPriceRange, searchQuery]);

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
        />
      </div>
      
      <ul className='text-left w-[90%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-0 gap-y-4 justify-center my-5 mx-auto'>
      {filteredVenues.length > 0 ? (
        filteredVenues.map((venue) => (
          <li key={venue.id} className='mx-auto my-4 w-[300px] bg-white rounded-lg'>
            <Link to={`/venues/${venue.id}`}>
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
            </Link>
          </li>
        ))
      ) : (
        venues.map((venue) => (
          <li key={venue.id} className='mx-auto my-4 w-[300px] bg-white rounded-lg'>
            <Link to={`/venues/${venue.id}`}>
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
            </Link>
          </li>
        ))
      )}
      </ul>
    </div>
  );
};

export default Venues;