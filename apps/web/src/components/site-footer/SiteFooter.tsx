import React from 'react';
import {Paper, Typography} from '@mui/material';

export function SiteFooter() {
  return (
    <Paper sx={{marginTop: 'calc(10% + 60px)', position: 'fixed', background: 'transparent', bottom: 0, minWidth: 400, width: '15%', textAlign: 'center', p: 1}} component="footer" square>
      <Typography sx={{padding: 1, fontWeight: 'bold'}}>
        &copy; Impending Success LLC
      </Typography>
    </Paper>
  )
}
