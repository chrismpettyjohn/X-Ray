import {FindOptionsWhere} from 'typeorm';

export interface BaseRepositoryEvents<Entity> {
  OBJECT_CREATED: (newObject: Entity) => void;
  OBJECT_UPDATED: (
    conditions: FindOptionsWhere<Entity>,
    changes: Partial<Entity>
  ) => void;
  OBJECT_DELETED: (deletedObject: FindOptionsWhere<Entity>) => void;
}
