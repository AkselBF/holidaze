import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form';
import { Button, ThemeProvider } from '@mui/material';
import { useAuthStore } from '../../storage/authStore';
import { useVenuesStore } from '../../storage/venuesStore';
import { VenueFormData } from '../../interfaces/Venue/venueFormInputs';
import { url, apiKey } from '../../constants/apiUrl';
import { theme } from '../StyledComponents';
import ScrollLock from '../ScrollLock';
import '../../components/Scrollbars/FormsScrollbar.css';
import './InputArrows.css';
import TextFields from '../VenueFormInputs/TextFields';
import MediaField from '../VenueFormInputs/MediaField';
import NumberFields from '../VenueFormInputs/NumberFields';
import LocationFields from '../VenueFormInputs/LocationFields';
import MetaField from '../VenueFormInputs/MetaField';

interface AddVenueFormProps {
  onClose: () => void;
  onAdd: () => void;
}

const AddVenueForm: React.FC<AddVenueFormProps> = ({ onClose, onAdd }) => {
  const { control, handleSubmit, formState: { errors }, watch, setError, clearErrors } = useForm<VenueFormData>({
    defaultValues: {
      media: [{ url: "", alt: "" }],
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "media",
  });

  const nameValue = watch('name', '');
  const descriptionValue = watch('description', '');
  const priceValue = watch('price', '');
  const maxGuestsValue = watch('maxGuests', '');
  const ratingValue = watch('rating', '');
  const mediaValues = watch('media', [{ url: '', alt: '' }]);

  const { fetchVenues } = useVenuesStore();
  const user = useAuthStore();

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [lockScroll] = useState(true);

  const onSubmit: SubmitHandler<VenueFormData> = async (data) => {
    if (data.name.length < 3) {
      setError('name', { type: 'manual', message: 'Name must be at least 4 characters' });
      return;
    }

    const requestData = {
      name: data.name,
      description: data.description,
      media: (data.media || []).filter(({ url }) => url !== ''),
      price: parseFloat(data.price),
      maxGuests: parseFloat(data.maxGuests),
      rating: parseFloat(data.rating),
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
      if (user && user.token) {
        const response = await fetch(`${url}/venues`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`,
            'X-Noroff-API-Key': apiKey,
          },
          body: JSON.stringify(requestData),
        });

        if (!response.ok) {
          console.error('Failed to add venue:', response.statusText);
          return;
        }

        await fetchVenues();
        onAdd();
        onClose();
      }
    } catch (error) {
      console.error('Error adding venue:', error);
    }
  };

  useEffect(() => {
    const isFormValid =
      nameValue.length >= 3 &&
      descriptionValue.length >= 16 &&
      priceValue !== '' &&
      maxGuestsValue !== '' &&
      ratingValue !== '' &&
      (mediaValues || []).every(({ url }) => {
        const mediaUrl = url || '';
        return mediaUrl === '' || /\.(jpg|jpeg|png|gif|bmp)$/i.test(mediaUrl);
      }) &&
      !errors.name &&
      !errors.description &&
      !errors.price &&
      !errors.maxGuests &&
      !errors.rating;

    setIsButtonDisabled(!isFormValid);
  }, [
    nameValue,
    descriptionValue,
    mediaValues,
    priceValue,
    maxGuestsValue,
    ratingValue,
    errors
  ]);

  return (
    <ThemeProvider theme={theme}>
      <ScrollLock lock={lockScroll} />
      <div className="modal-overlay">
        <div className="modal-container scrollbar-form w-[90%] h-[70%] overflow-y-auto">
          <h3 className='text-[#FF5C00] text-2xl font-semibold text-center mt-3'>Add Venue</h3>
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

            {/*<button type="submit">Submit</button>*/}
            <div className='mx-auto justify-center text-center w-full my-6'>
              <Button 
                type="submit" 
                variant="contained" 
                color="secondary" 
                className='w-[50%] mx-auto' 
                disabled={isButtonDisabled}
                style={{ 
                  opacity: isButtonDisabled ? 1 : 1,
                  backgroundColor: isButtonDisabled ? '#FF5C0080' : theme.palette.secondary.main,
                }}>
                  Confirm
              </Button>
            </div>
            
          </form>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default AddVenueForm;