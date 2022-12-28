import {Repository} from 'typeorm';
import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {BaseRepository} from '../base.repository';
import {PermissionGroupEntity} from './permission-group.entity';

@Injectable()
export class PermissionGroupRepository extends BaseRepository<PermissionGroupEntity> {
  constructor(
    @InjectRepository(PermissionGroupEntity)
    rankRepo: Repository<PermissionGroupEntity>
  ) {
    super(rankRepo, ['users']);
  }

  async create(rank: PermissionGroupEntity): Promise<PermissionGroupEntity> {
    const newRank = await super.create(rank);
    return this.findOneOrFail({id: newRank.id!});
  }

  getAll(): Promise<PermissionGroupEntity[]> {
    return this.find({}, {id: 'DESC'});
  }
}
