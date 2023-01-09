import {Module} from '@nestjs/common';
import {SessionModule} from '../session/session.module';
import {DatabaseModule} from '../database/database.module';
import {PermissionGroupPipe} from './permission-group.pipe';
import {PermissionGroupResolver} from './permission-group.resolver';

@Module({
  imports: [DatabaseModule, SessionModule],
  providers: [PermissionGroupResolver, PermissionGroupPipe],
  exports: [PermissionGroupPipe],
})
export class PermissionGroupModule {}
