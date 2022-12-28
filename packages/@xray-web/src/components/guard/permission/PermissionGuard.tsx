import {useContext} from 'react';
import {useLocation} from 'wouter';
import {PermissionGuardProps} from './PermissionGuard.types';
import {sessionContext} from '../../../context/session/SessionContext';

export function PermissionGuard({
  children,
  permission,
  redirect = true,
}: PermissionGuardProps) {
  const [, setLocation] = useLocation();
  const {user} = useContext(sessionContext);
  const hasPermission = !!user?.rank?.scopes?.[permission];

  if (!hasPermission) {
    if (redirect) {
      setLocation(user ? '/home' : '/login');
    }

    return null as any;
  }

  return children as any;
}
