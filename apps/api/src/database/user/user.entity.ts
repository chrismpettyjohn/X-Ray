import {PermissionGroupEntity} from '../permission-group/permission-group.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {MediaEntity} from '../media/media.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn({name: 'id'})
  id?: number;

  @Column({name: 'username', unique: true})
  username!: string;

  @Column({name: 'password'})
  password!: string;

  @Column({name: 'rank_id'})
  rankID!: number;

  @ManyToOne(() => PermissionGroupEntity)
  @JoinColumn({name: 'rank_id'})
  rank?: PermissionGroupEntity;

  @Column({unique: true, nullable: true})
  emailAddress?: string;

  @Column({name: 'profile_picture_media_id', nullable: true})
  profilePictureMediaID?: number;

  @ManyToOne(() => MediaEntity, {nullable: true})
  @JoinColumn({name: 'profile_picture_media_id'})
  profilePictureMedia?: MediaEntity;
}
