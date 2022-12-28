import {userWire} from '../user/user.wire';
import {PermissionGroup} from '@xray/types';
import {PermissionGroupEntity} from './permission-group.entity';

export function permissionGroupWire(
  rankEntity: PermissionGroupEntity
): PermissionGroup {
  return {
    id: rankEntity.id!,
    orderById: rankEntity.orderById,
    title: rankEntity.title,
    description: rankEntity.description,
    scopes: rankEntity.scopes,
    users:
      rankEntity.users !== undefined
        ? rankEntity.users!.map(user => userWire(user))
        : undefined,
  };
}
