import {toast} from 'react-toastify';
import {Link, useLocation} from 'wouter';
import ReCAPTCHA from "react-google-recaptcha";
import {Box, Button, TextField} from '@mui/material';
import {PasswordField} from '../password-field/PasswordField';
import React, {createRef, SyntheticEvent, useContext, useState} from 'react';
import {GOOGLE_RECAPTCHA_CLIENT_KEY, sessionContext, sessionService} from '@xray/web';

export function CredentialLoginForm() {
  const [, setLocation] = useLocation();
  const recaptchaRef = createRef<any>();
  const {setUser} = useContext(sessionContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [recaptcha, setRecaptcha] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const canSubmitForm = username !== '' && password !== '' && !!recaptcha && !isLoading;

  const [buttonIcon, buttonLabel] = isLoading
    ? ['fas fa-spinner fa-spin', 'Signing In...']
    : ['fas fa-sign-in', 'Sign In']

  async function onSignIn(event: SyntheticEvent) {
    event.preventDefault();

    if (!canSubmitForm) {
      return;
    }

    try {
      setIsLoading(true);
      const authenticatedUser = await sessionService.attemptCredentials(username, password, recaptcha!);
      setUser(authenticatedUser);
      setLocation('/home');
    } catch (e: any) {
      toast.error('There was a problem logging in');
      throw e;
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={onSignIn}>
      <TextField id="username" name="username" label="Username" variant="outlined" value={username} onChange={event => setUsername(event.target.value)} fullWidth sx={{mt: 2}} required />
      <PasswordField id="password" name="password" variant="outlined" fullWidth value={password} onChange={setPassword} sx={{mt: 2}} required />
      <Box sx={{mt: 2}}>
        <ReCAPTCHA
          sitekey={GOOGLE_RECAPTCHA_CLIENT_KEY}
          onChange={_ => setRecaptcha(_)}
          onExpired={() => setRecaptcha( null)}
          ref={recaptchaRef as any}
        />
      </Box>
      <Box sx={{mt: 2, float: 'right'}}>
        <Button variant="contained" color="success" type="submit" disabled={!canSubmitForm} sx={{width: '100%', mb: 2}}>
          <i className={buttonIcon} style={{marginRight: 4}} />
          {buttonLabel}
        </Button>
        <Link to="/register">
          <Button sx={{background: '#1a1919', width: '100%'}} variant="contained" color="primary" type="button">
            Create Account
          </Button>
        </Link>
      </Box>
    </form>
  )
}
