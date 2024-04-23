import React from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../storage/authStore';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

/*
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
*/

interface LoginFormValues {
  email: string;
  password: string;
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#ffffff', 
    },
    secondary: {
      main: '#FF5C00',
    }
  },
});

const StyledTextField = styled(TextField)({
  '& .MuiInputLabel-root': {
    color: '#d9d9d9', // Field label color
  },
  '& .MuiInputBase-root': {
    color: '#d9d9d9',
    borderRadius: 0, // Adjust border radius
    borderBottom: '2px solid #ffffff',
    borderLeft: '2px solid transparent', // Left border
    borderRight: '2px solid transparent', // Right border
    borderTop: '2px solid transparent', // Top border
    '&:hover': {
      borderBottomColor: '#d9d9d9',
    },
    '&.Mui-focused': {
      borderBottomColor: '#ffffff',
    },
  },
  '& .MuiInputBase-input': {
    color: '#d9d9d9',
  },
});

const LoginForm: React.FC = () => {
  const { control, handleSubmit } = useForm<LoginFormValues>();
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    await login(data.email, data.password);
    navigate('/profiles');
  };

  return (
    <ThemeProvider theme={theme}>
      <form onSubmit={handleSubmit(onSubmit)} className='mx-auto w-[50%] bg-[#171717cc] rounded-b-lg pb-10 justify-center text-center'>
        <div className='w-[80%] mx-auto text-white pt-8 pb-3'>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <StyledTextField {...field} label="Email" variant="outlined" type="email" required fullWidth />
            )}
          />
        </div>
        <div className='w-[80%] mx-auto text-white pt-3 pb-20'>
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <StyledTextField {...field} label="Password" variant="outlined" type="password" required fullWidth />
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