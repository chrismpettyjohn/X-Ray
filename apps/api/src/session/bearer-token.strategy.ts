import {Request} from 'express';
import {Strategy} from 'passport-jwt';
import {Injectable} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {JWT_SECRET} from '../common/environment';
import {UserEntity} from '../database/user/user.entity';
import {UserRepository} from '../database/user/user.repository';

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
