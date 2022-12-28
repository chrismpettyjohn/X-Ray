import {Repository} from 'typeorm';
import {UserEntity} from './user.entity';
import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {HashService} from '@xray/common';
import {BaseRepository} from '../base.repository';

@Injectable()
export class UserRepository extends BaseRepository<UserEntity> {
  readonly eagerRelations: Array<keyof UserEntity> = [
    'rank',
    'profilePictureMedia',
  ];

  constructor(
    @InjectRepository(UserEntity) userRepository: Repository<UserEntity>,
    private readonly hashService: HashService
  ) {
    super(userRepository, ['rank', 'profilePictureMedia']);
  }

  async create(user: UserEntity): Promise<UserEntity> {
    return super.create({
      ...user,
      password: this.hashService.generate(user.password),
    });
  }
}
