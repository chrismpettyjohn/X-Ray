import {Response} from 'express';
import {UpdateUserDTO} from '@xray/types';
import {UserModel} from '../user/user.model';
import {SessionModel} from './session.model';
import {SessionService} from './session.service';
import {HasSession} from './has-session.decorator';
import {GetSession} from './get-session.decorator';
import {MediaService} from '../media/media.service';
import {UserEntity} from '../database/user/user.entity';
import {
  Mutation,
  Resolver,
  Query,
  Args,
  Context,
  GraphQLExecutionContext,
} from '@nestjs/graphql';
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
    @Args('username') username: string,
    @Args('password') password: string,
    @Args('recaptcha') recaptcha: string,
    @Context() context: GraphQLExecutionContext
  ): Promise<SessionModel> {
    const matchingUser = await this.userRepo.findOne({
      username: username,
    });

    if (!matchingUser) {
      throw new NotFoundException();
    }

    const jwt = await this.sessionService.loginWithCredentials(
      matchingUser,
      password
    );

    // @ts-ignore
    context.res.cookie('user_token', jwt);

    return {
      userID: matchingUser.id!,
      active: true,
    };
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
  session(@GetSession() session: UserEntity): UserEntity {
    return session;
  }
}
