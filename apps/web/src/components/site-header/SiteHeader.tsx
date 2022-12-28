import React from 'react';
import {Box, AppBar, Toolbar} from '@mui/material';
import {SiteGlobalSearch} from '../site-global-search/SiteGlobalSearch';

export function SiteHeader() {
  return (
    <Box sx={{ flexGrow: 1, height: 100 }}>
      <AppBar sx={{background: 'transparent', pl: 2, width: '100%', height: '100%', justifyContent: 'center'}} position="static">
        <Toolbar>
          <SiteGlobalSearch />
        </Toolbar>
      </AppBar>
    </Box>
  )
}
