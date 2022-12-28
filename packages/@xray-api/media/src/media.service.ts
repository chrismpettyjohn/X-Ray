import {API_URL} from '@xray/common';
import {MediaEntity, MediaRepository} from '@xray/database';
import {Injectable, UnauthorizedException} from '@nestjs/common';

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
    const type = fileMime.includes('image') ? 'photo' : 'video';
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
