import React from 'react';
import { Controller, Control, UseFormSetError, UseFormClearErrors, FieldErrors } from 'react-hook-form';
import { StyledTextField } from '../StyledComponents';
import { VenueFormData } from '../../interfaces/Venue/venueFormInputs';
import { handleNumberInput } from '../HandleNumberInput';

interface NumberFieldsProps {
  control: Control<VenueFormData>;
  setError: UseFormSetError<VenueFormData>;
  clearErrors: UseFormClearErrors<VenueFormData>;
  errors: FieldErrors<VenueFormData>;
}

const NumberFields: React.FC<NumberFieldsProps> = ({ control, setError, clearErrors }) => {
  return (
    <div className='w-[80%] space-x-2 flex flex-row mx-auto text-white mt-6 py-1'>
      <div className='text-white'>
        <Controller
          name="price"
          control={control}
          defaultValue=""
          rules={{ 
            required: 'Required', 
            min: { value: 0, message: 'Min 0' }, 
            max: { value: 99999, message: 'Max 99999' } 
          }}
          render={({ field, fieldState }) => (
            <StyledTextField
              {...field}
              label="Price"
              variant="outlined"
              type="number"
              required
              fullWidth
              autoComplete="off"
              error={!!fieldState.error}
              helperText={fieldState.error ? fieldState.error.message : ' '}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                handleNumberInput(e, 0, 99999, 0);
                field.onChange(e);
                if (e.target.value === '' || parseFloat(e.target.value) < 0 || parseFloat(e.target.value) > 99999) {
                  setError('price', { type: 'manual', message: 'Price must be between 0 and 99999' });
                } else {
                  clearErrors('price');
                }
              }}
              onBlur={() => {
                if (field.value === '' || parseFloat(field.value) < 0 || parseFloat(field.value) > 99999) {
                  setError('price', { type: 'manual', message: 'Price must be between 0 and 99999' });
                } else {
                  clearErrors('price');
                }
              }}
              inputProps={{ 
                min: 0, 
                max: 99999, 
                onWheel: (e) => e.currentTarget.blur() 
              }}
            />
          )}
        />
      </div>

      <div className='text-white w-[80px]'>
        <Controller
          name="maxGuests"
          control={control}
          defaultValue=""
          rules={{ 
            required: 'Required', 
            min: { value: 1, message: 'Min 1' }, 
            max: { value: 12, message: 'Max 12' } 
          }}
          render={({ field, fieldState }) => (
            <StyledTextField
              {...field}
              label="Max Guests"
              variant="outlined"
              type="number"
              required
              fullWidth
              autoComplete="off"
              error={!!fieldState.error}
              helperText={fieldState.error ? fieldState.error.message : ' '}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                handleNumberInput(e, 1, 12, 0);
                field.onChange(e);
                if (e.target.value === '' || parseFloat(e.target.value) < 1 || parseFloat(e.target.value) > 12) {
                  setError('maxGuests', { type: 'manual', message: 'Max Guests must be between 1 and 12' });
                } else {
                  clearErrors('maxGuests');
                }
              }}
              onBlur={() => {
                if (field.value === '' || parseFloat(field.value) < 1 || parseFloat(field.value) > 12) {
                  setError('maxGuests', { type: 'manual', message: 'Max Guests must be between 1 and 12' });
                } else {
                  clearErrors('maxGuests');
                }
              }}
              inputProps={{ 
                min: 1, 
                max: 12, 
                onWheel: (e) => e.currentTarget.blur()
              }}
            />
          )}
        />
      </div>

      <div className='text-white w-[80px]'>
        <Controller
          name="rating"
          control={control}
          defaultValue=""
          rules={{ 
            required: 'Required', 
            min: { value: 0, message: 'Min 0' }, 
            max: { value: 5, message: 'Max 5' } 
          }}
          render={({ field, fieldState }) => (
            <StyledTextField
              {...field}
              label="Rating"
              variant="outlined"
              type="number"
              required
              fullWidth
              autoComplete="off"
              error={!!fieldState.error}
              helperText={fieldState.error ? fieldState.error.message : ' '}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                handleNumberInput(e, 0, 5, 1); // Allow one decimal place
                field.onChange(e);
                if (e.target.value === '' || parseFloat(e.target.value) < 0 || parseFloat(e.target.value) > 5) {
                  setError('rating', { type: 'manual', message: 'Rating must be between 0 and 5' });
                } else {
                  clearErrors('rating');
                }
              }}
              onBlur={() => {
                if (field.value === '' || parseFloat(field.value) < 0 || parseFloat(field.value) > 5) {
                  setError('rating', { type: 'manual', message: 'Rating must be between 0 and 5' });
                } else {
                  clearErrors('rating');
                }
              }}
              inputProps={{ 
                min: 0, 
                max: 5, 
                step: 0.1, 
                onWheel: (e) => e.currentTarget.blur() 
              }}
            />
          )}
        />
      </div>
    </div>
  );
};

export default NumberFields;