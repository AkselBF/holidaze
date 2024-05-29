import { TextField, Checkbox } from '@mui/material';
import { createTheme, styled } from '@mui/material/styles';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DatePickerProps } from '@mui/x-date-pickers';
import { Dayjs } from 'dayjs';

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
  '& input:-webkit-autofill': {
    WebkitBoxShadow: '0 0 0 1000px #171717 inset',
    WebkitTextFillColor: '#d9d9d9',
    caretColor: '#d9d9d9',
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

export const StyledDatePicker = styled(DatePicker)<DatePickerProps<Dayjs>>({
  margin: '8px',
  '& .MuiInputBase-root': {
    color: '#d9d9d9',
    backgroundColor: '#171717',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#171717',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: '#d9d9d9',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#ffffff',
    },
  },
  '& .MuiInputLabel-root': {
    color: '#d9d9d9',
    alignItems: 'center',
    verticalAlign: 'middle',
    marginTop: '-6px', 
  },
  '& .MuiInputLabel-shrink': {
    color: '#ffffff', 
    marginTop: '0px', 
  },
  '& .MuiSvgIcon-root': {
    color: '#d9d9d9',
  },
  '& .MuiPickersDay-root': {
    color: '#d9d9d9',
    '&.Mui-selected': {
      backgroundColor: '#171717',
    },
    '&.Mui-disabled': {
      color: '#555555',
    },
  },
  '& .MuiPickersCalendarHeader-label': {
    color: '#ffffff',
  },
  '& .MuiPickersCalendarHeader-iconButton': {
    color: '#d9d9d9',
  },
  '& .MuiPickersYear-yearButton': {
    color: '#d9d9d9',
    '&.Mui-selected': {
      backgroundColor: '#42A4FF',
    },
  },
  '& .MuiPickersMonth-root': {
    color: '#d9d9d9',
    '&.Mui-selected': {
      backgroundColor: '#42A4FF',
    },
  },
});