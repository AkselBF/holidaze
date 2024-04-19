import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../storage/authStore';

interface RegistrationFormValues {
  name: string;
  email: string;
  password: string;
  avatar?: string;
  venueManager?: boolean;
}

const RegistrationForm: React.FC = () => {
  const { register, handleSubmit } = useForm<RegistrationFormValues>();
  const navigate = useNavigate();
  const { register: registerUser } = useAuthStore();

  const onSubmit = async (data: RegistrationFormValues) => {
    await registerUser(data.name, data.email, data.password, data.avatar, data.venueManager);
    navigate('/profile');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Username:</label>
        <input {...register('name')} type="text" required />
      </div>
      <div>
        <label>Email:</label>
        <input {...register('email')} type="email" required />
      </div>
      <div>
        <label>Password:</label>
        <input {...register('password')} type="password" required />
      </div>
      <div>
        <label>Avatar URL (optional):</label>
        <input {...register('avatar')} type="text" />
      </div>
      <div>
        <label>Venue Manager:</label>
        <input type="checkbox" {...register('venueManager')} />
      </div>
      <button type="submit">Register</button>
    </form>
  );
};

export default RegistrationForm;