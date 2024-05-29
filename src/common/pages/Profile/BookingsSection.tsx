import React from "react";
import RatingStars from "../../components/RatingStars";
import { formatDate } from "../../components/DateFormatter/formatDate";

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

const BookingsSection: React.FC<BookingsSectionProps> = ({ bookings }) => {
  return (
    <div>
      <div className='bg-[#171717cc] w-[90%] mx-auto mt-10 px-10 py-5 rounded-t-xl'>
        <h2 className='text-xl font-semibold text-white'>Bookings:</h2>
        <div className='h-[2px] bg-[#ADADAD] w-[240px] rounded-full mt-3 mb-6'></div>
      </div>
      <div className='bg-[#171717cc] w-[90%] mx-auto px-10 pb-5 rounded-b-xl overflow-x-auto whitespace-nowrap scrollbar-profile-bookings'>
        {bookings ? (
          <ul className='scrollbar-profile-bookings text-white flex flex-row p-0 m-0'>
            {bookings.map((booking) => (
              <li key={booking.id} className='flex-shrink-0 mr-5 w-[300px] h-[70px]'>
                <div className='bg-black w-full h-full rounded-md flex flex-row justify-between'>
                  <div className='w-[52%] mx-4 my-2'>
                    <p className='font-semibold truncate'>{booking.venue.name}</p>
                    <div className='flex flex-row my-2 h-5'>
                      {RatingStars(booking.venue.rating)}
                    </div>
                  </div>
                  <div className='bg-[#FF5C00] w-[48%] p-2 items-center rounded-r-md'>
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
