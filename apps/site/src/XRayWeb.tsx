import {ToastContainer} from 'react-toastify';
import React, {useEffect, useState} from 'react';
import {ThemeProvider, CssBaseline, createTheme} from '@mui/material';
import {Bootstrap, ContextProviders, GoogleMapsProvider} from '@xray/web';

const siteTheme = createTheme({
  palette: {
    background: {
      default: '#24242D',
      paper: '#2B2E3B',
    },
    text: {
      secondary: '#ffffff',
      primary: '#ffffff',
    },
  },
  typography: {
    fontSize: 18,
  },
});

export function XRayWeb() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      await import('./pages/routes');
      setLoading(false);
    }

    load();
  }, []);

  if (loading) {
    return null;
  }

  return (
    <GoogleMapsProvider>
      <ThemeProvider theme={siteTheme}>
        <CssBaseline>
          <ToastContainer />
          <ContextProviders>
            <Bootstrap />
          </ContextProviders>
        </CssBaseline>
      </ThemeProvider>
    </GoogleMapsProvider>
  );
}
