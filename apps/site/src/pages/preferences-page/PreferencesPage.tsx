import React, {useState} from 'react';
import { Grid, Paper, Typography } from "@mui/material";
import { useFetchCurrentUser, UserGuard } from "@xray/web";
import {SiteLayout} from '../../components/site-layout/SiteLayout';
import {CustomizeProfileForm} from '../../components/customize-profile-form/CustomizeProfileForm';

export function PreferencesPage() {
  const [refresh, setRefresh] = useState(0);
  const privateUser = useFetchCurrentUser(refresh);

  return (
    <UserGuard>
      <SiteLayout>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography variant="h4">Preferences</Typography>
          </Grid>
          <Grid item xs={12}>
            <Paper sx={{p: 2}}>
              {
                privateUser
                  ? <CustomizeProfileForm defaultUser={privateUser} onChanges={() => setRefresh(_ => _ + 1)} />
                  : <i className="fas fa-spinner fa-spin" />
              }
            </Paper>
          </Grid>
        </Grid>
      </SiteLayout>
    </UserGuard>
  )
}
