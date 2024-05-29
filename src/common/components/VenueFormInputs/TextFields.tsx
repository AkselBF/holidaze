import React from 'react';
import { Controller, Control, FieldError, UseFormSetError, UseFormClearErrors } from 'react-hook-form';
import { StyledTextField, StyledTextArea } from '../StyledComponents';
import { VenueFormData } from '../../interfaces/Venue/venueFormInputs';

interface TextFieldsProps {
  control: Control<VenueFormData>;
  errors: { name?: FieldError, description?: FieldError };
  setError: UseFormSetError<VenueFormData>;
  clearErrors: UseFormClearErrors<VenueFormData>;
}

const TextFields: React.FC<TextFieldsProps> = ({ control, setError, clearErrors }) => {
  return (
    <>
      <div className='w-[80%] mx-auto text-white pt-8 pb-1'>
        <Controller
          name="name"
          control={control}
          defaultValue=""
          rules={{ required: 'Name needed', minLength: { value: 3, message: 'Name must be at least 3 characters' } }}
          render={({ field, fieldState }) => (
            <StyledTextField
              {...field}
              label="Name"
              variant="outlined"
              type="text"
              required
              fullWidth
              autoComplete="off"
              error={!!fieldState.error}
              helperText={fieldState.error ? fieldState.error.message : ' '}
              onChange={(e) => {
                field.onChange(e);
                if (e.target.value.length < 3) {
                  setError('name', { type: 'manual', message: 'Name must be at least 3 characters' });
                } else {
                  clearErrors('name');
                }
              }}
              onBlur={() => {
                if (field.value.length < 3) {
                  setError('name', { type: 'manual', message: 'Name must be at least 3 characters' });
                } else {
                  clearErrors('name');
                }
              }}
            />
          )}
        />
      </div>

      <div className='w-[80%] mx-auto text-white py-1'>
        <Controller
          name="description"
          control={control}
          defaultValue=""
          rules={{ required: 'Description needed', minLength: { value: 16, message: 'Description must be at least 16 characters' } }}
          render={({ field, fieldState }) => (
            <>
              <StyledTextArea
                {...field}
                id="description"
                required
                autoComplete="off"
                placeholder='Description'
                className="w-full h-24"
                onChange={(e) => {
                  field.onChange(e);
                  if (e.target.value.length < 16) {
                    setError('description', { type: 'manual', message: 'Description must be at least 16 characters' });
                  } else {
                    clearErrors('description');
                  }
                }}
                onBlur={() => {
                  if (field.value.length < 16) {
                    setError('description', { type: 'manual', message: 'Description must be at least 16 characters' });
                  } else {
                    clearErrors('description');
                  }
                }}
              />
              {fieldState.error && <p className="text-sm text-red-500">{fieldState.error.message}</p>}
            </>
          )}
        />
      </div>
    </>
  );
};

export default TextFields;