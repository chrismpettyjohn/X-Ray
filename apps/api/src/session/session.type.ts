import {UserEntity} from '../database/user/user.entity';

export interface RequestWithSession {
  user: UserEntity;
}
