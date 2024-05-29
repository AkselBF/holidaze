//import React from 'react';
import StarIcon from '../../../assets/images/starIcon.png';
import HalfStarIcon from '../../../assets/images/halfStarIcon.png';
import EmptyStarIcon from '../../../assets/images/emptyStarIcon.png';

const RatingStars = (rating: number) => {
  const totalStars = 5;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  const stars = [];

  for (let i = 0; i < fullStars; i++) {
      stars.push(<img key={`star-${i}`} src={StarIcon} alt="star" />);
  }

  if (hasHalfStar) {
      stars.push(<img key="half-star" src={HalfStarIcon} alt="half star" />);
  }

  const emptyStars = totalStars - fullStars - (hasHalfStar ? 1 : 0);
  for (let i = 0; i < emptyStars; i++) {
      stars.push(<img key={`empty-star-${i}`} src={EmptyStarIcon} alt="empty star" />);
  }

  return stars;
};

export default RatingStars;