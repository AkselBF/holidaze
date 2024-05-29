import React, { useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../storage/authStore';
import { ThemeProvider } from '@mui/material/styles';
import { theme, StyledTextField } from '../StyledComponents';
import ErrorMessage from '../ErrorMessage';


interface LoginFormValues {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const { control, handleSubmit } = useForm<LoginFormValues>();
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [errorMessage, setErrorMessage] = useState<string>('');

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    try {
      await login(data.email, data.password);
      const userData = localStorage.getItem('userData');
      if (userData) {
        const { name } = JSON.parse(userData);
        navigate(`/profiles/${name}`);
      } 
      else {
        setErrorMessage('Incorrect email or password. Please try again.');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setErrorMessage('Incorrect email or password. Please try again.');
    }
  };

  const closeErrorMessage = () => {
    setErrorMessage('');
  };

  return (
    <ThemeProvider theme={theme}>
      <form onSubmit={handleSubmit(onSubmit)} className='mx-auto w-[96%] md:w-[80%] lg:w-[50%] xl:w-[40%] bg-[#171717cc] rounded-b-lg pb-10 justify-center text-center'>
      {errorMessage && <ErrorMessage message={errorMessage} onClose={closeErrorMessage} />}
        <div className='w-[80%] mx-auto text-white pt-8 pb-3'>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <StyledTextField {...field} label="Email" variant="outlined" type="email" required fullWidth autoComplete="off" />
            )}
          />
        </div>
        <div className='w-[80%] mx-auto text-white pt-3 pb-20'>
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <StyledTextField {...field} label="Password" variant="outlined" type="password" required fullWidth autoComplete="off" />
            )}
          />
        </div>
        <Button type="submit" variant="contained" color="secondary" className='w-[50%] mx-auto'>
          Login
        </Button>
      </form>
    </ThemeProvider>
  );
};

export default LoginForm;