import {MediaType} from '@xray/types';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('media')
export class MediaEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({name: 'user_id'})
  userID!: number;

  @Column({name: 'file_name'})
  fileName!: string;

  @Column({name: 'file_desc'})
  fileDesc!: string;

  @Column({name: 'file_path'})
  filePath!: string;

  @Column()
  type!: MediaType;

  @Column()
  extension!: string;

  @CreateDateColumn({name: 'created_at'})
  createdAt?: Date;

  @UpdateDateColumn({name: 'updated_at'})
  updatedAt?: Date;
}
