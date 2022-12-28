import React from 'react';
import {Box, Card, Typography} from '@mui/material';
import {SiteLayout} from '../../components/site-layout/SiteLayout';
import {CredentialLoginForm} from '../../components/credential-login-form/CredentialLoginForm';
import {GuestGuard} from '@xray/web';

export function LoginPage() {
  return (
    <GuestGuard>
      <SiteLayout>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mt: 4
          }}
        >
          <Card sx={{padding: 2, width: '100%'}}>
            <Typography variant="h6">Sign In</Typography>
            <CredentialLoginForm />
          </Card>
        </Box>
      </SiteLayout>
    </GuestGuard>
  );
}
