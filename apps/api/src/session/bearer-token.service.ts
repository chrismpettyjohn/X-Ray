import JWT from 'jsonwebtoken';
import {Injectable} from '@nestjs/common';
import {JWT_EXPIRES, JWT_SECRET} from '../common/environment';

@Injectable()
export class BearerTokenService {
  signToken(userID: number): string {
    return JWT.sign({userID}, JWT_SECRET, {
      expiresIn: JWT_EXPIRES,
    });
  }
}
