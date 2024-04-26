import React, { useEffect, useState } from "react";
import { useCarouselStore } from "../../storage/carouselStore";
//import { Link } from "react-router-dom";

import "./carousel.css";

import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';

import StarIcon from '../../images/starIcon.png';
import HalfStarIcon from '../../images/halfStarIcon.png';
import EmptyStarIcon from '../../images/emptyStarIcon.png';

const Carousel: React.FC = () => {
  const { currdeg, venues, fetchNewestVenues, rotate } = useCarouselStore();
  const [isTriangleVisible, setIsTriangleVisible] = useState(true);

  useEffect(() => {
    fetchNewestVenues();
  }, [fetchNewestVenues]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTriangleVisible(true);
    }, 500);

    return () => clearTimeout(timer);
  }, [currdeg]);

  const calculatePosition = (index: number): number => {
    let position = (index * 60 + currdeg) % 360;
    if (position < 0) {
      position += 360;
    }
    return position;
  };

  const calculateOpacity = (index: number): number => {
    const position = calculatePosition(index);
    if (position === 0 || position === 60 || position === 300) {
      return 1;
    } else {
      return 0;
    }
  };

  const calculateBlur = (index: number): string => {
    const position = calculatePosition(index);
    if (position === 60 || position === 300) {
      return "blur(3px)";
    } else {
      return "blur(0)";
    }
  };

  const renderRatingStars = (rating: number) => {
    const totalStars = 5;
    const fullStars = Math.floor(rating / 2);
    const halfStars = rating % 2 === 0 ? 0 : 1;
  
    const stars = [];
  
    for (let i = 0; i < fullStars; i++) {
      stars.push(<img key={`star-${i}`} src={StarIcon} alt="star" />);
    }
  
    if (halfStars === 1) {
      stars.push(<img key="half-star" src={HalfStarIcon} alt="half star" />);
    }
  
    for (let i = stars.length; i < totalStars; i++) {
      stars.push(<img key={`empty-star-${i}`} src={EmptyStarIcon} alt="empty star" />);
    }
  
    return stars;
  };

  return (
    <div className="carousel_container mb-[300px]">
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
                {renderRatingStars(venue.rating)}
              </div>
              <p>Price per guest</p>
              <p>{venue.price} kr,-</p>
            </div>
          </div>
        ))}
      </div>
      <div className="next_venue -mr-[300px]" onClick={() => {
        setIsTriangleVisible(false); 
        rotate("n");
      }}>
        <ArrowForwardIosRoundedIcon />
      </div>
      <div className="prev_venue -ml-[300px]" onClick={() => {
        setIsTriangleVisible(false);
        rotate("p");
      }}>
        <ArrowBackIosRoundedIcon />
      </div>
      <div className={`triangle ${isTriangleVisible ? '' : 'hidden'}`}></div>
    </div>
  );
};

export default Carousel;