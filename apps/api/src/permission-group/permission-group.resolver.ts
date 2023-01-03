import {PermissionGroupPipe} from './permission-group.pipe';
import {Mutation, Resolver, Query} from '@nestjs/graphql';
import {HasScope} from '../session/permission-scope.decorator';
import {PermissionGroupModel} from './permission-group.model';
import {permissionGroupWire} from '../database/permission-group/permission-group.wire';
import {PermissionGroupEntity} from '../database/permission-group/permission-group.entity';
import {PermissionGroupRepository} from '../database/permission-group/permission-group.repository';
import {
  CreatePermissionGroupDTOImplementation,
  UpdatePermissionGroupDTOImplementation,
} from './permission-group.dto';
import {Body, Param} from '@nestjs/common';

@Resolver(() => PermissionGroupModel)
export class PermissionGroupResolver {
  constructor(
    private readonly permissionGroupRepo: PermissionGroupRepository
  ) {}

  @Mutation(() => PermissionGroupModel)
  @HasScope('managePermissionGroups')
  async permissionGroupCreate(
    @Body() createPermissionGroupDTO: CreatePermissionGroupDTOImplementation
  ): Promise<PermissionGroupModel> {
    const newPermissionGroup = await this.permissionGroupRepo.create(
      createPermissionGroupDTO
    );
    return permissionGroupWire(newPermissionGroup) as any;
  }

  @Query(() => [PermissionGroupModel])
  @HasScope('managePermissionGroups')
  async permissionGroups(): Promise<PermissionGroupModel[]> {
    const ranks: PermissionGroupEntity[] =
      await this.permissionGroupRepo.getAll();
    return ranks.map(rank => permissionGroupWire(rank)) as any;
  }

  @Query(() => PermissionGroupModel)
  @HasScope('managePermissionGroups')
  permissionGroup(
    @Param('rankID', PermissionGroupPipe) rank: PermissionGroupEntity
  ): PermissionGroupModel {
    return permissionGroupWire(rank) as any;
  }

  @Mutation(() => PermissionGroupModel)
  @HasScope('managePermissionGroups')
  async permissionGroupUpdate(
    @Param('rankID', PermissionGroupPipe) rank: PermissionGroupEntity,
    @Body() updatePermissionGroupDTO: UpdatePermissionGroupDTOImplementation
  ): Promise<PermissionGroupModel> {
    await this.permissionGroupRepo.update(
      {id: rank.id!},
      updatePermissionGroupDTO
    );
    return this.permissionGroup(rank);
  }

  @Mutation(() => Boolean)
  @HasScope('managePermissionGroups')
  async permissionGroupDelete(
    @Param('rankID', PermissionGroupPipe) rank: PermissionGroupEntity
  ): Promise<Boolean> {
    await this.permissionGroupRepo.delete({id: rank.id!});
    return true;
  }
}
