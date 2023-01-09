import {MediaType} from '@xray/types';
import {API_URL} from '../common/environment';
import {MediaEntity} from '../database/media/media.entity';
import {Injectable, UnauthorizedException} from '@nestjs/common';
import {MediaRepository} from '../database/media/media.repository';

@Injectable()
export class MediaService {
  constructor(private readonly mediaRepository: MediaRepository) {}

  async ensureUserOwnsMedia(mediaID: number, userID: number) {
    const media = await this.mediaRepository.findOneOrFail({id: mediaID});
    if (media.userID !== userID) {
      throw new UnauthorizedException();
    }
  }

  async createMedia(
    userID: number,
    fileName: string,
    fileDesc: string,
    fileMime: string,
    filePath: string
  ): Promise<MediaEntity> {
    const type = fileMime.includes('image') ? MediaType.Photo : MediaType.Video;
    return this.mediaRepository.create({
      type,
      userID,
      fileName,
      fileDesc,
      filePath,
      extension: fileMime,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  async getMediaURL(media: MediaEntity): Promise<string> {
    return `${API_URL}/uploads/${media.fileName}`;
  }
}
