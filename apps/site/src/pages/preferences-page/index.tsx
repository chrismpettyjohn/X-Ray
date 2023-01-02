import React from 'react';
import {setURL} from '@xray/web';
import {PreferencesPage} from './PreferencesPage';

export const GET_PREFERENCES_PAGE_LINK = (): string => {
  return '/preferences';
};

setURL(GET_PREFERENCES_PAGE_LINK(), <PreferencesPage />);
