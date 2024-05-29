import React, { useState } from 'react';
import LoginForm from '../../components/Forms/LoginForm';
import RegistrationForm from '../../components/Forms/RegistrationForm';

import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';

import background from '../../../assets/images/backgroundImg.png';

const Login: React.FC = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);

  const handleRegisterSuccess = () => {
    setIsLoginForm(true);
  };

  return (
    <div className='p-2' style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover', height: '100vh', marginTop: '-80px' }}>
      <div className='flex flex-row relative'>
        <h1 className='mt-[100px] text-center text-2xl font-semibold text-[#FF5C00] bg-[#171717] py-6 rounded-t-lg w-[96%] md:w-[80%] lg:w-[50%] xl:w-[40%] mx-auto'>{isLoginForm ? 'Login' : 'Register'}</h1>
        <button onClick={() => setIsLoginForm(!isLoginForm)} className='my-3'>
          {isLoginForm ? 
            <div className='absolute text-white flex flex-row top-[130px] right-[3%] sm:right-[10%] md:right-[14%] lg:right-[28%] xl:right-[32%]'>
              <p className='md:px-2'>Register</p>
              <ChevronRightRoundedIcon className='mt-[2px]' />
            </div> : <div className='absolute text-white flex flex-row-reverse top-[130px] left-[3%] sm:left-[10%] md:left-[14%] lg:left-[28%] xl:left-[32%]'>
              <p className='md:px-2'>Login</p>
              <KeyboardArrowLeftRoundedIcon className='mt-[2px]' />
            </div>
          }
        </button>
      </div>
      {isLoginForm ? <LoginForm /> : <RegistrationForm onRegisterSuccess={handleRegisterSuccess} />}
    </div>
  );
};

export default Login;