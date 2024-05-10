import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../storage/authStore';
import background from '../../images/backgroundImg.png';
import { url, apiKey } from '../../constants/apiUrl';
import Booking from '../Booking';
import BookingsSection from './BookingsSection';
import VenueSection from './VenueSection';
import ToggleSectionButton from '../../components/ToggleSectionButton';
import './Modal.css';

interface Booking {
  id: string;
  dateFrom: string;
  dateTo: string;
  guests: number;
  venue: {
    name: string;
    rating: number;
  }
}

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout, updateUserAvatar } = useAuthStore();
  const [bookings, setBookings] = useState<Booking[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAvatarUrl, setNewAvatarUrl] = useState('');
  const [avatarInputError, setAvatarInputError] = useState('');
  const [isVenueManager, setIsVenueManager] = useState(false);
  const [showBookings, setShowBookings] = useState<boolean>(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } 
    else {
      fetchUserBookings();
      setIsVenueManager(user.venueManager || false);
    }
  }, [user, navigate]);

  const fetchUserBookings = async () => {
    try {
      if (user && user.token) {
        const response = await fetch(`${url}/profiles/${user.name}/?_bookings=true&_venues=true`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`,
            'X-Noroff-API-Key': apiKey,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch user bookings');
        }
        const responseData = await response.json();
        console.log(responseData);
        setBookings(responseData.data.bookings); // Update to use responseData.data.bookings
      } else {
        throw new Error('User not found or token missing');
      }
    } catch (error) {
      console.error('Error fetching user bookings:', error);
    }
  };

  const toggleSection = () => {
    setShowBookings(!showBookings);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setNewAvatarUrl(''); // Reset input value when modal opens/closes
    setAvatarInputError('');
  };

  const handleAvatarChange = () => {
    // Validate image URL
    if (!isValidImageUrl(newAvatarUrl)) {
      setAvatarInputError('Invalid image URL');
      return;
    }

    // Update user's avatar and save it in the application
    // Replace it with the appropriate function from your useAuthStore implementation
    updateUserAvatar(newAvatarUrl);
    
    // Close the modal
    toggleModal();
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const isValidImageUrl = (url: string) => {
    // Simple URL validation, you can add more sophisticated validation if needed
    return /^(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)$/.test(url);
  };

  const handleNewBooking = () => {
    // Define the logic for handling a new booking
    console.log('New booking created');
    // You can add more logic here as needed
  };

  return (
    <div className='p-2' style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover', height: '90.2vh', marginTop: '-80px' }}>
      {user && (
        <div className='mt-[100px] mb-[80px]'>
          <div className='flex flex-col md:flex-row w-full justify-between'>
            <div className='w-[120px] md:ml-[5%] mx-auto relative'>
              <img
                src={user.avatar}
                alt='Avatar'
                className='h-[120px] rounded-full cursor-pointer'
                onClick={toggleModal}
              />
              <button onClick={openModal}></button>
              {isModalOpen && (
                <>
                  <div className="modal-overlay" onClick={closeModal}></div>
                  <div className="modal-container">
                    {/* Your modal content here */}
                    <input
                      type="text"
                      value={newAvatarUrl}
                      onChange={(e) => setNewAvatarUrl(e.target.value)}
                      className="modal-input"
                      placeholder="Enter Image URL"
                    />
                    {avatarInputError && <p className="modal-error">{avatarInputError}</p>}
                    <button onClick={handleAvatarChange} className="modal-confirm-button">
                      Confirm
                    </button>
                  </div>
                </>
              )}
              <h1 className='text-2xl text-white text-center font-semibold'>{user.name}</h1>
            </div>
            <div className='mt-4 md:-mt-16'>
              {isVenueManager && (
                <ToggleSectionButton onClick={toggleSection} showBookings={showBookings} />
              )}
              {/*<p>Venue Manager: {user.venueManager ? 'Yes' : 'No'}</p>*/}
              <button onClick={logout} className='text-white text-lg font-semibold bg-black w-[200px] h-[50px] rounded-lg md:mr-[5%] mx-auto mt-10'>Logout</button>
            </div>
          </div>
          {/* Conditional rendering based on showBookings state */}
          {showBookings ? (
            <div>
              {/* Render the BookingsSection component if showBookings is true */}
              <BookingsSection bookings={bookings} />
            </div>
          ) : (
            <div>
              {/* Render the VenueSection component if showBookings is false */}
              <VenueSection />
            </div>
          )}
        </div>
      )}

      <Booking user={user} onNewBooking={handleNewBooking} />
    </div>
  );
};

export default Profile;