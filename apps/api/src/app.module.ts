import path from 'path';
import {Module} from '@nestjs/common';
import {UserModule} from '@xray/users';
import {MediaModule} from '@xray/media';
import {TypeOrmModule} from '@nestjs/typeorm';
import {GoogleModule} from '@xray/google';
import {SessionModule} from '@xray/session';
import {ServeStaticModule} from '@nestjs/serve-static';
import {MediaUploadModule} from '@xray/media-upload';
import {PermissionGroupModule} from '@xray/permission-group';
import {databaseEntities, DatabaseModule} from '@xray/database';
import {
  CommonModule,
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_NAME,
  DATABASE_PASS,
  DATABASE_USER,
  DATABASE_SSL,
} from '@xray/common';

@Module({
  imports: [
    CommonModule,
    DatabaseModule,
    GoogleModule,
    MediaModule,
    PermissionGroupModule,
    SessionModule,
    UserModule,
    MediaUploadModule,
    ServeStaticModule.forRoot({
      serveRoot: '/uploads',
      rootPath: path.resolve(__dirname, '..', 'uploads'),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: DATABASE_HOST,
      port: DATABASE_PORT,
      username: DATABASE_USER,
      password: DATABASE_PASS,
      database: DATABASE_NAME,
      entities: databaseEntities,
      synchronize: true,
      ssl: DATABASE_SSL,
      extra: {
        ssl: DATABASE_SSL && {
          rejectUnauthorized: false,
        },
      },
    }),
  ],
})
export class XRayAPI {}
