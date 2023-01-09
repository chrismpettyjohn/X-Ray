import {UserEntity} from '../database/user/user.entity';
import {createParamDecorator, ExecutionContext} from '@nestjs/common';
import {getRequestFromExecutionContext} from '../common/get-request';

// tslint:disable-next-line:variable-name - In Typescript decorators start with a capital letter
export const GetSession = createParamDecorator(
  (_, ctx: ExecutionContext): UserEntity => {
    const request = getRequestFromExecutionContext(ctx);

    if (!request.user) {
      throw new Error('request.user is not defined');
    }

    return request.user;
  }
);
