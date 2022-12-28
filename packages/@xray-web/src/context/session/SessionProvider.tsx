import {User} from '@xray/types';
import {sessionService} from '../../services';
import {sessionContext} from './SessionContext';
import React, {useEffect, useState} from 'react';
import {ContextProvidersProps} from '../ContextProviders.types';

export function SessionContextProvider({children}: ContextProvidersProps) {
  const [user, setUser] = useState<User>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadExistingSession() {
      try {
        const existingSession = await sessionService.getCurrentUser();
        setUser(existingSession);
      } catch (e: any) {
        // Ignore
      } finally {
        setIsLoading(false);
      }
    }
    loadExistingSession();
  }, []);

  function setUserState(changes?: Partial<User>) {
    setUser(_ => (changes ? {..._!, ...changes} : undefined));
  }

  if (isLoading) {
    return <i className="fas fa-spinner fa-spin" />;
  }

  return (
    <sessionContext.Provider
      value={{
        user,
        setUser: setUserState,
      }}
    >
      {children}
    </sessionContext.Provider>
  );
}
