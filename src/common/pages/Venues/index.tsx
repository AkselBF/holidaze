import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useVenuesStore } from '../../storage/venuesStore';

import venuesHero from '../../images/hotelBg.png';
import noImage from '../../images/no_image.png'

const Venues: React.FC = () => {
  const { venues, fetchVenues } = useVenuesStore();

  useEffect(() => {
    fetchVenues();
  }, [fetchVenues]);

  return (
    <div className='justify-center text-center'>
      <img src={venuesHero} alt="venues hero" className='w-full min-h-[260px] max-h-[580px] object-cover -mt-[80px]' />
      <ul className='text-left w-[90%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-center my-5 mx-auto'>
        {venues.map((venue) => (
          <li key={venue.id} className='mx-auto my-4 w-[300px]'>
            <Link to={`/venues/${venue.id}`}>
              <img 
                src={venue.media.length > 0 ? venue.media[0].url : noImage} 
                alt={venue.name} 
                className='w-[300px] h-[180px] object-cover'
               />
              <h2>{venue.name}</h2>
              <p>{venue.rating}</p>
              <p className='line-clamp-2 h-[48px]'>{venue.description}</p>
              <div>
                <p>{venue.location.country}, {venue.location.city}</p>
                <p>{venue.price} kr,-</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Venues;

/*
src={(venue.media.length > 0 && isValidURL(venue.media[0].url)) ? venue.media[0].url : noImage}
const isValidURL = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
};*/