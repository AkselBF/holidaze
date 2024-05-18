//import React from 'react';
import StarIcon from '../../images/starIcon.png';
import HalfStarIcon from '../../images/halfStarIcon.png';
import EmptyStarIcon from '../../images/emptyStarIcon.png';

const RatingStars = (rating: number) => {
  const totalStars = 5;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  const stars = [];

  // Render full stars
  for (let i = 0; i < fullStars; i++) {
      stars.push(<img key={`star-${i}`} src={StarIcon} alt="star" />);
  }

  // Render half star if applicable
  if (hasHalfStar) {
      stars.push(<img key="half-star" src={HalfStarIcon} alt="half star" />);
  }

  // Render empty stars to fill the rest
  const emptyStars = totalStars - fullStars - (hasHalfStar ? 1 : 0);
  for (let i = 0; i < emptyStars; i++) {
      stars.push(<img key={`empty-star-${i}`} src={EmptyStarIcon} alt="empty star" />);
  }

  return stars;
};

export default RatingStars;