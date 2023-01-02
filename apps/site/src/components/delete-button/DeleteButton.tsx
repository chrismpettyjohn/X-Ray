import React, {useState} from 'react';
import {Button} from '@mui/material';
import {DeleteButtonProps} from './DeleteButton.types';

export function DeleteButton({
  onDelete,
  hideLabel = false,
  ...props
}: DeleteButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const [buttonIcon, buttonText, buttonDisabled] = isLoading
    ? ['fa fa-spinner fa-spin', 'Deleting...', true]
    : showConfirmation
    ? ['fa fa-exclamation-triangle', 'Are You Sure?']
    : ['fa fa-trash', 'Delete'];

  async function onAttemptDelete() {
    if (!showConfirmation) {
      setShowConfirmation(true);
      return;
    }

    try {
      setIsLoading(true);
      await onDelete();
    } finally {
      setShowConfirmation(false);
      setIsLoading(false);
    }
  }

  return (
    <Button
      variant="contained"
      color="error"
      onClick={onAttemptDelete}
      disabled={buttonDisabled}
      onBlur={() => setShowConfirmation(false)}
      type="button"
      {...props}
    >
      <i className={buttonIcon} style={{marginRight: 4}} />
      {!hideLabel && buttonText}
    </Button>
  );
}
