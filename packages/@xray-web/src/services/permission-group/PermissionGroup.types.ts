import {
  PermissionGroup,
  CreatePermissionGroupDTO,
  UpdatePermissionGroupDTO,
} from '@xray/types';

export interface PermissionGroupService {
  create(rank: CreatePermissionGroupDTO): Promise<PermissionGroup>;

  getAll(): Promise<PermissionGroup[]>;

  getByID(rankID: string): Promise<PermissionGroup>;

  updateByID(rankID: string, changes: UpdatePermissionGroupDTO): Promise<void>;

  deleteByID(rankID: string): Promise<void>;
}
