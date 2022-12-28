import {UserGuardProps} from './';
import {useLocation} from 'wouter';
import React, {useContext} from 'react';
import {sessionContext} from '../../../context/session/SessionContext';

export function UserGuard({children, redirect = true}: UserGuardProps) {
  const [, setLocation] = useLocation();
  const {user} = useContext(sessionContext);

  if (!user) {
    if (redirect) {
      setLocation('/login');
    }

    return null as any;
  }

  return children as any;
}
