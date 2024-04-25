import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { url } from '../../constants/apiUrl';

import StarIcon from '../../images/starIcon.png';
import HalfStarIcon from '../../images/halfStarIcon.png';
import EmptyStarIcon from '../../images/emptyStarIcon.png';

interface Venue {
  id: string;
  name: string;
  description: string;
  media: { url: string; alt: string }[];
  rating: number;
  price: number;
  location: { country: string; city: string };
}

const Hotel: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [venue, setVenue] = useState<Venue | null>(null);

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

  if (!venue) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className='h-[3px] bg-[#ADADAD] w-[80%] justify-center mx-auto'></div>
      <div className='flex flex-row relative'>
        <h1 className='text-3xl text-center font-semibold justify-center mx-auto'>{venue.name}</h1>
        <p className='absolute right-[10%] top-2'>Location: {venue.location.city}, {venue.location.country}</p>
      </div>
      <div className='flex flex-row justify-center my-5'>
        {renderRatingStars(venue.rating)}
      </div>
      <div className='px-[10%] flex flex-col md:flex-row'>
        <img src={venue.media.length > 0 ? venue.media[0].url : ''} alt={venue.name} 
        className='w-[50%]' />
        <div className='w-[50%] ml-6'>
          <p>{venue.description}</p>
          <p>Price: {venue.price} kr,-</p>
        </div>
      </div>
    </div>
  );
};

export default Hotel;