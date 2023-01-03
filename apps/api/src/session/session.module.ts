import {JwtModule} from '@nestjs/jwt';
import {Module} from '@nestjs/common';
import {PassportModule} from '@nestjs/passport';
import {SessionService} from './session.service';
import {MediaModule} from '../media/media.module';
import {CommonModule} from '../common/common.module';
import {GoogleModule} from '../google/google.module';
import {SessionController} from './session.controller';
import {BearerTokenService} from './bearer-token.service';
import {BearerTokenStrategy} from './bearer-token.strategy';
import {DatabaseModule} from '../database/database.module';
import {PermissionScopeGuard} from './permission-scope.guard';
import {JWT_SECRET, JWT_EXPIRES} from '../common/environment';

@Module({
  imports: [
    MediaModule,
    CommonModule,
    DatabaseModule,
    PassportModule,
    GoogleModule,
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: {
        expiresIn: JWT_EXPIRES,
      },
    }),
  ],
  controllers: [SessionController],
  providers: [
    SessionService,
    BearerTokenService,
    BearerTokenStrategy,
    PermissionScopeGuard,
  ],
  exports: [
    SessionService,
    BearerTokenService,
    BearerTokenStrategy,
    PermissionScopeGuard,
  ],
})
export class SessionModule {
  constructor() {
    PassportModule.register({
      session: true,
    });
  }
}
