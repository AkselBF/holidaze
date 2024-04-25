import React, { useEffect } from "react";
import { useCarouselStore } from "../../storage/carouselStore";
import "./carousel.css"; // Import CSS module styles

const Carousel: React.FC = () => {
  const { currdeg, venues, fetchNewestVenues, rotate } = useCarouselStore();

  useEffect(() => {
    fetchNewestVenues();
  }, [fetchNewestVenues]);

  const calculatePosition = (index: number): number => {
    // Calculate the position based on the current degree of rotation
    let position = (index * 60 + currdeg) % 360;
    if (position < 0) {
      position += 360; // Ensure positive angle for correct calculation
    }
    return position;
  };

  const calculateOpacity = (index: number): number => {
    const position = calculatePosition(index);
    if (position === 0 || position === 60 || position === 300) {
      return 1; // Full opacity for positions corresponding to 0deg, 60deg, and 300deg
    } else {
      return 0; // Invisible for other positions
    }
  };

  const calculateBlur = (index: number): string => {
    const position = calculatePosition(index);
    if (position === 60 || position === 300) {
      return "blur(3px)"; // Apply blur filter for positions corresponding to 60deg and 300deg
    } else {
      return "blur(0)"; // No blur filter for other positions
    }
  };

  return (
    <div className="carousel_container">
      <div className="carousel transform" style={{ transform: `rotateY(${currdeg}deg)` }}>
        {venues.map((venue, index) => (
          <div
            key={venue.id}
            className={`venue_items ${String.fromCharCode(97 + index)}`}
            style={{ opacity: calculateOpacity(index), filter: calculateBlur(index) }}
          >
            <img
              src={venue.media.length > 0 ? venue.media[0].url : ""}
              alt={venue.name}
              className="w-full h-full object-cover rounded-lg"
            />
            {/* 
            <div className="venue_details">
              <p>{venue.location.country}</p>
              <p>{venue.name}</p>
              <p>Rating: {venue.rating}</p>
              <p>Price: ${venue.price}</p>
            </div>
            */}
          </div>
        ))}
      </div>
      <div className="next_venue -mr-[300px]" onClick={() => rotate("n")}>
        Next
      </div>
      <div className="prev_venue -ml-[300px]" onClick={() => rotate("p")}>
        Prev
      </div>
    </div>
  );
};

export default Carousel;