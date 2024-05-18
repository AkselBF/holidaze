import { TextField, Checkbox } from '@mui/material';
import { createTheme, styled } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#ffffff', 
    },
    secondary: {
      main: '#FF5C00',
    }
  },
});

export const cardTheme = createTheme({
  palette: {
    primary: {
      main: '#42A4FF', 
    },
    secondary: {
      main: '#42A4FF80',
    },
  },
});

export const StyledTextField = styled(TextField)({
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

export const StyledTextArea = styled('textarea')({
  color: '#ffffff',
  backgroundColor: '#171717',
  borderRadius: 0,
  borderBottom: '2px solid #ffffff',
  borderLeft: '2px solid transparent',
  borderRight: '2px solid transparent',
  borderTop: '2px solid transparent',
  '&:hover': {
    borderBottomColor: '#d9d9d9',
  },
  '&:focus': {
    borderBottomColor: '#ffffff',
  },
  height: '100px',
  padding: '10px',
});

export const StyledCheckbox = styled(Checkbox)({
  color: '#ffffff',
});