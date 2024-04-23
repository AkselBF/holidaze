import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { url } from '../../constants/apiUrl';

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

  if (!venue) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{venue.name}</h1>
      <p>{venue.description}</p>
      <img src={venue.media.length > 0 ? venue.media[0].url : ''} alt={venue.name} />
      <p>Rating: {venue.rating}</p>
      <p>Price: {venue.price} kr,-</p>
      <p>Location: {venue.location.city}, {venue.location.country}</p>
    </div>
  );
};

export default Hotel;