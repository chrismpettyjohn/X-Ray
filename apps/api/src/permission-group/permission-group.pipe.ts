import {PipeTransform, Injectable, NotFoundException} from '@nestjs/common';
import { PermissionGroupEntity  } from '../database/permission-group/permission-group.entity';
import { PermissionGroupRepository } from '../database/permission-group/permission-group.repository';

@Injectable()
export class PermissionGroupPipe implements PipeTransform {
  constructor(
    private readonly permissionGroupRepo: PermissionGroupRepository
  ) {}

  async transform(permissionGroupID: number): Promise<PermissionGroupEntity> {
    try {
      return await this.permissionGroupRepo.findOneOrFail({
        id: permissionGroupID,
      });
    } catch (e) {
      throw new NotFoundException('Permission Group does not exist');
    }
  }
}
