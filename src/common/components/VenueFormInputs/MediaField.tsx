import React from 'react';
import { Controller, Control, FieldArrayWithId, UseFieldArrayAppend, UseFieldArrayRemove } from 'react-hook-form';
import { StyledTextField } from '../StyledComponents';
import { VenueFormData } from '../../interfaces/Venue/venueFormInputs';

interface MediaFieldProps {
  control: Control<VenueFormData>;
  fields: FieldArrayWithId<VenueFormData, "media", "id">[];
  append: UseFieldArrayAppend<VenueFormData, "media">;
  remove: UseFieldArrayRemove;
}

const MediaField: React.FC<MediaFieldProps> = ({ control, fields, append, remove }) => {
  return (
    <>
      {fields.map((item, index) => (
        <div key={item.id} className='w-[80%] mx-auto text-white py-2 flex items-center'>
          <Controller
            name={`media.${index}.url`}
            control={control}
            defaultValue={item.url || ""}
            rules={{
              validate: (value) => !value || /\.(jpg|jpeg|png|gif|bmp)$/i.test(value) || 'Invalid URL or file type',
            }}
            render={({ field, fieldState }) => (
              <StyledTextField
                {...field}
                label={`Media URL ${index + 1}`}
                type='text'
                variant="outlined"
                fullWidth
                error={!!fieldState.error}
                helperText={fieldState.error ? fieldState.error.message : ''}
              />
            )}
          />
          <Controller
            name={`media.${index}.alt`}
            control={control}
            defaultValue={item.alt || ""}
            render={({ field }) => (
              <StyledTextField {...field} label={`Image Alt Text ${index + 1}`} variant="outlined" className='w-full' />
            )}
          />
          {index > 0 && ( // Hide delete button for the first field
            <button
              type="button"
              onClick={() => remove(index)}
              className="text-white text-3xl font-bold bg-red-500 hover:bg-red-700 px-3 h-12 rounded-r-lg"
            >
              -
            </button>
          )}
        </div>
      ))}

      {fields.length < 6 && (
        <div className='w-[80%] mx-auto text-white py-3'>
          <button
            type="button"
            onClick={() => append({ url: "", alt: "" })}
            className="text-blue-500 hover:text-blue-700"
          >
            Add Another Image
          </button>
        </div>
      )}
    </>
  );
};

export default MediaField;