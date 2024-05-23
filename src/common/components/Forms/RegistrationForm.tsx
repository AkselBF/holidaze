import React from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { Button } from '@mui/material';
//import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../storage/authStore';
import { ThemeProvider } from '@mui/material/styles';
import { theme, StyledTextField, StyledCheckbox } from '../StyledComponents';

interface RegistrationFormValues {
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
  venueManager?: boolean;
}

const RegistrationForm: React.FC = () => {
  const { control, handleSubmit, setError, watch } = useForm<RegistrationFormValues>();
  //const navigate = useNavigate();
  const { register: registerUser } = useAuthStore();

  const onSubmit: SubmitHandler<RegistrationFormValues> = async (data) => {
    if (data.password !== data.repeatPassword) {
      setError('repeatPassword', { type: 'manual', message: 'Passwords must match' });
      return;
    }

    await registerUser(data.name, data.email, data.password, data.venueManager ? 'true' : undefined);
    //navigate(`/profiles/${data.name}`);
  };

  const password = watch('password');

  return (
    <ThemeProvider theme={theme}>
      <form onSubmit={handleSubmit(onSubmit)} className='mx-auto w-[96%] md:w-[80%] lg:w-[50%] xl:w-[40%] bg-[#171717cc] rounded-b-lg pb-10 justify-center text-center'>
        <div className='w-[80%] mx-auto text-white pt-8 pb-3'>
          <Controller
            name="name"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <StyledTextField {...field} label="Username" variant="outlined" type="text" required fullWidth autoComplete="off" />
            )}
          />
        </div>
        <div className='w-[80%] mx-auto text-white pt-3 pb-3'>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <StyledTextField {...field} label="Email" variant="outlined" type="email" required fullWidth autoComplete="off" />
            )}
          />
        </div>
        <div className='w-[80%] mx-auto text-white pt-3 pb-3'>
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <StyledTextField {...field} label="Password" variant="outlined" type="password" required fullWidth autoComplete="off" />
            )}
          />
        </div>
        <div className='w-[80%] mx-auto text-white pt-3 pb-3'>
          <Controller
            name="repeatPassword"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <StyledTextField {...field} label="Repeat Password" variant="outlined" type="password" required fullWidth autoComplete="off" error={!!password && password !== field.value} helperText={!!password && password !== field.value && 'Passwords must match'} />
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