import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../../images/finished_logo.png';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import HotelRoundedIcon from '@mui/icons-material/HotelRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
//import DarkModeSharpIcon from '@mui/icons-material/DarkModeSharp';
//import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { useAuthStore } from '../../../storage/authStore';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const { user } = useAuthStore();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleScroll = () => {
    if (window.scrollY === 0) {
      setAtTop(true);
    } else {
      setAtTop(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`sticky top-2 text-white m-2 px-4 lg:px-2 rounded-lg z-50 transition-all duration-300 ${atTop ? 'bg-transparent py-2 top-4' : 'bg-[#171717] py-2'}`}>
      <nav className="container mx-auto flex justify-between items-center">
        <div className="hidden lg:flex flex-grow justify-start mx-4">
          <Link to="/" className="text-md mx-4 p-2 bg-black rounded-full">
            <HomeRoundedIcon />
          </Link>
          <Link to="/venues" className="text-md mx-4 p-2 bg-black rounded-full">
            <HotelRoundedIcon />
          </Link>
        </div>

        <Link to="/" className="text-lg font-semibold justify-center">
          <img src={Logo} alt="Logo" className="h-12" />
        </Link>

        <div className="hidden lg:flex flex-grow justify-end mx-4">
          <div className="text-md mx-4 cursor-pointer p-2 rounded-full">
            <div className='w-[24px]'></div>
          </div>
          {user ? (
            <Link to={`/profiles/${user.name}`} className="text-md mx-4 p-2 bg-black rounded-full">
              <PersonRoundedIcon />
            </Link>
          ) : (
            <Link to="/login" className="text-md mx-4 p-2 bg-black rounded-full">
              <PersonRoundedIcon />
            </Link>
          )}
          {/*
          <div className="text-md mx-4 cursor-pointer p-2 bg-black rounded-full">
            <DarkModeSharpIcon />
          </div>
          */}
        </div>

        <div className="flex items-center">
          <div className="lg:hidden">
            <button onClick={toggleMenu} className="text-white">
              <MenuRoundedIcon />
            </button>
          </div>
          <div className={`lg:hidden absolute rounded-bl-xl top-14 w-40 right-0 bg-[#171717cc] text-white pt-4 pb-6 ${isMenuOpen ? 'block' : 'hidden'}`}>
            <div className="container mx-auto flex flex-col px-6 items-start">
              <Link to="/" className="text-md my-3 flex flex-row" onClick={toggleMenu}>
                <HomeRoundedIcon />
                <p className='ml-3'>Home</p>
              </Link>
              <Link to="/venues" className="text-md my-3 flex flex-row" onClick={toggleMenu}>
                <HotelRoundedIcon />
                <p className='ml-3'>Venues</p>
              </Link>
              {user ? (
                <Link to={`/profiles/${user.name}`} className="text-md my-3 flex flex-row" onClick={toggleMenu}>
                  <PersonRoundedIcon />
                  <p className='ml-3'>Profile</p>
                </Link>
              ) : (
                <Link to="/login" className="text-md my-3 flex flex-row" onClick={toggleMenu}>
                  <PersonRoundedIcon />
                  <p className='ml-3'>Login</p>
                </Link>
              )}
              {/*
              <div className="text-md my-3 flex flex-row cursor-pointer" onClick={toggleMenu}>
                <DarkModeSharpIcon />
                <p className='ml-3'>Dark</p>
              </div>
              */}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;