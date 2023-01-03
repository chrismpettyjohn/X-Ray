import {UserPipe} from './user.pipe';
import {Module} from '@nestjs/common';
import {UserService} from './user.service';
import {UserController} from './user.controller';
import { MediaModule } from '../media/media.module';
import { CommonModule } from '../common/common.module';
import { GoogleModule } from '../google/google.module';
import { SessionModule } from '../session/session.module';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [
    CommonModule,
    DatabaseModule,
    GoogleModule,
    SessionModule,
    MediaModule,
  ],
  controllers: [UserController],
  providers: [UserPipe, UserService],
  exports: [UserPipe, UserService],
})
export class UserModule {}
