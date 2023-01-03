import React from 'react';
import {Box, Grid} from '@mui/material';
import {SiteLayoutProps} from './SiteLayout.types';
import {SiteHeader} from '../site-header/SiteHeader';
import {SiteFooter} from '../site-footer/SiteFooter';
import {SiteSidebar} from '../site-sidebar/SiteSidebar';
import {SiteMobileMenu} from '../site-mobile-menu/SiteMobileMenu';

export function SiteLayout({children}: SiteLayoutProps) {
  return (
    <Grid container sx={{height: '100%'}}>
      <Box
        component={Grid}
        item
        display={{xs: 'none', md: 'none', lg: 'none', xl: 'block'}}
        sx={{height: '100%', width: '15%', minWidth: 350}}
      >
        <SiteSidebar />
        <SiteFooter />
      </Box>
      <Grid xs={12} lg={10}>
        <div style={{flexGrow: 1, height: '100%'}}>
          <SiteHeader />
          <Box sx={{p: 4}}>{children}</Box>
        </div>
      </Grid>
      <Box
        component={Grid}
        item
        display={{xs: 'block', md: 'block', lg: 'block', xl: 'none'}}
        sx={{position: 'fixed', bottom: 0, left: 0}}
      >
        <SiteMobileMenu />
      </Box>
    </Grid>
  );
}
