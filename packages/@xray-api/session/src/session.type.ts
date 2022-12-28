import {UserEntity} from '@xray/database';

export interface RequestWithSession {
  user: UserEntity;
}
