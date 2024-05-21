import React, { useEffect, useState } from "react";
import { useCarouselStore, Venue } from "../../storage/carouselStore";
import RatingStars from "../RatingStars";
import { Link } from "react-router-dom";

import "./carousel.css";

import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';

import Allowed from '../../images/allowed.png';
import Unallowed from '../../images/unallowed.png';

import StarIcon from '@mui/icons-material/Star';
import WifiIcon from '@mui/icons-material/Wifi';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import FreeBreakfastIcon from '@mui/icons-material/FreeBreakfast';
import PetsIcon from '@mui/icons-material/Pets';

const Carousel: React.FC = () => {
  const { currdeg, venues, fetchNewestVenues, rotate } = useCarouselStore();
  const [isTriangleVisible, setIsTriangleVisible] = useState(true);
  const [centeredVenue, setCenteredVenue] = useState<Venue | null>(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    fetchNewestVenues();
  }, [fetchNewestVenues]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTriangleVisible(true);
    }, 500);

    return () => clearTimeout(timer);
  }, [currdeg]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const centerIndex = Math.floor(((-currdeg + 30) % 360) / 60);
    const adjustedIndex = centerIndex >= 0 ? centerIndex : centerIndex + venues.length;
    setCenteredVenue(venues[adjustedIndex]);
  }, [currdeg, venues, windowWidth]);

  const calculatePosition = (index: number): number => {
    let position = (index * 60 + currdeg) % 360;

    if (position < 0) {
      position += 360;
    }
    return position;
  };

  const calculateOpacity = (index: number): number => {
    const position = calculatePosition(index);
    const screenWidth = window.innerWidth;
    const lgBreakpoint = 1024;

    if (screenWidth < lgBreakpoint) {
      return position === 0 ? 1 : 0;
    } else {
      return position === 0 || position === 60 || position === 300 ? 1 : 0;
    }
  };

  const calculateBlur = (index: number): string => {
    const position = calculatePosition(index);
    const screenWidth = window.innerWidth;
    const lgBreakpoint = 1024;

    if (screenWidth < lgBreakpoint) {
      return "blur(0)";
    } 
    else {
      return position === 60 || position === 300 ? "blur(3px)" : "blur(0)";
    }
  };

  return (
    <div className="carousel_container mb-[880px] lg:mb-[600px]">
      <div className="carousel transform" style={{ transform: `rotateY(${currdeg}deg)` }}>
        {venues.map((venue, index) => (
          <div
            key={venue.id}
            className={`venue_items ${String.fromCharCode(97 + index)} border-t-4`}
            style={{ opacity: calculateOpacity(index), filter: calculateBlur(index) }}
          >
            <img
              src={venue.media.length > 0 ? venue.media[0].url : ""}
              alt={venue.name}
              className="w-full h-full object-cover"
            />
            <div className="venue_details h-[200px]">
              <p className="text-lg">{venue.location.country}</p>
              <p className="text-xl font-semibold">{venue.name}</p>
              <div className="h-1 w-1 rounded-full bg-[#FF5C00] mx-auto mt-5 mb-3"></div>
              <div className='flex flex-row justify-center h-5 my-3'>
                {RatingStars(venue.rating)}
              </div>
              <p>Price per guest</p>
              <p>{venue.price} kr,-</p>
            </div>
          </div>
        ))}
      </div>
      <div className="next_venue -mr-[240px] mt-[200px]" onClick={() => {
        setIsTriangleVisible(false); 
        rotate("n");
      }}>
        <ArrowForwardIosRoundedIcon />
      </div>
      <div className="prev_venue -ml-[240px] mt-[200px]" onClick={() => {
        setIsTriangleVisible(false);
        rotate("p");
      }}>
        <ArrowBackIosRoundedIcon />
      </div>
      <div className={`triangle ${isTriangleVisible ? '' : 'hidden'}`}></div>

      {centeredVenue && centeredVenue.media && centeredVenue.media.length > 0 && (
        <div className="centered_venue_data absolute top-[480px] lg:top-[460px] w-full flex flex-col lg:flex-row justify-between mx-auto">
          <div className="w-[80%] lg:w-[45%] mx-auto mb-5">
            <img src={centeredVenue.media[0].url} alt={centeredVenue.name} className="w-full max-h-[280px] object-cover" />
          </div>
          <div className="w-[80%] lg:w-[45%] mx-auto">
            <p className="text-5xl font-semibold line-clamp-1">{centeredVenue.name}</p>
            <div className=" h-1 bg-slate-400 my-5 w-full"></div>
            <div className="flex flex-row space-x-8">
              <div className='flex flex-row'>
                <StarIcon />
                <p className='ml-2 font-semibold text-[#FF5C00]'>{centeredVenue.rating}</p>
              </div>
              <div className='flex flex-row'>
                <WifiIcon />
                <p className='ml-2'>{centeredVenue.meta.wifi ? <img className="h-6 min-h-6 max-h-6 min-w-6 max-w-6" src={Allowed} alt="Allowed" /> : <img className="h-6 min-h-6 max-h-6 min-w-6 max-w-6" src={Unallowed} alt="Not allowed" />}</p>
              </div>
              <div className='flex flex-row'>
                <LocalParkingIcon />
                <p className='ml-2'>{centeredVenue.meta.parking ? <img className="h-6 min-h-6 max-h-6 min-w-6 max-w-6" src={Allowed} alt="Allowed" /> : <img className="h-6 min-h-6 max-h-6 min-w-6 max-w-6" src={Unallowed} alt="Not allowed" />}</p>
              </div>
              <div className='flex flex-row'>
                <FreeBreakfastIcon />
                <p className='ml-2'>{centeredVenue.meta.breakfast ? <img className="h-6 min-h-6 max-h-6 min-w-6 max-w-6" src={Allowed} alt="Allowed" /> : <img className="h-6 min-h-6 max-h-6 min-w-6 max-w-6" src={Unallowed} alt="Not allowed" />}</p>
              </div>
              <div className='flex flex-row'>
                <PetsIcon />
                <p className='ml-2'>{centeredVenue.meta.pets ? <img className="h-6 min-h-6 max-h-6 min-w-6 max-w-6" src={Allowed} alt="Allowed" /> : <img className="h-6 min-h-6 max-h-6 min-w-6 max-w-6" src={Unallowed} alt="Not allowed" />}</p>
              </div>
            </div>
            <p className="line-clamp-2 mt-3">{centeredVenue.description}</p>
            <div className="flex flex-row justify-between pt-10">
              <p className="font-semibold">{centeredVenue.price} kr,-</p>
              <Link to={`/venues/${centeredVenue.id}`}>
                <button className="bg-[#171717] text-white font-semibold py-2 px-10 rounded-lg">See more</button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Carousel;