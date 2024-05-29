import { create } from 'zustand';
import { url } from '../constants/apiUrl';
import { Venue } from '../interfaces/Venue/venueInterface';


interface VenuesState {
  venues: Venue[];
  fetchVenues: () => Promise<void>;
}

export const useVenuesStore = create<VenuesState>((set) => ({
  venues: [],
  fetchVenues: async () => {
    try {
      const response = await fetch(`${url}/venues?sort=created`);
      const data = await response.json();
      set({ venues: data.data });
    } catch (error) {
      console.error('Error fetching venues:', error);
    }
  },
}));