import { url, apiKey } from "../../constants/apiUrl";
import { Venue } from "../../interfaces/Venue/venueInterface";
import { User } from "../../interfaces/User/userInterface";

export const fetchVenues = async (user: User): Promise<Venue[]> => {
  if (!user || !user.name) {
    throw new Error('User is not authenticated');
  }

  const response = await fetch(`${url}/profiles/${user.name}/venues`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${user.token}`,
      'X-Noroff-API-Key': apiKey,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch venues');
  }

  const data = await response.json();
  return data.data;
};