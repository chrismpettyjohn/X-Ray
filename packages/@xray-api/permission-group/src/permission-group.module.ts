import {Module} from '@nestjs/common';
import {DatabaseModule} from '@xray/database';
import {PermissionGroupPipe} from './permission-group.pipe';
import {PermissionGroupController} from './permission-group.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [PermissionGroupController],
  providers: [PermissionGroupPipe],
  exports: [PermissionGroupPipe],
})
export class PermissionGroupModule {}
