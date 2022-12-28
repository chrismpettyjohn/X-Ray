import {JwtModule} from '@nestjs/jwt';
import {Module} from '@nestjs/common';
import {MediaModule} from '@xray/media';
import {PassportModule} from '@nestjs/passport';
import {SessionService} from './session.service';
import {GoogleModule} from '@xray/google';
import {DatabaseModule} from '@xray/database';
import {SessionController} from './session.controller';
import {BearerTokenService} from './bearer-token.service';
import {BearerTokenStrategy} from './bearer-token.strategy';
import {PermissionScopeGuard} from './permission-scope.guard';
import {CommonModule, JWT_EXPIRES, JWT_SECRET} from '@xray/common';

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
