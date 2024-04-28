import { create } from 'zustand';
import { url } from '../constants/apiUrl'

interface Venue {
  id: string;
  name: string;
  description: string;
  media: { url: string; alt: string }[];
  price: number;
  rating: number;
  location: { address: string; city: string; country: string };
  meta: { wifi: boolean; parking: boolean; breakfast: boolean; pets: boolean };
}

interface VenuesState {
  venues: Venue[];
  fetchVenues: () => Promise<void>;
}

export const useVenuesStore = create<VenuesState>((set) => ({
  venues: [],
  fetchVenues: async () => {
    try {
      const response = await fetch(`${url}/venues`);
      const data = await response.json();
      set({ venues: data.data });
    } catch (error) {
      console.error('Error fetching venues:', error);
    }
  },
}));