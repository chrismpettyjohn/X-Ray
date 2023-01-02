import {toast} from 'react-toastify';
import {Media, UpdateUserDTO} from '@xray/types';
import {PasswordField} from '../password-field/PasswordField';
import {sessionContext, sessionService} from '@xray/web';
import {CustomizeProfileFormProps} from './CustomizeProfileForm.types';
import {Button, Grid, Paper, TextField, Typography} from '@mui/material';
import React, {ChangeEvent, SyntheticEvent, useContext, useState} from 'react';
import {ProfilePictureEditor} from './profile-picture-editor/ProfilePictureEditor';

export function CustomizeProfileForm({
  defaultUser,
  onChanges,
}: CustomizeProfileFormProps) {
  const {setUser, user} = useContext(sessionContext);
  const [isLoading, setIsLoading] = useState(false);
  const [privateUserDTO, setPrivateUserDTO] = useState<UpdateUserDTO>({
    username: defaultUser.username,
    existingPassword: undefined,
    newPassword: undefined,
  });

  function updatePrivateUserDTO(event: ChangeEvent<HTMLInputElement>) {
    setPrivateUserDTO(_ => ({
      ..._,
      [event.target.name]: event.target?.value ?? '',
    }));
  }

  function updatePrivateUserDTORaw(changes: Partial<UpdateUserDTO>) {
    setPrivateUserDTO(_ => ({
      ..._,
      ...changes,
    }));
  }

  function onChangeProfilePicture(newProfilePicture: Media) {
    setUser({profilePicture: newProfilePicture});
    updatePrivateUserDTORaw({profilePictureMediaID: newProfilePicture.id});
    onSubmitProfileChanges({preventDefault: () => {}} as any);
  }

  async function onSubmitProfileChanges(event: SyntheticEvent) {
    event.preventDefault();
    try {
      if (isLoading) {
        return;
      }
      setIsLoading(true);
      await sessionService.updatePreferences(privateUserDTO);
      setUser({...user, ...privateUserDTO});
      toast.success('Your profile was successfully updated');
    } catch (e: any) {
      toast.error('There was a problem updating your profile');
      throw e;
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmitProfileChanges}>
      <Paper elevation={3} sx={{background: '#24242D', p: 2, mb: 4}}>
        <Grid container spacing={2} sx={{mb: 4}}>
          <Grid item xs={12}>
            <Typography variant="h6">Profile</Typography>
            <Typography variant="caption">
              Your profile is how others see you
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <ProfilePictureEditor
              defaultProfilePicture={defaultUser?.profilePicture}
              onChangeProfilePicture={onChangeProfilePicture}
            />
          </Grid>
        </Grid>
      </Paper>
      <Paper elevation={3} sx={{background: '#24242D', p: 2, mb: 4}}>
        <Grid container sx={{mb: 4}}>
          <Grid item xs={12}>
            <Typography variant="h5">Communication</Typography>
            <Typography variant="caption">
              Other users can only see your communication preferences if it's
              enabled.
            </Typography>
          </Grid>
        </Grid>
        <Grid container sx={{mb: 2}}>
          <Grid item xs={12}>
            <Typography variant="h6">Username</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="username"
              name="username"
              variant="standard"
              value={privateUserDTO?.username}
              onChange={updatePrivateUserDTO}
              fullWidth
              sx={{mt: 2}}
            />
          </Grid>
        </Grid>
      </Paper>
      <Paper elevation={3} sx={{background: '#24242D', p: 2, mb: 4}}>
        <Grid container spacing={2} sx={{mb: 4}}>
          <Grid item xs={12}>
            <Typography variant="h6">Change Password</Typography>
            <Typography variant="caption">
              Make sure to store your new password somewhere safe so you don't
              forget
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <PasswordField
              label="Existing Password"
              password={privateUserDTO.existingPassword}
              onChange={value =>
                updatePrivateUserDTORaw({existingPassword: value})
              }
            />
          </Grid>
          <Grid item xs={6}>
            <PasswordField
              label="New Password"
              password={privateUserDTO.newPassword}
              onChange={value => updatePrivateUserDTORaw({newPassword: value})}
            />
          </Grid>
        </Grid>
      </Paper>
      <Grid container sx={{mb: 2}}>
        <Grid item xs={12} sx={{textAlign: 'right'}}>
          <Button variant="contained" color="success" type="submit">
            <i className="fas fa-save" style={{marginRight: 4}} />
            Save
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
