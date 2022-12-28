import {User} from '@xray/types';
import {Injectable} from '@nestjs/common';
import {MediaService} from '@xray/media';
import {UserEntity, userWire} from '@xray/database';

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
