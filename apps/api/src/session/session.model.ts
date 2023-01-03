import {Field, ObjectType} from '@nestjs/graphql';

@ObjectType()
export class SessionModel {
  @Field({nullable: true})
  userID?: number;

  @Field({nullable: true})
  active?: boolean;
}
