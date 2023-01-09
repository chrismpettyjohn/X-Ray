import {MediaType} from '@xray/types';
import {Field, ObjectType, registerEnumType} from '@nestjs/graphql';

registerEnumType(MediaType, {
  name: 'MediaType',
});

@ObjectType()
export class MediaModel {
  @Field({nullable: true})
  id?: number;

  @Field({nullable: true})
  url?: string;

  @Field(() => MediaType, {nullable: true})
  type?: MediaType;

  @Field({nullable: true})
  extension?: string;

  @Field({nullable: true})
  createdAt?: string;

  @Field({nullable: true})
  updatedAt?: string;
}
