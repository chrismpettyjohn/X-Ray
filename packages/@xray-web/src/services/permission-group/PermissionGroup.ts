import {PermissionGroupService} from './PermissionGroup.types';
import {AxiosResponse} from 'axios';
import {backendAPI} from '../../api';
import {
  PermissionGroup,
  CreatePermissionGroupDTO,
  UpdatePermissionGroupDTO,
} from '@xray/types';

class PermissionGroupServiceImplementation implements PermissionGroupService {
  async create(createPermissionGroupDTO: CreatePermissionGroupDTO) {
    const newRank: AxiosResponse<PermissionGroup> = await backendAPI.post(
      'permission-groups',
      createPermissionGroupDTO
    );
    return newRank.data;
  }

  async getAll() {
    const permissionGroups: AxiosResponse<PermissionGroup[]> =
      await backendAPI.get('permission-groups');
    return permissionGroups.data;
  }

  async getByID(permissionGroupID: string): Promise<PermissionGroup> {
    const rank: AxiosResponse<PermissionGroup> = await backendAPI.get(
      `permission-groups/${permissionGroupID}`
    );
    return rank.data;
  }

  async updateByID(
    permissionGroupID: string,
    updatePermissionGroupDTO: UpdatePermissionGroupDTO
  ) {
    await backendAPI.patch(
      `permission-groups/${permissionGroupID}`,
      updatePermissionGroupDTO
    );
  }

  async deleteByID(permissionGroupID: string) {
    await backendAPI.delete(`permission-groups/${permissionGroupID}`);
  }
}

export const permissionGroupService: PermissionGroupService =
  new PermissionGroupServiceImplementation();
