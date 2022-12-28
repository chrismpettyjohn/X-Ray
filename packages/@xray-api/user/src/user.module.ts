import {UserPipe} from './user.pipe';
import {Module} from '@nestjs/common';
import {UserService} from './user.service';
import {MediaModule} from '@xray/media';
import {CommonModule} from '@xray/common';
import {GoogleModule} from '@xray/google';
import {UserController} from './user.controller';
import {SessionModule} from '@xray/session';
import {DatabaseModule} from '@xray/database';

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
