import {User} from '@xray/types';
import {Injectable} from '@nestjs/common';
import {userWire} from '../database/user/user.wire';
import {MediaService} from '../media/media.service';
import {UserEntity} from '../database/user/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly mediaService: MediaService) {}

  async getWireForUser(userEntity: UserEntity): Promise<User> {
    const profilePicture = userEntity.profilePictureMedia
      ? await this.mediaService.getMediaURL(userEntity.profilePictureMedia)
      : undefined;

    return userWire(userEntity, profilePicture);
  }
}
