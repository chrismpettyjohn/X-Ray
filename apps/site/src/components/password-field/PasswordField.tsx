import React, {useState} from 'react';
import {PasswordFieldProps} from './PasswordField.types';
import {TextField, InputAdornment, IconButton} from '@mui/material';

export function PasswordField({ password, onChange, ...props }: PasswordFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  function toggleShowPassword() {
    setShowPassword(_ => !_);
  }

  return (
    <TextField
      label="Password"
      variant="outlined"
      value={password}
      type={showPassword ? "text" : "password"}
      onChange={event => onChange(event.target.value)}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={toggleShowPassword}
            >
              <i className={`fas ${showPassword ? 'fa-eye' : 'fa-eye-slash'}`} />
            </IconButton>
          </InputAdornment>
        )
      }}
      fullWidth
      {...props}
    />
  )
}
