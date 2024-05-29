import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form';
import { Button, ThemeProvider } from '@mui/material';
import { useAuthStore } from '../../storage/authStore';
import { Venue } from '../../interfaces/Venue/venueInterface';
import { VenueFormData } from '../../interfaces/Venue/venueFormInputs';
import { url, apiKey } from '../../constants/apiUrl';
import { theme } from '../StyledComponents';
import ScrollLock from '../ScrollLock';
import '../../components/Scrollbars/FormsScrollbar.css';
import TextFields from '../VenueFormInputs/TextFields';
import MediaField from '../VenueFormInputs/MediaField';
import NumberFields from '../VenueFormInputs/NumberFields';
import LocationFields from '../VenueFormInputs/LocationFields';
import MetaField from '../VenueFormInputs/MetaField';

interface UpdateVenueFormProps {
  isOpen: boolean;
  onClose: () => void;
  venue: Venue;
  onUpdate: () => void;
}

const UpdateVenueForm: React.FC<UpdateVenueFormProps> = ({ isOpen, onClose, venue, onUpdate }) => {
  const { control, handleSubmit, formState: { errors }, setValue, setError, clearErrors } = useForm<VenueFormData>({
    defaultValues: {
      media: [{ url: "", alt: "" }],
      meta: {
        wifi: false,
        parking: false,
        breakfast: false,
        pets: false,
      },
      location: {
        city: '',
        country: '',
        continent: '',
      },
    }
  });

  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "media",
  });

  const { user } = useAuthStore();
  const [lockScroll] = useState(true);

  useEffect(() => {
    if (venue) {
      setValue('name', venue.name || '');
      setValue('description', venue.description || '');
      if (venue.media && venue.media.length > 0) {
        replace(venue.media);
      }
      setValue('price', venue.price ? venue.price.toString() : '');
      setValue('maxGuests', venue.maxGuests ? venue.maxGuests.toString() : '');
      setValue('rating', venue.rating ? venue.rating.toString() : '');

      if (venue.location) {
        setValue('location.city', venue.location.city || '');
        setValue('location.country', venue.location.country || '');
        setValue('location.continent', venue.location.continent || '');
      }

      if (venue.meta) {
        setValue('meta.wifi', venue.meta.wifi || false);
        setValue('meta.parking', venue.meta.parking || false);
        setValue('meta.breakfast', venue.meta.breakfast || false);
        setValue('meta.pets', venue.meta.pets || false);
      }
    }
  }, [venue, setValue, replace]);

  const onSubmit: SubmitHandler<VenueFormData> = async (data) => {
    const requestData = {
      name: data.name,
      description: data.description,
      media: (data.media || []).filter(({ url }) => url !== ''),
      price: data.price ? parseFloat(data.price) : 0,
      maxGuests: data.maxGuests ? parseFloat(data.maxGuests) : 0,
      rating: data.rating ? parseFloat(data.rating) : 0,
      meta: {
        wifi: data.meta?.wifi || false,
        parking: data.meta?.parking || false,
        breakfast: data.meta?.breakfast || false,
        pets: data.meta?.pets || false,
      },
      location: {
        city: data.location?.city || '',
        country: data.location?.country || '',
        continent: data.location?.continent || '',
      },
    };

    try {
      if (!user?.token) {
        throw new Error('User is not authenticated');
      }

      const response = await fetch(`${url}/venues/${venue.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
          'X-Noroff-API-Key': apiKey,
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error('Failed to update venue');
      }

      onUpdate();
      onClose();
    } 
    catch (error) {
      console.error('Error updating venue:', error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <ScrollLock lock={lockScroll} />
      <div className="modal-overlay">
        {isOpen && (
          <div className="modal-container scrollbar-form w-[90%] h-[70%] overflow-y-auto">
            <h3 className='text-[#FF5C00] text-2xl font-semibold text-center mt-3'>Update Venue</h3>
            <button className="close-button text-white text-xl bg-red-500 py-0.5 px-2 rounded-full" onClick={onClose}>&times;</button>
            <form className='text-white flex flex-col' onSubmit={handleSubmit(onSubmit)}>
              {/* Name, Description */}
              <TextFields control={control} errors={errors} setError={setError} clearErrors={clearErrors} />

              {/* Media inputs */}
              <MediaField control={control} fields={fields} append={append} remove={remove} />

              {/* Price, MaxGuests, Rating */}
              <NumberFields control={control} errors={errors} setError={setError} clearErrors={clearErrors} />

              {/* Location details */}
              <div className='w-[80%] mx-auto text-white py-3'>
                <h3 className='mb-3 font-semibold'>Location:</h3>
                <LocationFields control={control} />
              </div>

              {/* Meta details */}
              <div className='w-[80%] mx-auto text-white py-3'>
                <h3 className='mb-1 font-semibold'>Venue features:</h3>
                <div className="meta-checkboxes flex flex-row space-x-3">
                  <MetaField control={control} />
                </div>
              </div>

              <div className='mx-auto justify-center text-center w-full my-6'>
                <Button type="submit" variant="contained" color="secondary" className='w-[50%] mx-auto'>Confirm</Button>
              </div>
              
            </form>
          </div>
        )}
      </div>
    </ThemeProvider>
  );
};

export default UpdateVenueForm;