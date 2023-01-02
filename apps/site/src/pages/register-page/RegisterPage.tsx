import {Link} from 'wouter';
import {toast} from 'react-toastify';
import ReCAPTCHA from 'react-google-recaptcha';
import {SiteLayout} from '../../components/site-layout/SiteLayout';
import {Box, Button, Card, TextField, Typography} from '@mui/material';
import {PasswordField} from '../../components/password-field/PasswordField';
import React, {createRef, SyntheticEvent, useContext, useState} from 'react';
import {
  GOOGLE_RECAPTCHA_CLIENT_KEY,
  GuestGuard,
  sessionContext,
  userService,
} from '@xray/web';

export function RegisterPage() {
  const recaptchaRef = createRef<any>();
  const {setUser} = useContext(sessionContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordAgain, setPasswordAgain] = useState('');
  const [recaptcha, setRecaptcha] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const canSubmitForm =
    username !== '' && password !== '' && !!recaptcha && !isLoading;

  const [buttonIcon, buttonLabel] = isLoading
    ? ['fas fa-spinner fa-spin', 'Creating Account...']
    : ['fas fa-user-plus', 'Create Account'];

  async function onCreateAccount(event: SyntheticEvent) {
    event.preventDefault();

    if (!canSubmitForm) {
      return;
    }

    try {
      setIsLoading(true);
      const user = await userService.create(username, password, recaptcha!);
      setUser(user);
    } catch (e: any) {
      toast.error('There was a problem creating an account');
      throw e;
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <GuestGuard>
      <SiteLayout>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mt: 4,
          }}
        >
          <Card sx={{padding: 2, width: '100%'}}>
            <form onSubmit={onCreateAccount}>
              <Typography variant="h6">Create an Account</Typography>
              <TextField
                id="username"
                name="username"
                label="Username"
                variant="outlined"
                value={username}
                onChange={event => setUsername(event.target.value)}
                fullWidth
                sx={{mt: 2}}
              />
              <PasswordField
                id="password"
                name="password"
                variant="outlined"
                fullWidth
                value={password}
                onChange={setPassword}
                sx={{mt: 2}}
                required
              />
              <PasswordField
                id="password_again"
                name="password_again"
                label="Password Again"
                variant="outlined"
                fullWidth
                value={passwordAgain}
                onChange={setPasswordAgain}
                sx={{mt: 2}}
                required
              />
              <Box sx={{mt: 2}}>
                <ReCAPTCHA
                  sitekey={GOOGLE_RECAPTCHA_CLIENT_KEY}
                  onChange={_ => setRecaptcha(_)}
                  onExpired={() => setRecaptcha(null)}
                  ref={recaptchaRef as any}
                />
              </Box>
              <Box sx={{mt: 2, float: 'right'}}>
                <Button
                  variant="contained"
                  color="success"
                  type="submit"
                  disabled={!canSubmitForm}
                  sx={{width: '100%', mb: 2}}
                >
                  <i className={buttonIcon} style={{marginRight: 4}} />
                  {buttonLabel}
                </Button>
                <Link to="/login">
                  <Button
                    sx={{background: '#1a1919', width: '100%'}}
                    variant="contained"
                    color="primary"
                    type="button"
                  >
                    Sign In
                  </Button>
                </Link>
              </Box>
            </form>
          </Card>
        </Box>
      </SiteLayout>
    </GuestGuard>
  );
}
