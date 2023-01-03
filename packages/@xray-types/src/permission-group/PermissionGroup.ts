import {User} from '../user/User';
import {
  examplePermissionGroupScopes,
  PermissionGroupScopes,
} from './/PermissionGroupScopes';

export interface PermissionGroup {
  id: number;
  orderById: number;
  title: string;
  description: string;
  scopes: PermissionGroupScopes;
  users?: User[];
}

export const exampleRank: PermissionGroup = {
  id: 1,
  orderById: 1,
  title: 'Developers',
  description: 'ADM',
  users: [],
  scopes: examplePermissionGroupScopes,
};
