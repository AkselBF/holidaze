import React, { useEffect, useState } from "react";

import heroOne from "../../../assets/images/heroOne.png";
import heroTwo from "../../../assets/images/heroTwo.png";
import heroThree from "../../../assets/images/heroThree.png";
import heroFour from "../../../assets/images/heroFour.png";

const images = [heroOne, heroTwo, heroThree, heroFour];

const ImageSlider: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[260px] sm:h-[320px] md:h-[380px] lg:h-[440px] xl:h-[520px] overflow-hidden">
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Slide ${index}`}
          className={`absolute w-full h-[260px] sm:h-[320px] md:h-[380px] lg:h-[440px] xl:h-[520px] object-cover transition-opacity duration-1000 ease-in-out ${
            index === currentImageIndex ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </div>
  );
};

export default ImageSlider;