import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {BaseRepository} from '../base.repository';
import {MediaEntity} from './media.entity';

@Injectable()
export class MediaRepository extends BaseRepository<MediaEntity> {
  constructor(
    @InjectRepository(MediaEntity) mediaRepo: Repository<MediaEntity>
  ) {
    super(mediaRepo, []);
  }
}
