import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../storage/authStore';
import background from '../../images/backgroundImg.png';
import Booking from '../Booking';
import BookingsSection from './BookingsSection';
import VenueSection from './VenueSection';
import ToggleSectionButton from '../../components/ToggleSectionButton';
import { fetchUserBookings } from '../../requests/Profiles/profileBookings';
import { Booking as BookingInterface } from '../../interfaces/Booking/bookingInterface';
import './Modal.css';
import '../../components/Scrollbars/ProfileScrollbar.css';


const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout, updateUserAvatar } = useAuthStore();
  const [bookings, setBookings] = useState<BookingInterface[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAvatarUrl, setNewAvatarUrl] = useState('');
  const [avatarInputError, setAvatarInputError] = useState('');
  const [isVenueManager, setIsVenueManager] = useState(false);
  const [showBookings, setShowBookings] = useState<boolean>(true);
  const [hoveringAvatar, setHoveringAvatar] = useState(false); 

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
      setAvatarInputError('Invalid image URL');
      return;
    }

    try {
      await updateUserAvatar(newAvatarUrl);
      toggleModal();
    } catch (error) {
      console.error('Error updating avatar:', error);
      setAvatarInputError('Failed to update avatar');
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const isValidImageUrl = (url: string) => {
    return /^(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)$/.test(url);
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
                  <div className='absolute cursor-pointer top-0 left-0 w-full h-full bg-[#171717cc] flex justify-center items-center'>
                    <p className='text-white font-semibold'>Change avatar</p>
                  </div>
                )}
              </div>
              <button onClick={openModal}></button>
                {isModalOpen && (
                  <>
                    <div className="modal-overlay" onClick={closeModal}></div>
                    <div className="modal-container">
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
            <div className='mt-4 md:-mt-16 flex flex-col-reverse lg:flex-col'>
              {isVenueManager && (
                <ToggleSectionButton onClick={toggleSection} showBookings={showBookings} />
              )}
              <button onClick={logout} className='text-white text-lg font-semibold bg-black w-[200px] h-[50px] rounded-lg md:mr-[5%] mx-auto mt-10 md:mt-24 md:-mb-14 lg:mb-0 lg:mt-10'>Logout</button>
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
    </div>
  );
};

export default Profile;