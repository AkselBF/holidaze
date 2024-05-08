import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../storage/authStore';
import background from '../../images/backgroundImg.png';
import './Modal.css';

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout, updateUserAvatar } = useAuthStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAvatarUrl, setNewAvatarUrl] = useState('');
  const [avatarInputError, setAvatarInputError] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

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
              <h1 className='text-2xl text-center font-semibold mt-4'>{user.name}</h1>
            </div>
            {/*<p>Venue Manager: {user.venueManager ? 'Yes' : 'No'}</p>*/}
            <button onClick={logout} className='text-white text-lg font-semibold bg-black w-[200px] h-[50px] rounded-lg md:mr-[5%] mt-10 md:mt-24 mx-auto'>Logout</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;