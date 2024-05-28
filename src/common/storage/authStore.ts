import { create } from 'zustand';
import { loginUrl, registerUrl, url, apiKey } from '../constants/apiUrl';
//import { User } from '../interfaces/User/userInterface';
import avatarImage from '../images/avatarBase.png';

export interface User {
  id?: string;
  name?: string;
  email?: string;
  avatar?: string;
  venueManager?: boolean;
  token: string | null;
}

interface AuthState {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, avatar?: string, venueManager?: boolean) => Promise<void>;
  logout: () => void;
  updateUserAvatar: (avatarUrl: string) => Promise<void>;
  token: string | null;
}

export const useAuthStore = create<AuthState>((set) => {
  const accessToken = localStorage.getItem('accessToken');
  const userData = localStorage.getItem('userData');
  const user: User | null = accessToken && userData ? JSON.parse(userData) : null;

  const setUser = (newUser: User | null) => {
    set({ user: newUser });
    if (newUser) {
      localStorage.setItem('userData', JSON.stringify(newUser));
    } 
    else {
      localStorage.removeItem('userData');
    }
  };

  return {
    user,
    token: user ? user.token : null,
    login: async (email, password) => {
      try {
        const response = await fetch(`${loginUrl}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });
        const data = await response.json();

        if (response.ok) {
          const token = data.data.accessToken;
          const avatar = data.data.avatar?.url || avatarImage;
          let venueManager = false;
          if (data.data.venueManager !== undefined) {
            venueManager = data.data.venueManager;
          }
          const userInfo: User = {
            name: data.data.name,
            email: data.data.email,
            avatar,
            venueManager,
            token,
          };
          localStorage.setItem('accessToken', token);
          setUser(userInfo);
        } else {
          throw new Error('Login failed');
        }
      } catch (error) {
        console.error('Error logging in:', error);
      }
    },
    register: async (username, email, password, isVenueManager) => {
      try {
        const requestBody: {
          name: string;
          email: string;
          password: string;
          venueManager?: boolean;
        } = {
          name: username,
          email,
          password,
        };

        if (isVenueManager) {
          requestBody.venueManager = true;
        }

        const response = await fetch(`${registerUrl}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });

        if (response.ok) {
          //const data = await response.json();
          //setUser({ ...data.data });
          /*const token = data.data.accessToken;
          localStorage.setItem('accessToken', token);
          const avatar = data.data.avatar?.url || avatarImage;
          setUser({ ...data.data, token, avatar });*/
        } 
        else {
          throw new Error('Registration failed');
        }
      } 
      catch (error) {
        console.error('Error registering:', error);
      }
    }, 
    logout: () => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('userData');
      setUser(null);
    },
    updateUserAvatar: async (avatarUrl) => {
      try {
        const currentUser = user;
        if (!currentUser) throw new Error('User not logged in');

        const response = await fetch(`${url}/profiles/${currentUser.name}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${currentUser.token}`,
            'X-Noroff-API-Key': apiKey,
          },
          body: JSON.stringify({
            avatar: { url: avatarUrl, alt: `${currentUser.name}'s avatar` },
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to update avatar');
        }

        const data = await response.json();
        const updatedUser: User = {
          ...currentUser,
          avatar: data.data.avatar.url,
        };
        setUser(updatedUser);
      } catch (error) {
        console.error('Error updating avatar:', error);
      }
    },
  };
});