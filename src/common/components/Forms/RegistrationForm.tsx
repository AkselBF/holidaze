import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
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

interface RegistrationFormProps {
  onRegisterSuccess: () => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onRegisterSuccess }) => {
  const { control, handleSubmit, setError, watch, trigger, formState } = useForm<RegistrationFormValues>();
  const navigate = useNavigate();
  const { register: registerUser } = useAuthStore();
  const { errors } = formState;
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const onSubmit: SubmitHandler<RegistrationFormValues> = async (data) => {
    if (!data.name) {
      setError('name', { type: 'manual', message: 'Name cannot be empty' });
      return;
    }

    if (!/^[a-zA-Z0-9._%+-]+@stud\.noroff\.no$/.test(data.email)) {
      setError('email', { type: 'manual', message: 'Email must end with @stud.noroff.no' });
      return;
    }

    if (!data.password) {
      setError('password', { type: 'manual', message: 'Password cannot be empty' });
      return;
    }

    if (data.password !== data.repeatPassword) {
      setError('repeatPassword', { type: 'manual', message: 'Passwords must match' });
      return;
    }

    await registerUser(data.name, data.email, data.password, data.venueManager ? 'true' : undefined);
    onRegisterSuccess();
    navigate('/login');
  };

  const name = watch('name');
  const email = watch('email');
  const password = watch('password');
  const repeatPassword = watch('repeatPassword');

  useEffect(() => {
    const isEmailValid = /^[a-zA-Z0-9._%+-]+@stud\.noroff\.no$/.test(email);
    const isFormValid = name && email && password && repeatPassword && !errors.name && !errors.password && !errors.repeatPassword && isEmailValid;
    setIsButtonDisabled(!isFormValid);
  }, [name, email, password, repeatPassword, errors]);

  return (
    <ThemeProvider theme={theme}>
      <form onSubmit={handleSubmit(onSubmit)} className='mx-auto w-[96%] md:w-[80%] lg:w-[50%] xl:w-[40%] bg-[#171717cc] rounded-b-lg pb-10 justify-center text-center'>
        <div className='w-[80%] mx-auto text-white pt-8 pb-1'>
          <Controller
            name="name"
            control={control}
            defaultValue=""
            rules={{ required: 'Name needed' }}
            render={({ field, fieldState }) => (
              <StyledTextField
                {...field}
                label="Username"
                variant="outlined"
                type="text"
                required
                fullWidth
                autoComplete="off"
                error={!!fieldState.error}
                helperText={fieldState.error ? fieldState.error.message : ' '}
                onChange={(e) => {
                  field.onChange(e);
                  if (e.target.value === '') {
                    setError('name', { type: 'manual', message: 'Name needed' });
                  } else {
                    trigger('name');
                  }
                }}
                onBlur={() => {
                  if (field.value === '') {
                    setError('name', { type: 'manual', message: 'Name needed' });
                  }
                }}
              />
            )}
          />
        </div>
        <div className='w-[80%] mx-auto text-white pt-1 pb-1'>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <StyledTextField
                {...field}
                label="Email"
                variant="outlined"
                type="email"
                required
                fullWidth
                autoComplete="off"
                error={!!email && !/^[a-zA-Z0-9._%+-]+@stud\.noroff\.no$/.test(email)}
                helperText={!!email && !/^[a-zA-Z0-9._%+-]+@stud\.noroff\.no$/.test(email) ? 'Incorrect endpoint' : ' '}
              />
            )}
          />
        </div>
        <div className='w-[80%] mx-auto text-white pt-1 pb-1'>
          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{ required: 'Password needed' }}
            render={({ field, fieldState }) => (
              <StyledTextField
                {...field}
                label="Password"
                variant="outlined"
                type="password"
                required
                fullWidth
                autoComplete="off"
                error={!!fieldState.error}
                helperText={fieldState.error ? fieldState.error.message : ' '}
                onChange={(e) => {
                  field.onChange(e);
                  if (e.target.value === '') {
                    setError('password', { type: 'manual', message: 'Password needed' });
                  } else {
                    trigger('password');
                  }
                }}
                onBlur={() => {
                  if (field.value === '') {
                    setError('password', { type: 'manual', message: 'Password needed' });
                  }
                }}
              />
            )}
          />
        </div>
        <div className='w-[80%] mx-auto text-white pt-1 pb-1'>
          <Controller
            name="repeatPassword"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <StyledTextField 
                {...field} 
                label="Repeat Password" 
                variant="outlined" 
                type="password" 
                required 
                fullWidth 
                autoComplete="off" 
                error={!!password && password !== field.value} 
                helperText={!!password && password !== field.value ? 'Incorrect match' : ' '} 
              />
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
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          className='w-[50%] mx-auto'
          disabled={isButtonDisabled}
          style={{ 
            opacity: isButtonDisabled ? 1 : 1,
            backgroundColor: isButtonDisabled ? '#FF5C0080' : theme.palette.secondary.main,
          }}
        >
          Register
        </Button>
      </form>
    </ThemeProvider>
  );
};

export default RegistrationForm;