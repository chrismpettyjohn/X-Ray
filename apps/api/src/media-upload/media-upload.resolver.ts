import {Express} from 'express';
import {MediaPipe} from '../media/media.pipe';
import {MediaModel} from '../media/media.model';
import {MediaService} from '../media/media.service';
import {UserEntity} from '../database/user/user.entity';
import {FileInterceptor} from '@nestjs/platform-express';
import {Mutation, Resolver, Query} from '@nestjs/graphql';
import {MediaEntity} from '../database/media/media.entity';
import {HasSession} from '../session/has-session.decorator';
import {GetSession} from '../session/get-session.decorator';
import {MediaRepository} from '../database/media/media.repository';
import {Param, UploadedFile, UseInterceptors} from '@nestjs/common';

@Resolver(() => MediaModel)
@HasSession()
export class MediaUploadResolver {
  constructor(
    private readonly mediaService: MediaService,
    private readonly mediaRepo: MediaRepository
  ) {}

  @Mutation(() => MediaModel)
  @UseInterceptors(FileInterceptor('file'))
  async mediaCreate(
    @UploadedFile()
    file: Express.Multer.File,
    @GetSession() session: UserEntity
  ): Promise<MediaEntity> {
    return this.mediaService.createMedia(
      session.id!,
      file.filename,
      file.originalname,
      file.mimetype,
      file.path
    );
  }

  @Query(() => [MediaModel])
  async medias(@GetSession() session: UserEntity): Promise<MediaEntity[]> {
    return this.mediaRepo.find({userID: session.id});
  }

  @Query(() => MediaModel)
  async media(
    @Param('mediaID', MediaPipe) media: MediaEntity
  ): Promise<MediaEntity> {
    const mediaURL = await this.mediaService.getMediaURL(media);
    return media;
  }
}
