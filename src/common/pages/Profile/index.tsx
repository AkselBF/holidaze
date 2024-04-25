import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../storage/authStore';

import background from '../../images/backgroundImg.png';

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } 
  }, [user, navigate]);

  return (
    <div className='p-2' style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover', height: '90.2vh', marginTop: '-80px' }}>
      {user && (
        <div className='mt-[100px] mb-[80px]'>
          <div className='flex flex-col md:flex-row w-full justify-between'>
            <div className='w-[120px] md:ml-[5%] mx-auto'>
              {user.avatar && <img src={user.avatar} alt='Avatar' 
              className='h-[120px] rounded-full' />}
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