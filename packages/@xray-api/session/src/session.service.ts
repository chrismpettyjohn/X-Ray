import {HashService} from '@xray/common';
import {BearerTokenService} from './bearer-token.service';
import {BadRequestException, Injectable} from '@nestjs/common';
import {UserEntity, UserRepository} from '@xray/database';

@Injectable()
export class SessionService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly hashService: HashService,
    private readonly bearerTokenService: BearerTokenService
  ) {}

  async loginWithCredentials(
    user: UserEntity,
    attemptedPassword: string
  ): Promise<string> {
    const samePassword: boolean = await this.hashService.compare(
      attemptedPassword,
      user.password
    );

    if (!samePassword) {
      throw new BadRequestException('invalid_password');
    }

    return this.generateBearerToken(user.id!);
  }

  generateBearerToken(userID: number): string {
    return this.bearerTokenService.signToken(userID);
  }
}
