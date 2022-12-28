import {UseGuards} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';

export function HasSession() {
  return UseGuards(AuthGuard('bearer-token'));
}
