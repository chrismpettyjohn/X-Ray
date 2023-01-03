import {PermissionGroupPipe} from './permission-group.pipe';
import {
  CreatePermissionGroupDTOImplementation,
  UpdatePermissionGroupDTOImplementation,
} from './permission-group.dto';
import {PermissionGroup} from '@xray/types';
import { HasScope  } from '../session/permission-scope.decorator';
import { permissionGroupWire } from '../database/permission-group/permission-group.wire';
import { PermissionGroupEntity } from '../database/permission-group/permission-group.entity';
import { PermissionGroupRepository } from '../database/permission-group/permission-group.repository';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

@Controller('permission-groups')
export class PermissionGroupController {
  constructor(
    private readonly permissionGroupRepo: PermissionGroupRepository
  ) {}

  @Post()
  @HasScope('managePermissionGroups')
  async createPermissionGroup(
    @Body() createPermissionGroupDTO: CreatePermissionGroupDTOImplementation
  ): Promise<PermissionGroup> {
    const newPermissionGroup = await this.permissionGroupRepo.create(
      createPermissionGroupDTO
    );
    return permissionGroupWire(newPermissionGroup);
  }

  @Get()
  @HasScope('managePermissionGroups')
  async getMany(): Promise<PermissionGroup[]> {
    const ranks: PermissionGroupEntity[] =
      await this.permissionGroupRepo.getAll();
    return ranks.map(rank => permissionGroupWire(rank));
  }

  @Get(':rankID')
  @HasScope('managePermissionGroups')
  getByID(
    @Param('rankID', PermissionGroupPipe) rank: PermissionGroupEntity
  ): PermissionGroup {
    return permissionGroupWire(rank);
  }

  @Patch(':rankID')
  @HasScope('managePermissionGroups')
  async updateByID(
    @Param('rankID', PermissionGroupPipe) rank: PermissionGroupEntity,
    @Body() updatePermissionGroupDTO: UpdatePermissionGroupDTOImplementation
  ): Promise<string> {
    await this.permissionGroupRepo.update(
      {id: rank.id!},
      updatePermissionGroupDTO
    );
    return 'Your changes have been saved';
  }

  @Delete(':rankID')
  @HasScope('managePermissionGroups')
  async deleteByID(
    @Param('rankID', PermissionGroupPipe) rank: PermissionGroupEntity
  ): Promise<string> {
    await this.permissionGroupRepo.delete({id: rank.id!});
    return 'PermissionGroup has been deleted';
  }
}
