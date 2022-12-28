import {useContext} from 'react';
import {useLocation} from 'wouter';
import {GuestGuardProps} from './GuestGuard.types';
import {sessionContext} from '../../../context/session/SessionContext';

export function GuestGuard({children, redirect = true}: GuestGuardProps) {
  const [, setLocation] = useLocation();
  const {user} = useContext(sessionContext);

  if (user) {
    if (redirect) {
      setLocation('/home');
    }
    return null as any;
  }

  return children as any;
}
