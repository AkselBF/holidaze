import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { Button, ThemeProvider } from '@mui/material';
import { useAuthStore } from '../../storage/authStore';
import { useVenuesStore } from '../../storage/venuesStore';
import { url, apiKey } from '../../constants/apiUrl';
import { theme, StyledTextField, StyledTextArea, StyledCheckbox } from '../StyledComponents';
import ScrollLock from '../ScrollLock';
import { handleNumberInput } from '../HandleNumberInput';
import '../../components/Scrollbars/FormsScrollbar.css';
import './InputArrows.css';

interface VenueFormData {
  name: string;
  description: string;
  media?: { url?: string; alt?: string }[];
  price: string;
  maxGuests: string;
  rating: string;
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

interface AddVenueFormProps {
  onClose: () => void;
  onAdd: () => void;
}

const AddVenueForm: React.FC<AddVenueFormProps> = ({ onClose, onAdd }) => {
  const { control, handleSubmit, setError, clearErrors, watch, formState: { errors } } = useForm<VenueFormData>();
  const nameValue = watch('name', '');
  const descriptionValue = watch('description', '');
  const priceValue = watch('price', '');
  const maxGuestsValue = watch('maxGuests', '');
  const ratingValue = watch('rating', '');
  const mediaValues = watch('media', [{ url: '', alt: '' }]);

  const { fetchVenues } = useVenuesStore();
  const user = useAuthStore();

  const [mediaFields, setMediaFields] = useState([{ url: '', alt: '' }]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [lockScroll] = useState(true);

  const addMediaField = () => {
    if (mediaFields.length < 6) {
      setMediaFields([...mediaFields, { url: '', alt: '' }]);
    }
  };

  const removeMediaField = (index: number) => {
    const newMediaFields = mediaFields.filter((_, idx) => idx !== index);
    setMediaFields(newMediaFields);
  };

  /*
  const validateMediaUrl = (value: string | undefined) => {
    if (!value) return true;
    return /\.(jpg|jpeg|png|gif|bmp)$/i.test(value) || 'Invalid image URL';
  };
  */

  const onSubmit: SubmitHandler<VenueFormData> = async (data) => {
    if (data.name.length < 3) {
      setError('name', { type: 'manual', message: 'Name must be at least 4 characters' });
      return;
    }

    const requestData = {
      name: data.name,
      description: data.description,
      media: mediaFields.map((_, index) => ({
        url: data.media?.[index]?.url || '',
        alt: data.media?.[index]?.alt || '',
      })).filter(({ url }) => url !== ''),
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
    } 
    catch (error) {
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
      mediaFields.every(({ url }) => {
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
    mediaFields,
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

            {/* Name */}
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
            
            {/* Description */}
            <div className='w-[80%] mx-auto text-white py-1'>
              <label htmlFor="description">Description</label>
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

            {/* Media inputs */}
            {mediaFields.map((_, index) => (
              <div key={index} className='w-[80%] mx-auto text-white py-2 flex items-center'>
                <Controller
                  name={`media.${index}.url`}
                  control={control}
                  defaultValue=""
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
                  defaultValue=""
                  render={({ field }) => (
                    <StyledTextField {...field} label={`Image Alt Text ${index + 1}`} variant="outlined" className='w-full' />
                  )}
                />
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => removeMediaField(index)}
                    className="text-white text-3xl font-bold bg-red-500 hover:bg-red-700 px-3 h-12 rounded-r-lg"
                  >
                    -
                  </button>
                )}
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

            <div className='w-[80%] space-x-2 flex flex-row mx-auto text-white mt-6 py-1 '>
              {/* Price */}
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
  onChange={(e) => {
    handleNumberInput(e, 0, 99999);
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
  inputProps={{ min: 0, max: 99999 }}
/>
                  )}
                />
              </div>

              {/* Max Guests */}
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
  onChange={(e) => {
    handleNumberInput(e, 1, 12);
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
  inputProps={{ min: 1, max: 12 }}
/>
                  )}
                />
              </div>

              {/* Rating */}
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
  onChange={(e) => {
    handleNumberInput(e, 0, 5);
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
  inputProps={{ min: 0, max: 5 }}
/>
                  )}
                />
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
                    defaultValue={false}
                    render={({ field }) => (
                      <StyledCheckbox {...field} />
                    )}
                  />
                  <label>Wifi</label>
                </div>

                <div>
                  <Controller
                    name="meta.parking"
                    control={control}
                    defaultValue={false}
                    render={({ field }) => (
                      <StyledCheckbox {...field} />
                    )}
                  />
                  <label>Parking</label>
                </div>

                <div>
                  <Controller
                    name="meta.breakfast"
                    control={control}
                    defaultValue={false}
                    render={({ field }) => (
                      <StyledCheckbox {...field} />
                    )}
                  />
                  <label>Breakfast</label>
                </div>

                <div>
                  <Controller 
                    name="meta.pets"
                    control={control}
                    defaultValue={false}
                    render={({ field }) => (
                      <StyledCheckbox {...field} />
                    )}
                  />
                  <label>Pets</label>
                </div>
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