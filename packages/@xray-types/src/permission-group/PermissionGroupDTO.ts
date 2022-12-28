import {PermissionGroupScopes} from './PermissionGroupScopes';

export interface CreatePermissionGroupDTO {
  orderById: number;
  title: string;
  description: string;
  scopes: PermissionGroupScopes;
}

export type UpdatePermissionGroupDTO = Partial<CreatePermissionGroupDTO>;
