import React from 'react';
import {SessionContextProvider} from './session';
import {ContextProvidersProps} from './ContextProviders.types';

export function ContextProviders({children}: ContextProvidersProps) {
  return <SessionContextProvider>{children}</SessionContextProvider>;
}
