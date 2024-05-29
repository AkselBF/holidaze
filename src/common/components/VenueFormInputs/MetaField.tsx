import React from 'react';
import { Controller, Control } from 'react-hook-form';
import { StyledCheckbox } from '../StyledComponents';
import { VenueFormData } from '../../interfaces/Venue/venueFormInputs';

interface MetaFieldProps {
  control: Control<VenueFormData>;
}

const MetaField: React.FC<MetaFieldProps> = ({ control }) => {
  return (
    <>
      <div>
        <Controller
          name="meta.wifi"
          control={control}
          defaultValue={false}
          render={({ field }) => (
            <>
              <StyledCheckbox {...field} checked={field.value} />
              <label>Wifi</label>
            </>
          )}
        />
      </div>

      <div>
        <Controller
          name="meta.parking"
          control={control}
          defaultValue={false}
          render={({ field }) => (
            <>
              <StyledCheckbox {...field} checked={field.value} />
              <label>Parking</label>
            </>
          )}
        />
      </div>

      <div>
        <Controller
          name="meta.breakfast"
          control={control}
          defaultValue={false}
          render={({ field }) => (
            <>
              <StyledCheckbox {...field} checked={field.value} />
              <label>Breakfast</label>
            </>
          )}
        />
      </div>

      <div>
        <Controller
          name="meta.pets"
          control={control}
          defaultValue={false}
          render={({ field }) => (
            <>
              <StyledCheckbox {...field} checked={field.value} />
              <label>Pets</label>
            </>
          )}
        />
      </div>
    </>
  );
};

export default MetaField;