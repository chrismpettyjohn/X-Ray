import {mediaWire} from '../media/media.wire';
import {User} from '@xray/types';
import {UserEntity} from './user.entity';
import {permissionGroupWire} from '../permission-group/permission-group.wire';

export function userWire(
  userEntity: UserEntity,
  userProfilePictureURL = ''
): User {
  return {
    id: userEntity.id!,
    username: userEntity.username,
    rank: userEntity.rank && permissionGroupWire(userEntity.rank!),
    profilePicture:
      userEntity.profilePictureMedia &&
      mediaWire(userEntity.profilePictureMedia, userProfilePictureURL),
  };
}
