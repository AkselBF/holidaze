import { url, apiKey } from "../../constants/apiUrl";
import { Venue } from "../../interfaces/Venue/venueInterface";
import { User } from "../../storage/authStore";

export const fetchVenueDetails = async (id: string): Promise<Venue> => {
  try {
    const response = await fetch(`${url}/venues/${id}`);

    if (!response.ok) {
      throw new Error('Failed to fetch venue details');
    }

    const responseData = await response.json();
    return responseData.data;
  } catch (error) {
    console.error('Error fetching venue details:', error);
    throw error;
  }
};

export const createBooking = async (
  user: User,
  venueId: string,
  arrivalDate: string,
  departureDate: string,
  numGuests: number
): Promise<void> => {
  try {
    const newBooking = {
      venueId,
      dateFrom: arrivalDate,
      dateTo: departureDate,
      guests: numGuests,
    };

    const response = await fetch(`${url}/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`,
        'X-Noroff-API-Key': apiKey,
      },
      body: JSON.stringify(newBooking),
    });

    if (!response.ok) {
      if (response.status === 409) {
        throw new Error('Booking conflict: There is already a booking for this venue during the specified time period.');
      } else {
        throw new Error('Failed to create booking');
      }
    }
  } catch (error) {
    console.error('Error processing booking:', error);
    throw error;
  }
};