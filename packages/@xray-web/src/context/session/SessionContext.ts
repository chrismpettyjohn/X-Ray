import {createContext} from 'react';
import {defaultSessionContext, SessionContext} from './Session.types';

export const sessionContext = createContext<SessionContext>(
  defaultSessionContext
);
