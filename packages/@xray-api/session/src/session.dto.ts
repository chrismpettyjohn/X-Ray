import {ValidRecaptcha} from '@xray/google';
import {IsNotEmpty, IsString, Validate} from 'class-validator';

export class NewSessionDTO {
  @IsString()
  username!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;

  @Validate(ValidRecaptcha)
  recaptcha!: string;
}
