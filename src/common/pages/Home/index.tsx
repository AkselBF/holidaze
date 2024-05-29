import React from "react";
import { Link } from 'react-router-dom';
import Carousel from "../../components/Carousel";
import ImageSlider from "../../components/HeroSlider";
import darkLogo from "../../../assets/images/Finished_logo_dark.png"


const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-full relative">
        <div className="absolute inset-0 mt-[10%] flex items-center justify-center">
          <h1 className="text-white px-10 md:px-16 py-3 md:py-5 text-lg md:text-xl lg:text-3xl font-semibold rounded-full z-10" 
          style={{ background: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 90%)' }}>Welcome to Holidaze</h1>
        </div>
        
        <div className="w-full -mt-[80px] max-h-[520px]">
          <ImageSlider />
        </div>
      </div>

      <div className="mb-10">
        <Carousel />
      </div>
      
      <div className="bg-[#171717] w-full py-8 justify-center text-center">
        <div className="w-[90%] md:w-[50%] mx-auto">
          <img src={darkLogo} alt="dark logo version" className="mt-6 mb-10 h-[100px] mx-auto" />
          <p className="text-white my-2">Dear guest, welcome to our holiday-themed app and do we have deals that will not disappoint.</p>
          <p className="text-white my-2">In this site, resorts from all over the world are being published and ready to welcome you with open arms. If you are quick and decisive, your place in your desired resort is next to guaranteed.</p>
          <p className="text-white my-2">The process to book the resort is simple and direct. All you need to do is select a resort that appears either near the top of this page, or in the 'venues' page where all resorts are listed.</p>
          <p className="text-white my-2">With that, we wish you a wonderful experience.</p>
          <div className="w-[80%] h-0.5 bg-white my-8 mx-auto"></div>
          <p className="text-right text-white font-semibold">Holidaze</p>
        </div>
        <Link to={'/venues'}>
          <button className="text-white text-lg font-semibold bg-[#42A4FF] px-16 py-2 rounded-lg my-10">See venues</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;