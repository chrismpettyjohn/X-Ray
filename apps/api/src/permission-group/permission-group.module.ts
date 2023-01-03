import {Module} from '@nestjs/common';
import {PermissionGroupPipe} from './permission-group.pipe';
import {DatabaseModule} from '../database/database.module';
import {PermissionGroupResolver} from './permission-group.resolver';

@Module({
  imports: [DatabaseModule],
  providers: [PermissionGroupResolver, PermissionGroupPipe],
  exports: [PermissionGroupPipe],
})
export class PermissionGroupModule {}
