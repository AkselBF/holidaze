import React from 'react';
import { Controller, Control } from 'react-hook-form';
import { StyledTextField } from '../StyledComponents';
import { VenueFormData } from '../../interfaces/Venue/venueFormInputs';

interface LocationFieldsProps {
  control: Control<VenueFormData>;
}

const LocationFields: React.FC<LocationFieldsProps> = ({ control }) => {
  return (
    <div className='location-inputs space-x-2 flex flex-row'>
      <Controller
        name="location.city"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <StyledTextField {...field} label="City" variant="outlined" fullWidth />
        )}
      />

      <Controller
        name="location.country"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <StyledTextField {...field} label="Country" variant="outlined" fullWidth />
        )}
      />

      <Controller
        name="location.continent"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <StyledTextField {...field} label="Continent" variant="outlined" fullWidth />
        )}
      />
    </div>
  );
};

export default LocationFields;