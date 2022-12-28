import {TextFieldProps} from '@mui/material';

export interface PasswordFieldProps extends Omit<TextFieldProps, 'onChange'> {
  password?: string;
  onChange(newPassword: string): void;
}
