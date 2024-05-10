import React from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { TextField, Checkbox, Button } from '@mui/material';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import './Scrollbar.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ffffff', 
    },
    secondary: {
      main: '#FF5C00',
    }
  },
});

const StyledTextField = styled(TextField)({
  '& .MuiInputLabel-root': {
    color: '#d9d9d9',
  },
  '& .MuiInputBase-root': {
    color: '#d9d9d9',
    borderRadius: 0,
    borderBottom: '2px solid #ffffff',
    borderLeft: '2px solid transparent',
    borderRight: '2px solid transparent',
    borderTop: '2px solid transparent',
    '&:hover': {
      borderBottomColor: '#d9d9d9',
    },
    '&.Mui-focused': {
      borderBottomColor: '#ffffff',
    },
  },
  '& .MuiInputBase-input': {
    color: '#d9d9d9',
    height: '15px',
  },
});

const StyledTextArea = styled('textarea')({
  color: '#ffffff',
  backgroundColor: '#171717',
  borderRadius: 0,
  borderBottom: '2px solid #ffffff',
  borderLeft: '2px solid transparent',
  borderRight: '2px solid transparent',
  borderTop: '2px solid transparent',
  '&:hover': {
    borderBottomColor: '#d9d9d9',
  },
  '&:focus': {
    borderBottomColor: '#ffffff',
  },
  height: '100px',
  padding: '10px',
});

const StyledCheckbox = styled(Checkbox)({
  color: '#ffffff',
});

interface VenueFormData {
  name: string; // minimum of 3 characters
  description: string; // minimum of 16 characters
  image: string; // URL for the main image
  additionalImages?: string[]; // URLs for additional images (optional, max 6)
  price: number; // numbers only with a maximum of 10000, two decimal digits
  maxGuests: number; // numbers only with a maximum of 12, no decimal numbers
  rating?: number; // numbers only, one decimal digit (optional)
  meta: {
    wifi: boolean; // optional (default: false)
    parking: boolean; // optional (default: false)
    breakfast: boolean; // optional (default: false)
    pets: boolean; // optional (default: false)
  };
  location?: {
    city?: string; // optional
    country?: string; // optional
    continent?: string; // optional
  };
}

interface AddVenueFormProps {
  onClose: () => void;
}

const AddVenueForm: React.FC<AddVenueFormProps> = ({ onClose }) => {
  const { control, handleSubmit, formState: { errors } } = useForm<VenueFormData>();

  const onSubmit: SubmitHandler<VenueFormData> = async (data) => {
    // Handle form submission
    console.log(data);
    onClose(); // Close the modal after form submission
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="modal-overlay">
        <div className="modal-container scrollbar-hide w-[90%] h-[70%] overflow-y-auto">
          <h3 className='text-[#FF5C00] text-2xl font-semibold text-center mt-3'>Add Venue</h3>
          <button className="close-button text-white bg-[#42A4FF] py-1 px-5 rounded-md" onClick={onClose}>Close</button>
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

            {/* Image */}
            <div className='w-[80%] mx-auto text-white py-3'>
              <Controller
                name="image"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <StyledTextField {...field} label="Image" variant="outlined" type="url" />
                )}
              />
            </div>
            {/* Additional image inputs can be added here */}

            <div className='w-[80%] space-x-2 flex flex-row mx-auto text-white mt-6 py-3 '>
              {/* Price */}
              <div className='text-white'>
                <Controller
                  name="price"
                  control={control}
                  defaultValue={0}
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
                  defaultValue={0}
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
                  defaultValue={0}
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
              <label>Location:</label>
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
              <label>Venue features:</label>
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

            {/* City, Country, Continent (optional) */}
            {/* Add input fields for City, Country, Continent here if needed */}

            {/*<button type="submit">Submit</button>*/}
            <div className='mx-auto justify-center text-center w-full my-6'>
            <Button type="submit" variant="contained" color="secondary" className='w-[50%] mx-auto'>Confirm</Button>
            </div>
            
          </form>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default AddVenueForm;

/*
<form onSubmit={handleSubmit(onSubmit)}>
          <input type="text" {...register('name', { required: true, minLength: 3 })} />
          {errors.name && errors.name.type === 'required' && <span>Name is required</span>}
          {errors.name && errors.name.type === 'minLength' && <span>Name must be at least 3 characters</span>}
          
          <textarea {...register('description', { required: true, minLength: 16 })}></textarea>
          {errors.description && errors.description.type === 'required' && <span>Description is required</span>}
          {errors.description && errors.description.type === 'minLength' && <span>Description must be at least 16 characters</span>}
          <button type="submit">Submit</button>
        </form>
*/