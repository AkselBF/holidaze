import { url, apiKey } from "../../constants/apiUrl";
import { Venue } from "../../interfaces/Venue/venueInterface";

interface ApiResponse<T> {
  data: T;
  message?: string;
}

export const fetchVenueDetails = async (id: string, token?: string): Promise<Venue> => {
  try {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      'X-Noroff-API-Key': apiKey,
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${url}/venues/${id}?_bookings=true`, {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch venue details: ${errorText}`);
    }

    const responseData: ApiResponse<Venue> = await response.json();

    if (!responseData.data) {
      throw new Error('No data found in response');
    }

    return responseData.data;
  } catch (error) {
    console.error('Error fetching venue details:', error);
    throw error;
  }
};