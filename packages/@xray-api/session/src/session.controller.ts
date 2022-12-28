import {Response} from 'express';
import {NewSessionDTO} from './session.dto';
import {MediaService} from '@xray/media';
import {SessionService} from './session.service';
import {HasSession} from './has-session.decorator';
import {GetSession} from './get-session.decorator';
import {User, UpdateUserDTO} from '@xray/types';
import {UserEntity, UserRepository, userWire} from '@xray/database';
import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Patch,
  Post,
  Res,
} from '@nestjs/common';

@Controller('session')
export class SessionController {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly mediaService: MediaService,
    private readonly sessionService: SessionService
  ) {}

  @Post()
  async createSession(
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

  @Patch('preferences')
  @HasSession()
  async updatePreferences(
    @Body() updateSessionPreferences: UpdateUserDTO,
    @GetSession() user: UserEntity
  ) {
    const userChanges: Partial<UserEntity> = {...updateSessionPreferences};
    await this.userRepo.update({id: user.id}, userChanges);
  }

  @Post('logout')
  async endSession(@Res() response: Response): Promise<void> {
    response.clearCookie('user_token');
    response.send();
  }
  @Get()
  @HasSession()
  async getSession(@GetSession() session: UserEntity): Promise<User> {
    const profilePicture = session.profilePictureMedia
      ? await this.mediaService.getMediaURL(session.profilePictureMedia)
      : undefined;
    return userWire(session, profilePicture);
  }
}
