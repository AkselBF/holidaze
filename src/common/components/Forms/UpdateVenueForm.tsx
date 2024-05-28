import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { Button, ThemeProvider } from '@mui/material';
import { useAuthStore } from '../../storage/authStore';
import { Venue } from '../../interfaces/Venue/venueInterface';
import { url, apiKey } from '../../constants/apiUrl';
import { theme, StyledTextField, StyledTextArea, StyledCheckbox } from '../StyledComponents';
import ScrollLock from '../ScrollLock';
import '../../components/Scrollbars/FormsScrollbar.css';

interface VenueFormData {
  name?: string;
  description?: string;
  media?: { url: string; alt?: string }[];
  price?: string;
  maxGuests?: string;
  rating?: string;
  meta?: {
    wifi?: boolean;
    parking?: boolean;
    breakfast?: boolean;
    pets?: boolean;
  };
  location?: {
    city?: string;
    country?: string;
    continent?: string;
  };
}

interface UpdateVenueFormProps {
  isOpen: boolean;
  onClose: () => void;
  venue: Venue;
  onUpdate: () => void;
}

const UpdateVenueForm: React.FC<UpdateVenueFormProps> = ({ isOpen, onClose, venue, onUpdate }) => {
  const { control, handleSubmit, setValue, formState: { errors } } = useForm<VenueFormData>();
  const user = useAuthStore();

  const [mediaFields, setMediaFields] = useState<{ url: string; alt?: string }[]>([]);
  const [lockScroll] = useState(true);

  useEffect(() => {
    if (venue) {
      setValue('name', venue.name || '');
      setValue('description', venue.description || '');
  
      if (venue.media && venue.media.length > 0) {
        setMediaFields(venue.media);
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
  }, [venue, setValue]);

  const onSubmit: SubmitHandler<VenueFormData> = async (data) => {
    const requestData = {
      name: data.name,
      description: data.description,
      media: mediaFields,
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

  const addMediaField = () => {
    if (mediaFields.length < 6) {
      setMediaFields([...mediaFields, { url: '', alt: '' }]);
    }
  };

  const removeMediaField = (index: number) => {
    const newMediaFields = [...mediaFields];
    newMediaFields.splice(index, 1);
    setMediaFields(newMediaFields);
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
              {/* Name */}
              <div className='w-[80%] mx-auto text-white pt-8 pb-3'>
                <Controller
                  name="name"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <StyledTextField {...field} label="Name" variant="outlined" className='w-full' />
                  )}
                />
                {errors.name && <p className="error">Name is required and must be at least 3 characters long</p>}
              </div>
              
              {/* Description */}
              <div className='w-[80%] mx-auto text-white py-3'>
                <Controller
                  name="description"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <StyledTextArea {...field} placeholder="Description" className='w-full' />
                  )}
                />
                {errors.description && <p className="error">Description is required and must be at least 16 characters long</p>}
              </div>

              {/* Media inputs */}
              {mediaFields.map((field, index) => (
                <div key={index} className='w-[80%] mx-auto text-white py-3 flex items-center'>
                  <Controller
                    name={`media.${index}.url`}
                    control={control}
                    defaultValue={field.url || ''}
                    render={({ field }) => (
                      <StyledTextField {...field} label={`Image URL ${index + 1}`} variant="outlined" type="url" className='w-full' />
                    )}
                  />
                  <Controller
                    name={`media.${index}.alt`}
                    control={control}
                    defaultValue={field.alt || ''}
                    render={({ field }) => (
                      <StyledTextField {...field} label={`Image Alt Text ${index + 1}`} variant="outlined" className='w-full' />
                    )}
                  />
                  <button
                    type="button"
                    onClick={() => removeMediaField(index)}
                    className="text-white text-3xl font-bold bg-red-500 hover:bg-red-700 px-5 h-12 rounded-r-lg"
                  >
                    -
                  </button>
                </div>
              ))}

              {mediaFields.length < 6 && (
                <div className='w-[80%] mx-auto text-white py-3'>
                  <button
                    type="button"
                    onClick={addMediaField}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Add Another Image
                  </button>
                </div>
              )}

              <div className='w-[80%] space-x-2 flex flex-row mx-auto text-white mt-6 py-3 '>
                {/* Price */}
                <div className='text-white'>
                  <Controller
                    name="price"
                    control={control}
                    defaultValue=''
                    render={({ field }) => (
                      <StyledTextField {...field} label="Price" variant="outlined" type="number" InputProps={{
                        inputProps: {
                          min: 0,
                          max: 10000,
                          step: 0.01,
                        },
                      }} />
                    )}
                  />
                  {errors.price && <p className="error">0 - 10000</p>}
                </div>

                {/* Max Guests */}
                <div className='text-white w-[80px]'>
                  <Controller
                    name="maxGuests"
                    control={control}
                    defaultValue=''
                    render={({ field }) => (
                      <StyledTextField {...field} label="Max guests" variant="outlined" type="number" InputProps={{
                        inputProps: {
                          min: 1,
                          max: 12,
                        },
                      }} />
                    )}
                  />
                  {errors.maxGuests && <p className="error">1 - 12</p>}
                </div>

                {/* Rating */}
                <div className='text-white w-[80px]'>
                  <Controller
                    name="rating"
                    control={control}
                    defaultValue=''
                    render={({ field }) => (
                      <StyledTextField {...field} label="Rating" variant="outlined" type="number" InputProps={{
                        inputProps: {
                          min: 0,
                          max: 5,
                          step: 0.1,
                        },
                      }} />
                    )}
                  />
                  {errors.rating && <p className="error">0 - 5</p>}
                </div>
              </div>

              {/* Location details */}
              <div className='w-[80%] mx-auto text-white py-3'>
                <h3 className='mb-3 font-semibold'>Location:</h3>
                <div className="location-inputs space-x-2">
                  <Controller
                    name="location.city"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <StyledTextField {...field} label="City" variant="outlined" />
                    )}
                  />
                  <Controller
                    name="location.country"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <StyledTextField {...field} label="Country" variant="outlined" />
                    )}
                  />
                  <Controller
                    name="location.continent"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <StyledTextField {...field} label="Continent" variant="outlined" />
                    )}
                  />
                </div>
              </div>

              {/* Meta details */}
              <div className='w-[80%] mx-auto text-white py-3'>
                <h3 className='mb-1 font-semibold'>Venue features:</h3>
                <div className="meta-checkboxes flex flex-row space-x-3">
                  <div>
                    <Controller
                      name="meta.wifi"
                      control={control}
                      defaultValue={venue.meta?.wifi || false}
                      render={({ field }) => (
                        <StyledCheckbox {...field} checked={field.value} />
                      )}
                    />
                    <label>Wifi</label>
                  </div>

                  <div>
                    <Controller
                      name="meta.parking"
                      control={control}
                      defaultValue={venue.meta?.parking || false}
                      render={({ field }) => (
                        <StyledCheckbox {...field} checked={field.value} />
                      )}
                    />
                    <label>Parking</label>
                  </div>

                  <div>
                    <Controller
                      name="meta.breakfast"
                      control={control}
                      defaultValue={venue.meta?.breakfast || false}
                      render={({ field }) => (
                        <StyledCheckbox {...field} checked={field.value} />
                      )}
                    />
                    <label>Breakfast</label>
                  </div>

                  <div>
                    <Controller 
                      name="meta.pets"
                      control={control}
                      defaultValue={venue.meta?.pets || false}
                      render={({ field }) => (
                        <StyledCheckbox {...field} checked={field.value} />
                      )}
                    />
                    <label>Pets</label>
                  </div>
                </div>
              </div>

              {/*<button type="submit">Submit</button>*/}
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