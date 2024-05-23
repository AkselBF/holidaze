import { Booking } from "../Booking/bookingInterface";

export interface Venue {
  id: string;
  name: string;
  description: string;
  media: { url: string; alt: string }[];
  price: number;
  maxGuests: number;
  rating: number;
  location: { address: string; city: string; country: string; continent: string };
  meta: { wifi: boolean; parking: boolean; breakfast: boolean; pets: boolean };
  owner: {
    name: string;
    email: string;
    bio: string;
    avatar: {
      url: string;
      alt: string;
    };
    banner: {
      url: string;
      alt: string;
    };
  };
  bookings: Booking[];
}