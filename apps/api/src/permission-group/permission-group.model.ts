import {UserModel} from '../user/user.model';
import {Field, ObjectType} from '@nestjs/graphql';

@ObjectType()
export class PermissionGroupScopesModel {
  @Field({nullable: true})
  managePermissionGroup?: boolean;
}

@ObjectType()
export class PermissionGroupModel {
  @Field({nullable: true})
  id?: number;

  @Field({nullable: true})
  orderById?: number;

  @Field({nullable: true})
  title?: string;

  @Field({nullable: true})
  description?: string;

  @Field(() => PermissionGroupScopesModel, {nullable: true})
  scopes?: PermissionGroupScopesModel;

  @Field(() => UserModel, {nullable: true})
  users?: UserModel[];
}
