export interface User {
  id?: string;
  name?: string;
  email?: string;
  avatar?: string;
  venueManager?: boolean;
  token: string | null;
}