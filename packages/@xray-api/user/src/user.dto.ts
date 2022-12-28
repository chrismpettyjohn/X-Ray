import {ValidRecaptcha} from '@xray/google';
import {CreateUserDTO, UpdateUserDTO} from '@xray/types';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Validate,
} from 'class-validator';

export class CreateUserDTOImplementation implements CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  username!: string;

  @IsString()
  password!: string;

  @Validate(ValidRecaptcha)
  recaptcha!: string;
}

export class UpdateUserDTOImplementation implements UpdateUserDTO {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  username?: string;

  @IsEmail()
  @IsNotEmpty()
  @IsOptional()
  emailAddress?: string;

  @IsPhoneNumber()
  @IsNotEmpty()
  @IsOptional()
  phoneNumber?: string;

  @IsString()
  @IsOptional()
  existingPassword?: string;

  @IsString()
  @IsOptional()
  newPassword?: string;

  @IsNumber()
  @IsOptional()
  profilePictureMediaID?: number;
}
