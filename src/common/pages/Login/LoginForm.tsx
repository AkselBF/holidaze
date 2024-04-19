import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../storage/authStore';

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const { register, handleSubmit } = useForm<LoginFormValues>();
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const onSubmit = async (data: LoginFormValues) => {
    await login(data.email, data.password);
    navigate('/profile');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Email:</label>
        <input {...register('email')} type="email" required />
      </div>
      <div>
        <label>Password:</label>
        <input {...register('password')} type="password" required />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;