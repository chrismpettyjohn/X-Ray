import {Body, Param} from '@nestjs/common';
import {Mutation, Resolver, Query} from '@nestjs/graphql';
import {PermissionGroupPipe} from './permission-group.pipe';
import {HasScope} from '../session/permission-scope.decorator';
import {PermissionGroupModel} from './permission-group.model';
import {PermissionGroupEntity} from '../database/permission-group/permission-group.entity';
import {PermissionGroupRepository} from '../database/permission-group/permission-group.repository';
import {
  CreatePermissionGroupDTOImplementation,
  UpdatePermissionGroupDTOImplementation,
} from './permission-group.dto';

@Resolver(() => PermissionGroupModel)
export class PermissionGroupResolver {
  constructor(
    private readonly permissionGroupRepo: PermissionGroupRepository
  ) {}

  @Mutation(() => PermissionGroupModel)
  @HasScope('managePermissionGroups')
  async permissionGroupCreate(
    @Body() createPermissionGroupDTO: CreatePermissionGroupDTOImplementation
  ): Promise<PermissionGroupEntity> {
    return this.permissionGroupRepo.create(createPermissionGroupDTO);
  }

  @Query(() => [PermissionGroupModel])
  @HasScope('managePermissionGroups')
  async permissionGroups(): Promise<PermissionGroupEntity[]> {
    return this.permissionGroupRepo.getAll();
  }

  @Query(() => PermissionGroupModel)
  @HasScope('managePermissionGroups')
  permissionGroup(
    @Param('rankID', PermissionGroupPipe) rank: PermissionGroupEntity
  ): PermissionGroupEntity {
    return rank;
  }

  @Mutation(() => PermissionGroupModel)
  @HasScope('managePermissionGroups')
  async permissionGroupUpdate(
    @Param('rankID', PermissionGroupPipe) rank: PermissionGroupEntity,
    @Body() updatePermissionGroupDTO: UpdatePermissionGroupDTOImplementation
  ): Promise<PermissionGroupEntity> {
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
