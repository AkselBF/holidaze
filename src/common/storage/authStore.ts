import { create } from 'zustand';
import { loginUrl, registerUrl, url, apiKey } from '../constants/apiUrl';
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
  updateUserAvatar: (avatarUrl: string) => void;
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
          //const avatar = data.data.avatar?.url || null;
          const defaultAvatarUrl = avatarImage;
          const avatar = defaultAvatarUrl || data.data.avatar?.url;
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
    register: async (username, email, password,/* avatar,*/ isVenueManager) => {
      try {
        //const avatarObject = avatar ? { url: avatar, alt: '' } : undefined;

        const requestBody: {
          name: string;
          email: string;
          password: string;
          //avatar?: { url: string; alt: string };
          venueManager?: boolean;
        } = {
          name: username,
          email,
          password,
          //avatar: avatarObject,
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
          const data = await response.json();
          const token = data.data.accessToken;
          localStorage.setItem('accessToken', token);
          //setUser({ ...data.data, token, avatar: data.data.avatar?.url || null });
          const defaultAvatarUrl = avatarImage;
          setUser({ ...data.data, token, avatar: defaultAvatarUrl });
        } 
        else {
          throw new Error('Login failed');
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
      if (user && user.name) {
        const updatedUser = { ...user, avatar: avatarUrl };
        setUser(updatedUser);

        // Update user profile on the server
        try {
          const response = await fetch(`${url}/profiles/${user.name}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${apiKey}`,
            },
            body: JSON.stringify({ avatar: { url: avatarUrl } }),
          });

          if (!response.ok) {
            throw new Error('Failed to update user profile');
          }
        } catch (error) {
          console.error('Error updating user profile:', error);
          // Handle error appropriately, such as displaying an error message to the user
        }
      }
    }
  };
});
