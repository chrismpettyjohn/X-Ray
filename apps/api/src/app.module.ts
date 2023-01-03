import path, { resolve } from 'path';
import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {GraphQLModule} from '@nestjs/graphql';
import {UserModule} from './user/user.module';
import {MediaModule} from './media/media.module';
import {GoogleModule} from './google/google.module';
import { CommonModule } from './common/common.module';
import {SessionModule} from './session/session.module';
import {ServeStaticModule} from '@nestjs/serve-static';
import {DatabaseModule} from './database/database.module';
import { databaseEntities } from './database/database.meta';
import {MediaUploadModule} from './media-upload/media-upload.module';
import {PermissionGroupModule} from './permission-group/permission-group.module';
import {
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_NAME,
  DATABASE_PASS,
  DATABASE_USER,
  DATABASE_SSL,
  GRAPHQL_PLAYGROUND,
} from './common/environment';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

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
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      debug: false,
      playground: GRAPHQL_PLAYGROUND,
      autoSchemaFile: resolve(__dirname, './schema.gql'),
      fieldResolverEnhancers: ['guards'],
      installSubscriptionHandlers: true,
    }),
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
