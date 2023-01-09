import {JwtService} from '@nestjs/jwt';
import {RawRequest, SessionContents} from './session.types';
import {UserRepository} from '../database/user/user.repository';
import {getRequestFromExecutionContext} from '../common/get-request';
import {Injectable, CanActivate, ExecutionContext} from '@nestjs/common';

@Injectable()
export class HasSessionGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepo: UserRepository
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: RawRequest = getRequestFromExecutionContext(context);

    const bearerToken: string | undefined =
      request?.cookies?.user_token ?? null;

    if (!bearerToken) {
      return false;
    }

    const parsedBearerToken: SessionContents | null = this.jwtService.decode(
      bearerToken
    ) as any;

    if (!parsedBearerToken) {
      return false;
    }

    request.user = await this.userRepo.findOneOrFail({
      id: parsedBearerToken.userID,
    });
    request.sessionID = parsedBearerToken.sessionID;

    return true;
  }
}
