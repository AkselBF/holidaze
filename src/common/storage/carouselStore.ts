import { create } from 'zustand';
import { url } from '../constants/apiUrl';

interface Venue {
  id: string;
  name: string;
  media: { url: string; alt: string }[];
  price: number;
  rating: number;
  location: { address: string; city: string; country: string };
  meta: { wifi: boolean; parking: boolean; breakfast: boolean; pets: boolean };
  description: string;
}

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
      const response = await fetch(`${url}/venues?order=-created_at&limit=6`);
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