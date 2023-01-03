import { MediaModel } from '../media/media.model';
import {Field, ObjectType} from '@nestjs/graphql';
import { PermissionGroupModel } from '../permission-group/permission-group.model';

@ObjectType()
export class UserModel {
  @Field({nullable: true})
  id?: number;

  @Field({nullable: true})
  username?: string;

  @Field({nullable: true})
  permissionGroup?: PermissionGroupModel;

  @Field(() => MediaModel, {nullable: true})
  profilePicture?: MediaModel;

}