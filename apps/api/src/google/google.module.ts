import {Module} from '@nestjs/common';
import {GoogleRecaptchaService} from './recaptcha.service';
import {RecaptchaConstraint} from './recaptcha.constraint';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [GoogleRecaptchaService, RecaptchaConstraint],
  exports: [GoogleRecaptchaService, RecaptchaConstraint],
})
export class GoogleModule {}
