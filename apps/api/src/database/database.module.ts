import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import { CommonModule } from '../common/common.module';
import {databaseEntities, databaseRepositories} from './database.meta';

@Module({
  imports: [CommonModule, TypeOrmModule.forFeature(databaseEntities)],
  providers: [...databaseRepositories],
  exports: [TypeOrmModule, ...databaseRepositories],
})
export class DatabaseModule {}
