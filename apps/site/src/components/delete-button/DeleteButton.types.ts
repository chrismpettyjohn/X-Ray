import {ButtonProps} from '@mui/material';

export interface DeleteButtonProps extends ButtonProps {
  onDelete(): Promise<void>;
  hideLabel?: boolean;
}
