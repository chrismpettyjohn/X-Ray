import {ReactNode} from 'react';
import {PermissionGroupScopes} from '@xray/types';

export interface PermissionGuardProps {
  children: ReactNode;
  permission: keyof PermissionGroupScopes;
  redirect?: boolean;
}
