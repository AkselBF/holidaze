import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../storage/authStore';
import Booking from '../Booking';
import BookingsSection from './BookingsSection';
import VenueSection from './VenueSection';
import ToggleSectionButton from '../../components/ToggleSectionButton';
import { fetchUserBookings } from '../../requests/Profiles/profileBookings';
import { Booking as BookingInterface } from '../../interfaces/Booking/bookingInterface';
import ScrollLock from '../../components/ScrollLock';
import ErrorMessage from '../../components/ErrorMessage';
import background from '../../../assets/images/backgroundImg.png';
import '../../components/Modals/Modal.css'
import '../../components/Scrollbars/ProfileScrollbar.css';

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout, updateUserAvatar } = useAuthStore();
  const [bookings, setBookings] = useState<BookingInterface[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAvatarUrl, setNewAvatarUrl] = useState('');
  const [avatarInputError, setAvatarInputError] = useState('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isVenueManager, setIsVenueManager] = useState(false);
  const [showBookings, setShowBookings] = useState<boolean>(true);
  const [hoveringAvatar, setHoveringAvatar] = useState(false); 
  const [lockScroll] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      const fetchBookings = async () => {
        try {
          if (user.name && user.token) {
            const fetchedBookings = await fetchUserBookings(user.name, user.token);
            setBookings(fetchedBookings);
            setIsVenueManager(user.venueManager || false);
          } else {
            console.error('User name or token is missing');
          }
        } catch (error) {
          console.error('Error fetching user bookings:', error);
        }
      };

      fetchBookings();
    }
  }, [user, navigate]);

  const toggleSection = () => {
    setShowBookings(!showBookings);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setNewAvatarUrl('');
    setAvatarInputError('');
  };

  const handleAvatarChange = async () => {
    if (!isValidImageUrl(newAvatarUrl)) {
      console.log('Invalid image URL');
      setAvatarInputError('Invalid image URL');
      setErrorMessage('Invalid image URL');
      return;
    }

    try {
      await updateUserAvatar(newAvatarUrl);
      toggleModal();
    } catch (error) {
      console.error('Error updating avatar:', error);
      setAvatarInputError('Failed to update avatar');
      setErrorMessage('Failed to update avatar');
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const isValidImageUrl = (url: string) => {
    return /^(http(s?):)([/|.|\w|\s|-])*/.test(url);
  };

  const handleNewBooking = () => {
    console.log('New booking created');
  };

  return (
    <div className='p-2 min-h-[90.2vh]' style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover', height: '100%', marginTop: '-80px', overflowY: 'auto' }}>
      {user && (
        <div className='mt-[100px] mb-[80px]'>
          <div className='flex flex-col md:flex-row w-full md:w-[95%] justify-between'>
            <div className='w-[120px] md:ml-[5%] mx-auto relative'>
              <div 
                className="avatar-container relative w-[120px] h-[120px] overflow-hidden rounded-full"
                onClick={toggleModal}
                onMouseEnter={() => setHoveringAvatar(true)}
                onMouseLeave={() => setHoveringAvatar(false)}
              >
                <img
                  src={user.avatar}
                  alt='Avatar'
                  className='h-[120px] rounded-full cursor-pointer'
                />
                {hoveringAvatar && (
                  <div className='absolute cursor-pointer top-0 left-0 w-full h-full bg-[#171717cc] flex flex-col justify-center items-center'>
                    <p className='text-white font-semibold'>Edit avatar</p>
                  </div>
                )}
              </div>
              <button onClick={openModal}></button>
                {isModalOpen && (
                  <>
                    <div className="modal-overlay" onClick={closeModal}></div>
                    <ScrollLock lock={lockScroll} />
                    <div className="modal-container">
                      <input
                        type="text"
                        value={newAvatarUrl}
                        onChange={(e) => setNewAvatarUrl(e.target.value)}
                        className="modal-input"
                        placeholder="Enter Image address url"
                      />
                      {avatarInputError && <p className="modal-error">{avatarInputError}</p>}
                      <button 
                        onClick={handleAvatarChange} 
                        disabled={!isValidImageUrl(newAvatarUrl)} 
                        className={`modal-confirm-button ${!isValidImageUrl(newAvatarUrl) ? 'opacity-50 cursor-not-allowed' : ''}`}>
                          Confirm
                      </button>
                    </div>
                  </>
                )}
              <h1 className='text-2xl text-white text-center font-semibold'>{user.name}</h1>
            </div>
            <div className='mt-4 md:-mt-16 flex flex-col'>
              <button onClick={logout} className='text-white text-lg font-semibold bg-black w-[200px] h-[50px] rounded-lg md:mr-[5%] mx-auto mt-10 -mb-4 md:mt-20 md:-mb-16'>Logout</button>
              {isVenueManager && (
                <ToggleSectionButton onClick={toggleSection} showBookings={showBookings} />
              )}
            </div>
          </div>
          {showBookings ? (
            <div>
              <BookingsSection bookings={bookings} />
            </div>
          ) : (
            <div>
              <VenueSection />
            </div>
          )}
        </div>
      )}

      <Booking user={user} onNewBooking={handleNewBooking} />

      {errorMessage && (
        <ErrorMessage message={errorMessage} onClose={() => setErrorMessage('')} />
      )}
    </div>
  );
};

export default Profile;