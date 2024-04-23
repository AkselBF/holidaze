import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';

import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';

import background from '../../images/backgroundImg.png';

const Login: React.FC = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);

  return (
    <div className='p-2' style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover', height: '100vh', marginTop: '-80px' }}>
      <h1 className='mt-[100px] text-center text-2xl font-semibold text-[#FF5C00] bg-[#171717] py-6 rounded-t-lg w-[50%] mx-auto'>{isLoginForm ? 'Login' : 'Register'}</h1>
      {isLoginForm ? <LoginForm /> : <RegistrationForm />}
      <button onClick={() => setIsLoginForm(!isLoginForm)} className='my-3'>
        {isLoginForm ? <ChevronRightRoundedIcon className="text-white w-20 bg-black rounded-full" /> : <KeyboardArrowLeftRoundedIcon className="text-white bg-black rounded-full" />}
      </button>
    </div>
  );
};

export default Login;