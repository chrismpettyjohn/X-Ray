import {OrderBy} from './database.types';
import {FindOptionsWhere, Repository} from 'typeorm';
import {QueryDeepPartialEntity} from 'typeorm/query-builder/QueryPartialEntity';

export abstract class BaseRepository<Entity extends {id?: number}> {
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

    // eslint-disable-next-line
    // @ts-ignore
    return this.findOneOrFail({
      id: newObject.id!,
    });
  }

  find(
    where?: FindOptionsWhere<Entity>,
    order?: OrderBy<Entity>
  ): Promise<Entity[]> {
    return this.repo.find({
      where,
      ...order,
      relations: this.eagerRelations,
    });
  }

  findOne(
    where?: FindOptionsWhere<Entity>,
    order?: OrderBy<Entity>
  ): Promise<Entity | undefined> {
    return this.repo.findOne({
      where,
      ...order,
      relations: this.eagerRelations,
    }) as any;
  }

  findOneOrFail(
    where?: FindOptionsWhere<Entity>,
    order?: OrderBy<Entity>
  ): Promise<Entity> {
    return this.repo.findOneOrFail({
      where,
      ...order,
      relations: this.eagerRelations,
    });
  }

  async update(
    conditions: FindOptionsWhere<Entity>,
    changes: QueryDeepPartialEntity<Entity>
  ): Promise<void> {
    await this.repo.update(conditions, changes);
  }

  async delete(conditions: FindOptionsWhere<Entity>): Promise<void> {
    await this.repo.delete(conditions);
  }

  getInstance(): Repository<Entity> {
    return this.repo;
  }
}
