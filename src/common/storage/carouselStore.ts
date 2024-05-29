import { create } from 'zustand';
import { url } from '../constants/apiUrl';
import { Venue } from '../interfaces/Venue/venueInterface';


interface CarouselState {
  currdeg: number;
  venues: Venue[];
  fetchNewestVenues: () => Promise<void>;
  rotate: (direction: "n" | "p") => void;
}

export const useCarouselStore = create<CarouselState>((set) => ({
  currdeg: 0,
  venues: [],
  fetchNewestVenues: async () => {
    try {
      const response = await fetch(`${url}/venues?sort=created&limit=6`);
      const data = await response.json();
      set({ venues: data.data });
    } catch (error) {
      console.error('Error fetching newest venues:', error);
    }
  },
  rotate: (direction) =>
    set((state) => ({
      currdeg: direction === "n" ? state.currdeg - 60 : state.currdeg + 60,
    })),
}));