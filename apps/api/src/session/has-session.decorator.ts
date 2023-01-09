import {UseGuards} from '@nestjs/common';
import {HasSessionGuard} from './has-session.guard';

export function HasSession() {
  return UseGuards(HasSessionGuard);
}
