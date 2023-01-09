import {Field, ObjectType} from '@nestjs/graphql';
import {ValidRecaptcha} from '../google/recaptcha.constraint';
import {IsNotEmpty, IsString, Validate} from 'class-validator';

@ObjectType()
export class NewSessionDTO {
  @Field(() => String)
  @IsString()
  username!: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  password!: string;

  @Field(() => String)
  @Validate(ValidRecaptcha)
  recaptcha!: string;
}
