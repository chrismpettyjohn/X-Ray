import {PermissionGroup} from '@xray/types';
import {permissionGroupService} from '../../services/permission-group';
import {createFetchHook} from '../fetch-hook.base';

export const useFetchAllRanks = () =>
  createFetchHook<PermissionGroup[]>(permissionGroupService.getAll);
