import {MediaEntity} from '../database/media/media.entity';
import {MediaRepository} from '../database/media/media.repository';
import {Injectable, NotFoundException, PipeTransform} from '@nestjs/common';

@Injectable()
export class MediaPipe implements PipeTransform {
  constructor(private readonly mediaRepository: MediaRepository) {}

  async transform(mediaID: number): Promise<MediaEntity> {
    const media = await this.mediaRepository.findOne({id: mediaID});

    if (!media) {
      throw new NotFoundException('Media does not exist');
    }

    return media;
  }
}
