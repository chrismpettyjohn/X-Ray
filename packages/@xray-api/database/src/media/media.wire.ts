import {MediaEntity} from './media.entity';
import {Media} from '@xray/types';

export function mediaWire(entity: MediaEntity, photoURL: string): Media {
  return {
    id: entity.id!,
    url: photoURL,
    type: entity.type,
    extension: entity.extension,
    createdAt: entity.createdAt!.toISOString(),
    updatedAt: entity.updatedAt!.toISOString(),
  };
}
