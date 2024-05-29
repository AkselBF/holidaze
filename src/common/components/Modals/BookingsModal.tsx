import React, { useState } from "react";
import { Venue } from "../../interfaces/Venue/venueInterface";
import { formatDate } from "../DateFormatter/formatDate";
import ScrollLock from '../ScrollLock';
import './Modal.css';
import '../Scrollbars/FormsScrollbar.css';

interface BookingsModalProps {
  venue: Venue | null;
  onClose: () => void;
}

const BookingsModal: React.FC<BookingsModalProps> = ({ venue, onClose }) => {
  if (!venue) return null;
  const [lockScroll] = useState(true);

  return (
    <div className="modal-overlay">
      <ScrollLock lock={lockScroll} />
      <div className="modal-container scrollbar-form mt-5 text-white w-[90%] lg:w-[60%] h-[80%] overflow-y-auto p-6">
        <div className='relative'>
          <button className="text-2xl font-semibold cursor-pointer absolute -top-2 right-1 bg-red-500 pb-0.5 px-2 rounded-full" onClick={onClose}>&times;</button>
        </div>
        <h2 className='text-2xl mx-auto text-center font-semibold mt-3 mb-10 w-[80%] line-clamp-2'>Bookings for {venue.name}</h2>
        
        {venue.bookings && venue.bookings.length > 0 ? (
          <div className="space-y-4">
            {venue.bookings.map((booking) => (
              <div key={booking.id} className="p-4 border rounded-lg shadow-md bg-black">
                <div className="flex justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Dates:</p>
                    <p className="text-lg font-medium">
                      {formatDate(booking.dateFrom)} - {formatDate(booking.dateTo)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Guests:</p>
                    <p className="text-lg font-medium">{booking.guests}</p>
                  </div>
                </div>
                <div className="mt-2">
                  <p className="text-sm text-gray-400">Customer:</p>
                  <p className="text-lg font-medium">{booking.customer.name}</p>
                  <p className="text-sm text-gray-500">{booking.customer.email}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">This venue has not been booked yet.</p>
        )}
      </div>
    </div>
  );
};

export default BookingsModal;