import {Response} from 'express';
import {UserPipe} from './user.pipe';
import {UserModel} from './user.model';
import {isValidUsername} from './is-valid-username';
import {CreateUserDTOImplementation} from './user.dto';
import {UserEntity} from '../database/user/user.entity';
import {Resolver, Mutation, Query} from '@nestjs/graphql';
import {SessionService} from '../session/session.service';
import {UserRepository} from '../database/user/user.repository';
import {Body, BadRequestException, Param, Res} from '@nestjs/common';

@Resolver(() => UserModel)
export class UserResolver {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly sessionService: SessionService
  ) {}

  @Mutation(() => UserModel)
  async userCreate(
    @Body() newUser: CreateUserDTOImplementation,
    @Res() response: Response
  ): Promise<UserEntity> {
    if (!isValidUsername(newUser.username)) {
      throw new BadRequestException('Invalid Username');
    }
    const user: UserEntity = await this.userRepo.create({
      permissionGroupID: 1,
      username: newUser.username,
      password: newUser.password,
      profilePictureMediaID: undefined,
    });

    const jwt = this.sessionService.generateBearerToken(user.id!);

    response.cookie('user_token', jwt);

    return user;
  }

  @Query(() => UserModel)
  user(@Param('userID', UserPipe) user: UserEntity): UserEntity {
    return user;
  }
}
