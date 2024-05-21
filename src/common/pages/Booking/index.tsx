import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthStore, User } from '../../storage/authStore';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { cardTheme, StyledTextField } from '../../components/StyledComponents';
import { fetchVenueDetails, createBooking } from '../../requests/Bookings/bookingVenue';
import { Venue } from '../../interfaces/Venue/venueInterface';
//import { User } from '../../interfaces/User/userInterface';

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
/*
//imports for mui date picker:

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
*/

/*
//npm installs for date mui:

npm install @mui/x-date-pickers
// Install date library (if not already installed)
npm install dayjs
*/
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StarIcon from '@mui/icons-material/Star';
import ManIcon from '@mui/icons-material/Man';
import WomanIcon from '@mui/icons-material/Woman';
import BoyIcon from '@mui/icons-material/Boy';
import GirlIcon from '@mui/icons-material/Girl';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
//import CreditCardIcon from '@mui/icons-material/CreditCard';

import './Booking.css';
import '../../components/Scrollbars/BookingScrollbar.css';
import '../../components/Scrollbars/HotelScrollbar.css';

interface BookingFormValues {
  cardNumber: string;
  expiryDate: string;
  cvc: string;
}

interface BookingProps {
  onNewBooking: () => void;
  user: User | null;
}

const Booking: React.FC<BookingProps> = (props) => {
  const { id } = useParams<{ id: string }>();
  const { control, handleSubmit, formState: { errors } } = useForm<BookingFormValues>();
  const navigate = useNavigate();
  const [venue, setVenue] = useState<Venue | null>(null);
  const [numAdults, setNumAdults] = useState(1);
  const [numChildren, setNumChildren] = useState(0);
  const [arrivalDate, setArrivalDate] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [totalPrice, setTotalPrice] = useState<number | null>(null);
  const [isCardNumberValid, setIsCardNumberValid] = useState(false);
  const [isExpiryDateValid, setIsExpiryDateValid] = useState(false);
  const [isCvcValid, setIsCvcValid] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const { user } = useAuthStore();

  useEffect(() => {
    setIsFormValid(isCardNumberValid && isExpiryDateValid && isCvcValid && !!arrivalDate && !!departureDate);
  }, [isCardNumberValid, isExpiryDateValid, isCvcValid, arrivalDate, departureDate]);

  useEffect(() => {
    const fetchVenue = async () => {
      try {
        if (id) {
          const fetchedVenue = await fetchVenueDetails(id);
          setVenue(fetchedVenue);
        }
      } catch (error) {
        console.error('Error fetching venue details:', error);
      }
    };

    fetchVenue();
  }, [id]);

  useEffect(() => {
    if (venue && arrivalDate && departureDate) {
      const durationInDays = Math.ceil((new Date(departureDate).getTime() - new Date(arrivalDate).getTime()) / (1000 * 60 * 60 * 24));
      const basePricePerAdult = venue.price;
      const basePricePerChild = basePricePerAdult * 0.7;
      const totalPricePerAdult = basePricePerAdult * durationInDays;
      const totalPricePerChild = basePricePerChild * durationInDays;
      const totalPriceForAdults = totalPricePerAdult * numAdults;
      const totalPriceForChildren = totalPricePerChild * numChildren;
      const totalPrice = totalPriceForAdults + totalPriceForChildren;
      setTotalPrice(totalPrice);
    } 
    else {
      setTotalPrice(venue ? venue.price : null);
    }
  }, [venue, numAdults, numChildren, arrivalDate, departureDate]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateValue = e.target.value;
    const currentDate = new Date().toISOString().split('T')[0];
    if (dateValue >= currentDate) {
      if (e.target.name === 'arrivalDate') {
        setArrivalDate(dateValue);
      } 
      else {
        setDepartureDate(dateValue);
      }
    } 
    else {
      alert('Please select a future date.');
    }
  };

  const onSubmit: SubmitHandler<BookingFormValues> = async () => {
    try {
      if (!user || !venue) {
        throw new Error('User or venue is not available');
      }

      await createBooking(user, venue.id, arrivalDate, departureDate, numAdults + numChildren);
      props.onNewBooking();
      navigate('/success');
    } catch (error) {
      console.error('Error processing booking:', error);
    }
  };

  return (
    <div>
      {venue && (
        <div className='p-2'>
          <div className='flex flex-grow w-full mb-3 relative'>
            <h1 className='text-3xl text-center font-semibold justify-center mx-auto line-clamp-1 leading-relaxed'>Booking: {venue.name}</h1>
          </div>
          <div className='flex flex-col lg:flex-row justify-center'>
            <div className='w-[90%] sm:w-[80%] lg:w-[45%] mx-auto lg:mx-0 justify-center lg:mr-3'>
              <div className='scrollbar-booking-dates booking_options bg-[#171717cc] flex flex-row h-[80px] rounded-t-lg items-center px-2 overflow-x-auto'>
                <div className="flex mx-auto items-center 2xl:justify-center" style={{ width: "100%" }}>
                  <div className='flex flex-row bg-black text-white rounded-md mx-2 h-[40px]'>
                    <div className='flex flex-row my-auto'>
                      <ManIcon className='-mr-2' />
                      <WomanIcon />
                    </div>
                    <Select
                      value={numAdults}
                      onChange={(e) => setNumAdults(Number(e.target.value))}
                      sx={{ color: 'white', '& .MuiSelect-icon': { color: 'white' } }}
                      MenuProps={{
                        PaperProps: {
                          style: {
                            backgroundColor: 'black',
                          },
                        },
                        sx: {
                          '& .MuiMenuItem-root': {
                            color: 'white',
                          },
                        },
                      }}
                    >
                      {[...Array(venue.maxGuests)].map((_, index) => (
                        <MenuItem key={index + 1} value={index + 1}>{index + 1}</MenuItem>
                      ))}
                    </Select>
                  </div>
                  <div className='flex flex-row bg-black text-white rounded-md mx-2 h-[40px]'>
                    <div className='flex flex-row my-auto'>
                      <BoyIcon className='-mr-2' />
                      <GirlIcon />
                    </div>
                    <Select
                      value={numChildren}
                      onChange={(e) => setNumChildren(Number(e.target.value))}
                      sx={{ color: 'white', '& .MuiSelect-icon': { color: 'white' } }}
                      MenuProps={{
                        PaperProps: {
                          style: {
                            backgroundColor: 'black',
                          },
                        },
                        sx: {
                          '& .MuiMenuItem-root': {
                            color: 'white',
                          },
                        },
                      }}
                    >
                      {[...Array(venue.maxGuests)].map((_, index) => (
                        <MenuItem key={index + 1} value={index}>{index}</MenuItem>
                      ))}
                    </Select>
                  </div>
                  <div className='flex flex-row bg-black text-white rounded-md mx-2 h-[40px]'>
                    <CalendarMonthIcon className='mx-2 my-auto' />
                    <input
                      type="date"
                      value={arrivalDate}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={handleDateChange}
                      name="arrivalDate" 
                      className='rounded-r-md text-white bg-black'
                    />
                  </div>
                  <div className='flex flex-row bg-black text-white rounded-md mx-2 h-[40px]'>
                    <CalendarMonthIcon className='mx-2 my-auto' />
                    <input
                      type="date"
                      value={departureDate}
                      min={arrivalDate || new Date().toISOString().split('T')[0]}
                      onChange={handleDateChange}
                      name="departureDate"
                      className='rounded-r-md text-white bg-black'
                    />
                  </div>
                </div>
                
              </div>
              <div className='bg-white rounded-b-lg px-8 pt-3 pb-12'>
                <p className='mb-3'>Choose a number of extra treatments such as training, pool free access and spa. The options can be crossed bellow:</p>
              </div>

              <div className='flex flex-col lg:flex-row mt-10 space-y-3'>
                <img src={venue.media.length > 0 ? venue.media[0].url : ''} alt={venue.name} className='lg:w-[50%] max-h-[260px] lg:mr-5 object-contain' />
                <div>
                  <div className='flex flex-row'>
                    <StarIcon />
                    <p className='ml-2 font-semibold text-[#FF5C00]'>{venue.rating}</p>
                  </div>
                  <div className='flex flex-row my-3'>
                    <LocationOnIcon />
                    <p className='ml-2'> {venue.location.city}, {venue.location.country}</p>
                  </div>
                  <p className='scrollbar-hotel-desc max-h-[100px] overflow-y-auto px-2'>{venue.description}</p>
                </div>
              </div>
            </div>
            <div className='w-[90%] sm:w-[80%] lg:w-[45%] mx-auto lg:mr-0 lg:ml-3 my-5 lg:my-0 px-6 md:px-12 pt-6 pb-12 text-white bg-[#171717] rounded-lg justify-center text-center'>
              <h2 className='text-lg text-center font-semibold'>Enter credit card data</h2>
              <div className='h-[2px] mx-auto my-5 w-[50%] bg-[#ADADAD]'></div>
              <ThemeProvider theme={cardTheme}>
                <form onSubmit={handleSubmit(onSubmit)} className='card_data_inputs space-y-6'>
                  <Controller
                    name="cardNumber"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <StyledTextField 
                        {...field} 
                        label="Card Number" 
                        variant="outlined" 
                        fullWidth 
                        required 
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '');
                          if (value.length <= 16) {
                            field.onChange(value);
                            setIsCardNumberValid(value.length === 16);
                          }
                        }}
                        value={field.value}
                      />
                    )}
                  />
                  <div className='flex flex-col sm:flex-row sm:space-x-3'>
                    <Controller
                      name="expiryDate"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <StyledTextField 
                          {...field} 
                          label="Expiry Date" 
                          variant="outlined" 
                          fullWidth 
                          required 
                          onChange={(e) => {
                            let value = e.target.value;
                            value = value.replace(/\D/g, '');

                            if (value.length >= 3) {
                              value = value.slice(0, 2) + '/' + value.slice(2);
                            }

                            value = value.slice(0, 5);
                            
                            field.onChange(value);
                            setIsExpiryDateValid(value.trim().length === 5 && !errors.cardNumber);
                          }}
                          value={field.value}
                        />
                      )}
                    />
                    <Controller
                      name="cvc"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <StyledTextField 
                          {...field} 
                          label="CVC" 
                          variant="outlined" 
                          fullWidth 
                          required 
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, '');
                            if (value.length <= 3) {
                              field.onChange(value);
                              setIsCvcValid(value.length === 3);
                            }
                          }}
                          value={field.value}
                        />
                      )}
                    />
                  </div>
                  
                  <p className='text-left my-3'>The total price varies depending on the amount of guests staying, and for how long. Once you are ready, enter your card information and confirm to complete your booking.</p>
                  <div className='h-[2px] mx-auto my-5 w-[50%] bg-[#ADADAD]'></div>
                  
                  {totalPrice && <p className='text-[#FF5C00] text-right font-semibold my-6'>Total: {totalPrice} kr,-</p>}
                  
                  <Button 
                    type="submit" 
                    variant="contained" 
                    style={{ 
                      fontWeight: 'bold', 
                      backgroundColor: isFormValid ? cardTheme.palette.primary.main : cardTheme.palette.secondary.main,
                      /*color: isFormValid ? 'black' : 'black'*/
                    }} 
                    className='w-[60%] mx-auto'
                    disabled={!isFormValid}
                  >
                    Confirm
                  </Button>
                </form>
              </ThemeProvider>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Booking;

/*
// For using the muo date picker

export default function MaterialUIPickers() {
  const [value, setValue] = React.useState<Dayjs | null>(
    dayjs('2014-08-18T21:11:54'),
  );

  const handleChange = (newValue: Dayjs | null) => {
    setValue(newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={3}>
        <DesktopDatePicker
          label="Date desktop"
          inputFormat="MM/DD/YYYY"
          value={value}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
        />
        <MobileDatePicker
          label="Date mobile"
          inputFormat="MM/DD/YYYY"
          value={value}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
        />
        <TimePicker
          label="Time"
          value={value}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
        />
        <DateTimePicker
          label="Date&Time picker"
          value={value}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </Stack>
    </LocalizationProvider>
  );
}
*/