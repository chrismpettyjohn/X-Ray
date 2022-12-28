import {Provider} from '@nestjs/common';
import {UserEntity} from './user/user.entity';
import {MediaEntity} from './media/media.entity';
import {UserRepository} from './user/user.repository';
import {MediaRepository} from './media/media.repository';
import {PermissionGroupEntity} from './permission-group/permission-group.entity';
import {PermissionGroupRepository} from './permission-group/permission-group.repository';

export const databaseEntities: Function[] = [
  PermissionGroupEntity,
  UserEntity,
  MediaEntity,
];

export const databaseRepositories: Provider[] = [
  PermissionGroupRepository,
  UserRepository,
  MediaRepository,
];
