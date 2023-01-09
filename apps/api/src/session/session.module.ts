import {JwtModule} from '@nestjs/jwt';
import {Module} from '@nestjs/common';
import {SessionService} from './session.service';
import {MediaModule} from '../media/media.module';
import {SessionResolver} from './session.resolver';
import {CommonModule} from '../common/common.module';
import {GoogleModule} from '../google/google.module';
import {HasSessionGuard} from './has-session.guard';
import {BearerTokenService} from './bearer-token.service';
import {DatabaseModule} from '../database/database.module';
import {PermissionScopeGuard} from './permission-scope.guard';
import {JWT_SECRET, JWT_EXPIRES} from '../common/environment';

@Module({
  imports: [
    MediaModule,
    CommonModule,
    DatabaseModule,
    GoogleModule,
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: {
        expiresIn: JWT_EXPIRES,
      },
    }),
  ],
  providers: [
    SessionService,
    SessionResolver,
    HasSessionGuard,
    BearerTokenService,
    PermissionScopeGuard,
  ],
  exports: [
    JwtModule,
    SessionService,
    HasSessionGuard,
    BearerTokenService,
    PermissionScopeGuard,
  ],
})
export class SessionModule {}
