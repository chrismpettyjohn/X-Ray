import crypto from 'crypto';
import {getExtension} from 'mime';
import {diskStorage} from 'multer';
import {Module} from '@nestjs/common';
import {MediaModule} from '../media/media.module';
import {MulterModule} from '@nestjs/platform-express';
import {SessionModule} from '../session/session.module';
import {DatabaseModule} from '../database/database.module';
import {MediaUploadResolver} from './media-upload.resolver';

@Module({
  imports: [
    DatabaseModule,
    SessionModule,
    MediaModule,
    MulterModule.registerAsync({
      useFactory: () => ({
        storage: diskStorage({
          destination: function (
            req,
            file,
            cb: (error: Error | null, destination: string) => void
          ) {
            cb(null, './uploads/');
          },
          filename: function (
            req,
            file,
            cb: (error: Error | null, destination: string) => void
          ) {
            crypto.randomBytes(16, (err: Error | null, raw: Buffer) => {
              cb(
                null,
                raw.toString('hex') +
                  Date.now() +
                  '.' +
                  getExtension(file.mimetype)
              );
            });
          },
        }),
      }),
    }),
  ],
  providers: [MediaUploadResolver],
})
export class MediaUploadModule {}
