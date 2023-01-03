import {Response} from 'express';
import {UpdateUserDTO} from '@xray/types';
import {NewSessionDTO} from './session.dto';
import {UserModel} from '../user/user.model';
import {SessionModel} from './session.model';
import {SessionService} from './session.service';
import {HasSession} from './has-session.decorator';
import {GetSession} from './get-session.decorator';
import {userWire} from '../database/user/user.wire';
import {MediaService} from '../media/media.service';
import {UserEntity} from '../database/user/user.entity';
import {Mutation, Resolver, Query} from '@nestjs/graphql';
import {Body, NotFoundException, Res} from '@nestjs/common';
import {UserRepository} from '../database/user/user.repository';

@Resolver(() => SessionModel)
export class SessionResolver {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly mediaService: MediaService,
    private readonly sessionService: SessionService
  ) {}

  @Mutation(() => SessionModel)
  async sessionCreate(
    @Body() newSession: NewSessionDTO,
    @Res() response: Response
  ): Promise<Response> {
    const matchingUser = await this.userRepo.findOne({
      username: newSession.username,
    });

    if (!matchingUser) {
      throw new NotFoundException();
    }

    const jwt = await this.sessionService.loginWithCredentials(
      matchingUser,
      newSession.password
    );

    response.cookie('user_token', jwt);

    return response.json(userWire(matchingUser));
  }

  @Mutation(() => Boolean)
  @HasSession()
  async sessionUpdatePreferences(
    @Body() updateSessionPreferences: UpdateUserDTO,
    @GetSession() user: UserEntity
  ): Promise<boolean> {
    const userChanges: Partial<UserEntity> = {...updateSessionPreferences};
    await this.userRepo.update({id: user.id}, userChanges);
    return true;
  }

  @Mutation(() => Boolean)
  async sessionLogout(@Res() response: Response): Promise<Boolean> {
    response.clearCookie('user_token');
    return true;
  }

  @Query(() => UserModel)
  @HasSession()
  async session(@GetSession() session: UserEntity): Promise<UserModel> {
    const profilePicture = session.profilePictureMedia
      ? await this.mediaService.getMediaURL(session.profilePictureMedia)
      : undefined;
    return userWire(session, profilePicture) as UserModel;
  }
}
