import React from "react";

import StarIcon from '../../images/starIcon.png';
import HalfStarIcon from '../../images/halfStarIcon.png';
import EmptyStarIcon from '../../images/emptyStarIcon.png';

export interface Booking {
  id: string;
  dateFrom: string;
  dateTo: string;
  guests: number;
  venue: {
    name: string;
    rating: number;
  }
}

interface BookingsSectionProps {
  bookings: Booking[];
}

const renderRatingStars = (rating: number) => {
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

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day < 10 ? '0' + day : day}.${month < 10 ? '0' + month : month}.${year}`;
};

const BookingsSection: React.FC<BookingsSectionProps> = ({ bookings }) => {
  return (
    <div>
      <div className='bg-[#171717cc] w-[90%] mx-auto mt-10 px-10 py-5 rounded-t-xl'>
        <h2 className='text-xl font-semibold text-white'>Bookings:</h2>
        <div className='h-[2px] bg-[#ADADAD] w-[240px] rounded-full mt-3 mb-6'></div>
      </div>
      <div className='bg-[#171717cc] w-[90%] mx-auto px-10 pb-5 rounded-b-xl overflow-x-auto whitespace-nowrap scrollbar-hide'>
        {bookings ? (
          <ul className='scrollbar-hide text-white flex flex-row p-0 m-0'>
            {bookings.map((booking) => (
              <li key={booking.id} className='flex-shrink-0 mr-5 w-[280px] h-[70px]'>
                <div className='bg-black w-full h-full rounded-md flex flex-row justify-between'>
                  <div className='w-[55%] mx-4 my-2'>
                    <p className='font-semibold truncate'>{booking.venue.name}</p>
                    <div className='flex flex-row my-2 h-5'>
                      {renderRatingStars(booking.venue.rating)}
                    </div>
                  </div>
                  <div className='bg-[#FF5C00] w-[45%] p-2 items-center rounded-r-md'>
                    <p className='text-wrap font-semibold'>{formatDate(booking.dateFrom)} - {formatDate(booking.dateTo)}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-white">No bookings found.</p>
        )}
      </div>
    </div>
  );
};

export default BookingsSection;
