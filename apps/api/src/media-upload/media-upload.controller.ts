import {Express} from 'express';
import {Media} from '@xray/types';
import {MediaPipe} from '../media/media.pipe';
import {MediaService} from '../media/media.service';
import {mediaWire} from '../database/media/media.wire';
import {FileInterceptor} from '@nestjs/platform-express';
import {UserEntity} from '../database/user/user.entity';
import {MediaEntity} from '../database/media/media.entity';
import {HasSession} from '../session/has-session.decorator';
import {GetSession} from '../session/get-session.decorator';
import {MediaRepository} from '../database/media/media.repository';
import {
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';

@Controller('media')
@HasSession()
export class MediaUploadController {
  constructor(
    private readonly mediaService: MediaService,
    private readonly mediaRepo: MediaRepository
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadMedia(
    @UploadedFile()
    file: Express.Multer.File,
    @GetSession() session: UserEntity
  ): Promise<Media> {
    const newMedia = await this.mediaService.createMedia(
      session.id!,
      file.filename,
      file.originalname,
      file.mimetype,
      file.path
    );
    const mediaURL = await this.mediaService.getMediaURL(newMedia);
    return mediaWire(newMedia, mediaURL);
  }

  @Get()
  async getMediaByUser(@GetSession() session: UserEntity): Promise<Media[]> {
    const mediaForUser = await this.mediaRepo.find({userID: session.id});
    const mediaURLs: string[] = [];

    for (const media of mediaForUser) {
      const url = await this.mediaService.getMediaURL(media);
      mediaURLs.push(url);
    }

    return mediaForUser.map((media, mediaIndex) =>
      mediaWire(media, mediaURLs[mediaIndex])
    );
  }

  @Get(':mediaID')
  async getMediaByID(
    @Param('mediaID', MediaPipe) media: MediaEntity
  ): Promise<Media> {
    const mediaURL = await this.mediaService.getMediaURL(media);
    return mediaWire(media, mediaURL);
  }
}
