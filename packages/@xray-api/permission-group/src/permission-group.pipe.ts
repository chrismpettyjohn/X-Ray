import {PipeTransform, Injectable, NotFoundException} from '@nestjs/common';
import {PermissionGroupEntity, PermissionGroupRepository} from '@xray/database';

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
