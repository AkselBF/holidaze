import { create } from 'zustand';
import { url } from '../constants/apiUrl'

interface Venue {
  id: string;
  name: string;
  description: string;
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