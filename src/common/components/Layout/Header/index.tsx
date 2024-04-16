import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../../images/finished_logo.png';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import HotelRoundedIcon from '@mui/icons-material/HotelRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import DarkModeSharpIcon from '@mui/icons-material/DarkModeSharp';
//import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-[#171717] text-white p-2 sticky rounded-lg top-0 z-50">
      <nav className="container mx-auto flex justify-between items-center">
        <div className="hidden lg:flex flex-grow justify-start">
          <Link to="/" className="text-md mx-4">
            <HomeRoundedIcon />
          </Link>
          <Link to="/venues" className="text-md mx-4">
            <HotelRoundedIcon />
          </Link>
        </div>

        <Link to="/" className="text-lg font-semibold justify-center">
          <img src={Logo} alt="Logo" className="h-12" />
        </Link>

        <div className="hidden lg:flex flex-grow justify-end">
          <Link to="/login" className="text-md mx-4">
            <PersonRoundedIcon />
          </Link>
          <div className="text-md mx-4 cursor-pointer">
            <DarkModeSharpIcon />
          </div>
        </div>

        <div className="flex items-center">
          <div className="lg:hidden">
            <button onClick={toggleMenu} className="text-white">
              <MenuRoundedIcon />
            </button>
          </div>
          <div className={`lg:hidden absolute rounded-bl-xl top-14 w-40 right-0 bg-[#171717cc] text-white pt-4 pb-6 ${isMenuOpen ? 'block' : 'hidden'}`}>
            <div className="container mx-auto flex flex-col px-6 items-start">
              <Link to="/" className="text-md my-2 flex flex-row" onClick={toggleMenu}>
                <HomeRoundedIcon />
                <p className='ml-3'>Home</p>
              </Link>
              <Link to="/" className="text-md my-2 flex flex-row" onClick={toggleMenu}>
                <HotelRoundedIcon />
                <p className='ml-3'>Venues</p>
              </Link>
              <Link to="/" className="text-md my-2 flex flex-row" onClick={toggleMenu}>
                <PersonRoundedIcon />
                <p className='ml-3'>Login</p>
              </Link>
              <div className="text-md my-2 flex flex-row cursor-pointer" onClick={toggleMenu}>
                <DarkModeSharpIcon />
                <p className='ml-3'>Dark</p>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;