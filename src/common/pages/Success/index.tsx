import React from "react";
import background from '../../images/backgroundImg.png';
import { Link } from "react-router-dom";

import HomeIcon from '@mui/icons-material/Home';

const Success: React.FC = () => {
  return (
    <div className="p-2 text-white justify-center text-center" style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover', height: '100vh', marginTop: '-80px' }}>
      <div className="mt-[160px] w-[80%] md:w-[60%] lg:w-[40%] mx-auto">
        <h1 className="text-5xl font-semibold mb-10">Success!</h1>
        <p className="text-xl font-semibold my-4">We thank you for choosing our services.</p>
        <p className="text-xl font-semibold">Look forward to your vacations and prepare to have a good time!</p>
        <p className="text-right mt-10">Holidaze</p>
        <Link to='/'>
          <button className="flex flex-row mx-auto mt-16 py-3 px-16 space-x-2 bg-black rounded-lg">
            <HomeIcon />
            <p className="text-lg font-semibold">Home</p>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Success;