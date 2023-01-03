import {Module} from '@nestjs/common';
import {MediaService} from './media.service';
import {DatabaseModule} from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [MediaService],
  exports: [MediaService],
})
export class MediaModule {}
