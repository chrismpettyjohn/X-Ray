import {Request} from 'express';
import {Strategy} from 'passport-jwt';
import {Injectable} from '@nestjs/common';
import {JWT_SECRET} from '@xray/common';
import {PassportStrategy} from '@nestjs/passport';
import {UserEntity, UserRepository} from '@xray/database';

@Injectable()
export class BearerTokenStrategy extends PassportStrategy(
  Strategy,
  'bearer-token'
) {
  constructor(private readonly userRepo: UserRepository) {
    super({
      jwtFromRequest: BearerTokenStrategy.extractJWT,
      ignoreExpiration: false,
      secretOrKey: JWT_SECRET,
    });
  }

  private static extractJWT(req: Request): string | null {
    return req?.cookies?.user_token ?? null;
  }

  async validate({userID}: Record<'userID', number>): Promise<UserEntity> {
    return this.userRepo.findOneOrFail({id: userID});
  }
}
