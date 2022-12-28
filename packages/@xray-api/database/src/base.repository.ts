import {OrderBy} from './database.types';
import EventEmitter from 'eventemitter3';
import {FindConditions, Repository} from 'typeorm';
import {BaseRepositoryEvents} from './base.repository.types';
import {QueryDeepPartialEntity} from 'typeorm/query-builder/QueryPartialEntity';

export abstract class BaseRepository<Entity extends {id?: number}> {
  readonly eventEmitter: EventEmitter<BaseRepositoryEvents<Entity>> =
    new EventEmitter();

  constructor(
    readonly repo: Repository<Entity>,
    readonly eagerRelations: string[]
  ) {}

  async create(newEntity: Entity): Promise<Entity> {
    // eslint-disable-next-line
    // @ts-ignore
    const newObject: Entity = await this.repo.save(newEntity);

    if (!newObject.id) {
      throw new Error('Entity missing `id`');
    }

    this.eventEmitter.emit('OBJECT_CREATED', newObject);

    // eslint-disable-next-line
    // @ts-ignore
    return this.findOneOrFail({
      id: newObject.id!,
    });
  }

  find(
    where?: FindConditions<Entity>,
    order?: OrderBy<Entity>
  ): Promise<Entity[]> {
    return this.repo.find({
      where,
      ...order,
      relations: this.eagerRelations,
    });
  }

  findOne(
    where?: FindConditions<Entity>,
    order?: OrderBy<Entity>
  ): Promise<Entity | undefined> {
    return this.repo.findOne({
      where,
      ...order,
      relations: this.eagerRelations,
    });
  }

  findOneOrFail(
    where?: FindConditions<Entity>,
    order?: OrderBy<Entity>
  ): Promise<Entity> {
    return this.repo.findOneOrFail({
      where,
      ...order,
      relations: this.eagerRelations,
    });
  }

  async update(
    conditions: FindConditions<Entity>,
    changes: QueryDeepPartialEntity<Entity>
  ): Promise<void> {
    await this.repo.update(conditions, changes);
    this.eventEmitter.emit('OBJECT_UPDATED', conditions, changes as Entity);
  }

  async delete(conditions: FindConditions<Entity>): Promise<void> {
    await this.repo.delete(conditions);
    this.eventEmitter.emit('OBJECT_DELETED', conditions);
  }

  getInstance(): Repository<Entity> {
    return this.repo;
  }
}
