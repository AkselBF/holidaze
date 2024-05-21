import { url, apiKey } from "../../constants/apiUrl";
import { Booking } from "../../interfaces/Booking/bookingInterface";

export const fetchUserBookings = async (userName: string, token: string | undefined): Promise<Booking[]> => {
  try {
    const response = await fetch(`${url}/profiles/${userName}/?_bookings=true&_venues=true`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'X-Noroff-API-Key': apiKey,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user bookings');
    }

    const responseData = await response.json();
    return responseData.data.bookings;
  } catch (error) {
    console.error('Error fetching user bookings:', error);
    throw error;
  }
};