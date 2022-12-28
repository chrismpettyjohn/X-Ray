import {Express} from 'express';
import {Media} from '@xray/types';
import {MediaService, MediaPipe} from '@xray/media';
import {FileInterceptor} from '@nestjs/platform-express';
import {HasSession, GetSession} from '@xray/session';
import {
  mediaWire,
  MediaEntity,
  UserEntity,
  MediaRepository,
} from '@xray/database';
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
