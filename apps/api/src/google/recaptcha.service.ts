import {AxiosResponse} from 'axios';
import {Injectable} from '@nestjs/common';
import {googleRecaptchaAPI} from './recaptcha.axios';
import {GOOGLE_RECAPTCHA_SECRET_KEY} from '../common/environment';

@Injectable()
export class GoogleRecaptchaService {
  async passedVerification(response: string): Promise<boolean> {
    const {data}: AxiosResponse<Record<'success', boolean>> =
      await googleRecaptchaAPI.post(
        `siteverify?secret=${GOOGLE_RECAPTCHA_SECRET_KEY}&response=${response}`
      );
    return data.success;
  }
}
