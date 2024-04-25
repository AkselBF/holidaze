import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useVenuesStore } from '../../storage/venuesStore';

import venuesHero from '../../images/hotelBg.png';
import noImage from '../../images/no_image.png';
import StarIcon from '../../images/starIcon.png';
import HalfStarIcon from '../../images/halfStarIcon.png';
import EmptyStarIcon from '../../images/emptyStarIcon.png';

//import LocationOnIcon from '@mui/icons-material/LocationOn';

const Venues: React.FC = () => {
  const { venues, fetchVenues } = useVenuesStore();

  useEffect(() => {
    fetchVenues();
  }, [fetchVenues]);

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
  };

  return (
    <div className='justify-center text-center'>
      <img src={venuesHero} alt="venues hero" className='w-full min-h-[260px] max-h-[580px] object-cover -mt-[80px]' />
      <ul className='text-left w-[90%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-center my-5 mx-auto'>
        {venues.map((venue) => (
          <li key={venue.id} className='mx-auto my-4 w-[300px] bg-white rounded-b-lg'>
            <Link to={`/venues/${venue.id}`}>
              <img 
                src={venue.media.length > 0 ? venue.media[0].url : noImage} 
                alt={venue.name} 
                className='w-[300px] h-[180px] object-cover rounded-t-lg'
               />
              <h2 className='text-center text-xl font-semibold my-3'>{venue.name}</h2>
              <div className='flex flex-row justify-center my-3'>
                {renderRatingStars(venue.rating)}
              </div>
              <p className='line-clamp-2 h-[48px] px-5 my-3'>{venue.description}</p>
              <div className='text-white flex flex-row justify-between bg-[#171717] px-5 py-3 rounded-b-lg'>
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