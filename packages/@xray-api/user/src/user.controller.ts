import {User} from '@xray/types';
import {UserPipe} from './user.pipe';
import {CreateUserDTOImplementation} from './user.dto';
import {UserRepository, UserEntity, userWire} from '@xray/database';
import {
  Body,
  Controller,
  Get,
  BadRequestException,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import {isValidUsername} from './is-valid-username';
import {Response} from 'express';
import {SessionService} from '@xray/session';
import {UserService} from './user.service';

@Controller('users')
export class UserController {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly userService: UserService,
    private readonly sessionService: SessionService
  ) {}

  @Post()
  async createUser(
    @Body() newUser: CreateUserDTOImplementation,
    @Res() response: Response
  ): Promise<void> {
    if (!isValidUsername(newUser.username)) {
      throw new BadRequestException('Invalid Username');
    }

    const user: UserEntity = await this.userRepo.create({
      rankID: 1,
      username: newUser.username,
      password: newUser.password,
      profilePictureMediaID: undefined,
    });

    const jwt = this.sessionService.generateBearerToken(user.id!);

    response.cookie('user_token', jwt);

    const userWire = await this.userService.getWireForUser(user);

    response.json(userWire);
  }

  @Get(':userID')
  getUserByID(@Param('userID', UserPipe) user: UserEntity): Promise<User> {
    return this.userService.getWireForUser(user);
  }
}
