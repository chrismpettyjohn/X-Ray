import {Module} from '@nestjs/common';
import {MediaService} from './media.service';
import {DatabaseModule} from '@xray/database';

@Module({
  imports: [DatabaseModule],
  providers: [MediaService],
  exports: [MediaService],
})
export class MediaModule {}
