import { Customer } from "../Customer/customerInterface";

export interface Booking {
  id: string;
  dateFrom: string;
  dateTo: string;
  guests: number;
  created: string;
  updated: string;
  customer: Customer;
  venue: {
    name: string;
    rating: number;
  }
}