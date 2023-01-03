import {Repository} from 'typeorm';
import {MediaEntity} from './media.entity';
import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {BaseRepository} from '../base.repository';

@Injectable()
export class MediaRepository extends BaseRepository<MediaEntity> {
  constructor(
    @InjectRepository(MediaEntity) mediaRepo: Repository<MediaEntity>
  ) {
    super(mediaRepo, []);
  }
}
