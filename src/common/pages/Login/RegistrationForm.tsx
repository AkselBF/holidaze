import React from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { TextField, Checkbox, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../storage/authStore';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

interface RegistrationFormValues {
  name: string;
  email: string;
  password: string;
  avatar?: string;
  venueManager?: boolean;
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
    color: '#d9d9d9',
  },
  '& .MuiInputBase-root': {
    color: '#d9d9d9',
    borderRadius: 0,
    borderBottom: '2px solid #ffffff',
    borderLeft: '2px solid transparent',
    borderRight: '2px solid transparent',
    borderTop: '2px solid transparent',
    '&:hover': {
      borderBottomColor: '#d9d9d9',
    },
    '&.Mui-focused': {
      borderBottomColor: '#ffffff',
    },
  },
  '& .MuiInputBase-input': {
    color: '#d9d9d9',
    height: '15px',
  },
});

const StyledCheckbox = styled(Checkbox)({
  color: '#ffffff',
});

const RegistrationForm: React.FC = () => {
  const { control, handleSubmit } = useForm<RegistrationFormValues>();
  const navigate = useNavigate();
  const { register: registerUser } = useAuthStore();

  const onSubmit: SubmitHandler<RegistrationFormValues> = async (data) => {
    await registerUser(data.name, data.email, data.password, data.avatar, data.venueManager);
    navigate('/profiles');
  };

  return (
    <ThemeProvider theme={theme}>
      <form onSubmit={handleSubmit(onSubmit)} className='mx-auto w-[96%] md:w-[80%] lg:w-[50%] xl:w-[40%] bg-[#171717cc] rounded-b-lg pb-10 justify-center text-center'>
        <div className='w-[80%] mx-auto text-white pt-8 pb-3'>
          <Controller
            name="name"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <StyledTextField {...field} label="Username" variant="outlined" type="text" required fullWidth />
            )}
          />
        </div>
        <div className='w-[80%] mx-auto text-white pt-3 pb-3'>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <StyledTextField {...field} label="Email" variant="outlined" type="email" required fullWidth />
            )}
          />
        </div>
        <div className='w-[80%] mx-auto text-white pt-3 pb-3'>
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <StyledTextField {...field} label="Password" variant="outlined" type="password" required fullWidth />
            )}
          />
        </div>
        <div className='w-[80%] mx-auto text-white pt-3 pb-3'>
          <Controller
            name="avatar"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <StyledTextField {...field} label="Avatar URL (optional)" variant="outlined" type="text" fullWidth />
            )}
          />
        </div>
        <div className='w-[80%] mx-auto text-white pt-3 pb-5 text-left'>
          <Controller
            name="venueManager"
            control={control}
            defaultValue={false}
            render={({ field }) => (
              <StyledCheckbox {...field} />
            )}
          />
          <label>Venue Manager</label>
        </div>
        <Button type="submit" variant="contained" color="secondary" className='w-[50%] mx-auto'>
          Register
        </Button>
      </form>
    </ThemeProvider>
  );
};

export default RegistrationForm;