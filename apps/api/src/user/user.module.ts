import {UserPipe} from './user.pipe';
import {Module} from '@nestjs/common';
import {UserResolver} from './user.resolver';
import {MediaModule} from '../media/media.module';
import {CommonModule} from '../common/common.module';
import {GoogleModule} from '../google/google.module';
import {SessionModule} from '../session/session.module';
import {DatabaseModule} from '../database/database.module';

@Module({
  imports: [
    CommonModule,
    DatabaseModule,
    GoogleModule,
    SessionModule,
    MediaModule,
  ],
  providers: [UserPipe, UserResolver],
  exports: [UserPipe],
})
export class UserModule {}
