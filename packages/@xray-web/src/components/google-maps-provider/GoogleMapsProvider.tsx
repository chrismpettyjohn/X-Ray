import React from 'react';
import {GOOGLE_MAPS_API_KEY} from '../../environment';
import {useJsApiLoader} from '@react-google-maps/api';
import {GoogleMapsProviderProps} from './GoogleMapsProvider.types';

export function GoogleMapsProvider({children}: GoogleMapsProviderProps) {
  const {isLoaded} = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
  });

  if (!isLoaded) {
    return null;
  }

  return <>{children}</>;
}
