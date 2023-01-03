import {Module} from '@nestjs/common';
import {PermissionGroupPipe} from './permission-group.pipe';
import { DatabaseModule } from '../database/database.module';
import {PermissionGroupController} from './permission-group.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [PermissionGroupController],
  providers: [PermissionGroupPipe],
  exports: [PermissionGroupPipe],
})
export class PermissionGroupModule {}
