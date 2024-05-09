import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../storage/authStore';
import background from '../../images/backgroundImg.png';
import { url, apiKey } from '../../constants/apiUrl';
import Booking from '../Booking';
import './Modal.css';

import StarIcon from '../../images/starIcon.png';
import HalfStarIcon from '../../images/halfStarIcon.png';
import EmptyStarIcon from '../../images/emptyStarIcon.png';

interface Booking {
  id: string;
  dateFrom: string;
  dateTo: string;
  guests: number;
  venue: {
    name: string;
    rating: number;
    // Other venue properties
  }
  // Add other properties as needed
}

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout, updateUserAvatar } = useAuthStore();
  const [bookings, setBookings] = useState<Booking[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAvatarUrl, setNewAvatarUrl] = useState('');
  const [avatarInputError, setAvatarInputError] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } 
    else {
      fetchUserBookings();
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
    // For now, let's assume there's a function updateUserAvatar in useAuthStore
    // that updates the user's avatar in the state and persists it
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day < 10 ? '0' + day : day}.${month < 10 ? '0' + month : month}.${year}`;
  };

  const renderRatingStars = (rating: number) => {
    const totalStars = 5;
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    const stars = [];
  
    // Render full stars
    for (let i = 0; i < fullStars; i++) {
        stars.push(<img key={`star-${i}`} src={StarIcon} alt="star" />);
    }
  
    // Render half star if applicable
    if (hasHalfStar) {
        stars.push(<img key="half-star" src={HalfStarIcon} alt="half star" />);
    }
  
    // Render empty stars to fill the rest
    const emptyStars = totalStars - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
        stars.push(<img key={`empty-star-${i}`} src={EmptyStarIcon} alt="empty star" />);
    }
  
    return stars;
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
              <h1 className='text-2xl text-white text-center font-semibold mt-4'>{user.name}</h1>
            </div>
            {/*<p>Venue Manager: {user.venueManager ? 'Yes' : 'No'}</p>*/}
            <button onClick={logout} className='text-white text-lg font-semibold bg-black w-[200px] h-[50px] rounded-lg md:mr-[5%] mt-10 md:mt-24 mx-auto'>Logout</button>
          </div>
          {/* Display bookings */}
          <div className='bg-[#171717cc] w-[90%] mx-auto mt-10 px-10 py-5 rounded-t-xl'>
            <h2 className='text-xl font-semibold text-white'>Bookings:</h2>
            <div className='h-[2px] bg-[#ADADAD] w-[240px] rounded-full mt-3 mb-6'></div>
          </div>
          <div className='bg-[#171717cc] w-[90%] mx-auto px-10 pb-5 rounded-b-xl overflow-x-auto whitespace-nowrap scrollbar-hide'>
            {bookings ? (
              <ul className='scrollbar-hide text-white flex flex-row p-0 m-0'>
                {bookings.map((booking) => (
                  <li key={booking.id} className='flex-shrink-0 mr-5 w-[280px] h-[70px]'>
                    <div className='bg-black w-full h-full rounded-md flex flex-row justify-between'>
                      <div className='w-[55%] mx-4 my-2'>
                        <p className='font-semibold truncate'>{booking.venue.name}</p>
                        <div className='flex flex-row my-2 h-5'>
                          {renderRatingStars(booking.venue.rating)}
                        </div>
                      </div>
                      <div className='bg-[#FF5C00] w-[45%] p-2 items-center rounded-r-md'>
                        <p className='text-wrap font-semibold'>{formatDate(booking.dateFrom)} - {formatDate(booking.dateTo)}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-white">No bookings found.</p>
            )}
          </div>
        </div>
      )}

      <Booking user={user} onNewBooking={handleNewBooking} />
    </div>
  );
};

export default Profile;