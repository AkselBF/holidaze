import React, { useState, useEffect, ChangeEvent } from 'react';
import { url } from '../../../constants/apiUrl';
import { theme, StyledCheckbox } from '../../../components/StyledComponents';
import { ThemeProvider } from '@mui/material';
import { Venue } from '../../../interfaces/Venue/venueInterface';
import '../../../components/Scrollbars/FilterScrollbar.css';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';
import StarIcon from '@mui/icons-material/Star';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SearchIcon from '@mui/icons-material/Search';
import SortRoundedIcon from '@mui/icons-material/SortRounded';
import WifiIcon from '@mui/icons-material/Wifi';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import FreeBreakfastIcon from '@mui/icons-material/FreeBreakfast';
import PetsIcon from '@mui/icons-material/Pets';


interface VenueFiltersProps {
  venues: Venue[];
  onChangeCountry: (country: string) => void;
  onChangeGuests: (guests: number) => void;
  onChangeRating: (rating: number) => void;
  onChangePriceRange: (priceRange: [number, number]) => void;
  onSearch: (query: string) => void;
  onFilterWifi: (wifi: boolean) => void;
  onFilterParking: (parking: boolean) => void;
  onFilterBreakfast: (breakfast: boolean) => void;
  onFilterPets: (pets: boolean) => void;
}

const VenueFilters: React.FC<VenueFiltersProps> = ({ venues, onChangeCountry, onChangeGuests, onChangeRating, onChangePriceRange, onSearch, onFilterWifi, onFilterParking, onFilterBreakfast, onFilterPets }) => {
  const [selectedCountry, setSelectedCountry] = useState<string>('Countries');
  const [selectedGuests, setSelectedGuests] = useState<number>(0);
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [selectedPriceRange, setSelectedPriceRange] = useState<[number, number]>([0, 0]);
  const [countries, setCountries] = useState<string[]>([]);
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState<boolean>(false);
  const [isGuestDropdownOpen, setIsGuestDropdownOpen] = useState<boolean>(false);
  const [isRatingDropdownOpen, setIsRatingDropdownOpen] = useState<boolean>(false);
  const [isPriceDropdownOpen, setIsPriceDropdownOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isWifiChecked, setIsWifiChecked] = useState<boolean>(false);
  const [isParkingChecked, setIsParkingChecked] = useState<boolean>(false);
  const [isBreakfastChecked, setIsBreakfastChecked] = useState<boolean>(false);
  const [isPetsChecked, setIsPetsChecked] = useState<boolean>(false);
  const [noMatches, setNoMatches] = useState<boolean>(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    if (venues.length > 0) {
      const uniqueCountries = Array.from(new Set(venues.map((venue: Venue) => venue.location.country)));
      setCountries(['Countries', ...uniqueCountries]);
    }
  }, [venues]);

  const handleCountryChange = (country: string) => {
    setSelectedCountry(country);
    setIsCountryDropdownOpen(false);
    onChangeCountry(country);
  };

  const handleGuestsChange = (guests: number) => {
    setSelectedGuests(guests);
    setIsGuestDropdownOpen(false);
    onChangeGuests(guests);
  };

  const handleRatingChange = (rating: number) => {
    setSelectedRating(rating);
    setIsRatingDropdownOpen(false);
    onChangeRating(rating);
  };

  const handlePriceRangeChange = (minPrice: number, maxPrice: number) => {
    setSelectedPriceRange([minPrice, maxPrice]);
    setIsPriceDropdownOpen(false);
    onChangePriceRange([minPrice, maxPrice]);
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  const handleSearch = async () => {
    if (searchQuery.trim() === '') {
      setNoMatches(false);
      onSearch(searchQuery);
      return;
    }
    try {
      const response = await fetch(`${url}/venues/search?q=${searchQuery}`);
      const data = await response.json();
      if (data.length === 0) {
        setNoMatches(true);
      } else {
        setNoMatches(false);
        onSearch(data);
        console.log(noMatches, handleSearch);
      }
    } catch (error) {
      console.error('Error fetching venues:', error);
    }
  };
  
  const handleWifiChange = (checked: boolean) => {
    setIsWifiChecked(checked);
    onFilterWifi(checked);
  };

  const handleParkingChange = (checked: boolean) => {
    setIsParkingChecked(checked);
    onFilterParking(checked);
  };

  const handleBreakfastChange = (checked: boolean) => {
    setIsBreakfastChecked(checked);
    onFilterBreakfast(checked);
  };

  const handlePetsChange = (checked: boolean) => {
    setIsPetsChecked(checked);
    onFilterPets(checked);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className='relative'>
        <button
          className="lg:hidden fixed w-16 h-16 top-24 left-2 bg-black text-white px-4 py-2 rounded-full z-20 border border-transparent bg-clip-border overflow-hidden"
          onClick={toggleDropdown}
        >
          <SortRoundedIcon style={{ fontSize: '2rem', color: 'white' }} />
        </button>

        <div className={`fixed lg:absolute bg-[#171717cc] text-white w-[95%] sm:w-[300px] lg:w-[90%] left-2 lg:left-[5%] top-24 lg:-top-10 xl:-top-20 lg:-mt-20 rounded-b-lg z-10 rounded-tr-lg rounded-tl-[32px] lg:rounded-lg lg:px-16 pt-24 pb-6 lg:py-6 flex flex-col xl:flex-row space-y-4 lg:space-y-0 ${isDropdownOpen ? 'block' : 'hidden'} lg:block`}>
          <div className='flex flex-col lg:flex-row lg:justify-center xl:justify-normal items-center space-x-0 lg:space-x-3 space-y-4 lg:space-y-0'>
            {/* Country filter */}
            <div className='filter bg-black rounded-md flex flex-row py-2 px-3 cursor-pointer' onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}>
              <div><LocationOnIcon /></div>
              <div className='mx-2 text-left w-24 bg-transparent text-white outline-none'>{selectedCountry}</div>
              <div className='ml-2'><ArrowDropDownIcon /></div>
              {isCountryDropdownOpen && (
                <div className='filter-container absolute top-[75%] lg:top-[58%] bg-black w-[192px] text-white p-2 rounded-b-lg overflow-y-auto max-h-[150px] text-left -mt-[260px] lg:-mt-7 -ml-3 z-[14]'>
                  {countries.map((country, index) => (
                    <div key={index} className='cursor-pointer hover:bg-gray-800 py-1 px-2 ml-7' onClick={() => handleCountryChange(country)}>{country}</div>
                  ))}
                </div>
              )}
            </div>

            {/* Guests filter */}
            <div className='filter bg-black rounded-md flex flex-row py-2 px-3 cursor-pointer' onClick={() => setIsGuestDropdownOpen(!isGuestDropdownOpen)}>
              <div><PersonIcon /></div>
              <div className='mx-2 text-left w-24 lg:w-10 bg-transparent text-white outline-none'>{selectedGuests === 0 ? 'Guests' : selectedGuests}</div>
              <div className='ml-2'><ArrowDropDownIcon /></div>
              {isGuestDropdownOpen && (
                <div className='filter-container absolute top-[75%] lg:top-[58%] bg-black w-[192px] lg:w-[136px] text-white p-2 rounded-b-lg overflow-y-auto max-h-[150px] text-left -mt-[205px] lg:-mt-7 -ml-3 z-[12]'>
                  <div className='cursor-pointer hover:bg-gray-800 py-1 px-2 ml-7' onClick={() => handleGuestsChange(0)}>Guests</div>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((guests, index) => (
                    <div key={index} className='cursor-pointer hover:bg-gray-800 py-1 px-2 ml-7' onClick={() => handleGuestsChange(guests)}>{guests}</div>
                  ))}
                </div>
              )}
            </div>

            {/* Rating filter */}
            <div className='filter bg-black rounded-md flex flex-row py-2 px-3 cursor-pointer' onClick={() => setIsRatingDropdownOpen(!isRatingDropdownOpen)}>
              <div><StarIcon /></div>
              <div className='mx-2 text-left w-24 lg:w-10 bg-transparent text-white outline-none'>{selectedRating === 0 ? 'Rating' : selectedRating}</div>
              <div className='ml-2'><ArrowDropDownIcon /></div>
              {isRatingDropdownOpen && (
                <div className='filter-container absolute top-[75%] lg:top-[58%] bg-black w-[192px] lg:w-[136px] text-white p-2 rounded-b-lg overflow-y-auto max-h-[150px] text-left -mt-[140px] lg:-mt-7 -ml-3 z-[11]'>
                  <div className='cursor-pointer hover:bg-gray-800 py-1 px-2 ml-7' onClick={() => handleRatingChange(0)}>Rating</div>
                  {[1, 2, 3, 4, 5].map((rating, index) => (
                    <div key={index} className='cursor-pointer hover:bg-gray-800 py-1 px-2 ml-7' onClick={() => handleRatingChange(rating)}>{rating}</div>
                  ))}
                </div>
              )}
            </div>

            {/* Price range filter */}
            <div className='filter bg-black rounded-md flex flex-row py-2 px-3 cursor-pointer' onClick={() => setIsPriceDropdownOpen(!isPriceDropdownOpen)}>
              <div><AttachMoneyIcon /></div>
              <div className='mx-2 text-left w-24 bg-transparent text-white outline-none'>{selectedPriceRange[0] === 0 ? 'Price' : `${selectedPriceRange[0]}kr - ${selectedPriceRange[1]}kr`}</div>
              <div className='ml-2'><ArrowDropDownIcon /></div>
              {isPriceDropdownOpen && (
                <div className='filter-container absolute top-[75%] lg:top-[58%] bg-black w-[192px] text-white p-2 rounded-b-lg overflow-y-auto max-h-[150px] text-left -mt-[85px] lg:-mt-7 -ml-3 z-[10]'>
                  <div className='cursor-pointer hover:bg-gray-800 py-1 px-2 ml-7' onClick={() => handlePriceRangeChange(0, 0)}>Price</div>
                  {[
                    [10, 300],
                    [300, 600],
                    [600, 1000],
                    [1000, 1500],
                    [1500, 2000],
                    [2000, 2500],
                    [2500, 3000],
                    [3000, 3500],
                    [3500, 4000],
                    [4000, 4500],
                    [4500, 5000],
                    [5000, 10000]
                  ].map((range, index) => (
                    <div key={index} className='cursor-pointer hover:bg-gray-800 py-1 px-2 ml-7' onClick={() => handlePriceRangeChange(range[0], range[1])}>{range[0]}kr - {range[1]}kr</div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className='flex flex-col lg:flex-row xl:flex-col lg:justify-between'>
            {/* Search bar */}
            <div className='relative mx-auto lg:ml-0 lg:mr-auto xl:ml-auto xl:mr-0 text-end lg:text-start xl:text-end'>
              <input
                type='text'
                placeholder='Search venues...'
                value={searchQuery}
                onChange={handleSearchChange}
                className='bg-[#00000000] xl:absolute lg:right-0 lg:bottom-0 py-2 px-3 text-white focus:outline-none border-b-2 lg:mt-4 xl:mt-auto border-[#B9B9B9] lg:w-[400px] xl:w-[310px]'
              />
              <SearchIcon className='absolute top-1/2 lg:top-9 xl:-top-5 right-2 lg:left-[371px] xl:right-2 xl:left-auto transform -translate-y-1/2 text-white' />
            </div>

            <div className='flex flex-row mx-auto my-6 lg:mt-6 lg:mb-0 lg:ml-auto lg:mr-0'>
              <div className='flex flex-col lg:flex-row'>
                {/* Wifi filter */}
                <div className='flex items-center'>
                  <WifiIcon className='ml-4' />
                  <StyledCheckbox
                    id="wifiCheckbox"
                    checked={isWifiChecked}
                    onChange={(e) => handleWifiChange(e.target.checked)}
                  />
                </div>

                {/* Parking filter */}
                <div className='flex items-center'>
                  <LocalParkingIcon className='ml-4' />
                  <StyledCheckbox
                    id="parkingCheckbox"
                    checked={isParkingChecked}
                    onChange={(e) => handleParkingChange(e.target.checked)}
                  />
                </div>
              </div>

              <div className='flex flex-col lg:flex-row'>
                {/* Breakfast filter */}
                <div className='flex items-center'>
                  <FreeBreakfastIcon className='ml-4' />
                  <StyledCheckbox
                    id="breakfastCheckbox"
                    checked={isBreakfastChecked}
                    onChange={(e) => handleBreakfastChange(e.target.checked)}
                  />
                </div>

                {/* Pets filter */}
                <div className='flex items-center'>
                  <PetsIcon className='ml-4' />
                  <StyledCheckbox
                    id="petsCheckbox"
                    checked={isPetsChecked}
                    onChange={(e) => handlePetsChange(e.target.checked)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default VenueFilters;