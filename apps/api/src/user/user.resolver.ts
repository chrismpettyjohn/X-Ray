import {Response} from 'express';
import {User} from '@xray/types';
import {UserPipe} from './user.pipe';
import {UserModel} from './user.model';
import {UserService} from './user.service';
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
    private readonly userService: UserService,
    private readonly sessionService: SessionService
  ) {}

  @Mutation(() => UserModel)
  async userCreate(
    @Body() newUser: CreateUserDTOImplementation,
    @Res() response: Response
  ): Promise<void> {
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

    const userWire = await this.userService.getWireForUser(user);

    response.json(userWire);
  }

  @Query(() => UserModel)
  user(@Param('userID', UserPipe) user: UserEntity): Promise<User> {
    return this.userService.getWireForUser(user);
  }
}
