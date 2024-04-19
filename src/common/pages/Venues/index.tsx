import React, { useEffect } from 'react';
import { useVenuesStore } from '../../storage/venuesStore';

const Venues: React.FC = () => {
  const { venues, fetchVenues } = useVenuesStore();

  useEffect(() => {
    fetchVenues();
  }, [fetchVenues]);

  return (
    <div>
      <h1>Venues</h1>
      {venues.map((venue) => (
        <div key={venue.id}>
          <h2>{venue.name}</h2>
          <p>{venue.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Venues;