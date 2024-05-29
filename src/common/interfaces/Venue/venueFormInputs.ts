export interface VenueFormData {
  name: string;
  description: string;
  media?: { url?: string; alt?: string }[];
  price: string;
  maxGuests: string;
  rating: string;
  meta?: {
    wifi?: boolean;
    parking?: boolean;
    breakfast?: boolean;
    pets?: boolean;
  };
  location?: {
    city?: string;
    country?: string;
    continent?: string;
  };
}