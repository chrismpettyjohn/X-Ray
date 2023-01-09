import {UserEntity} from '../user/user.entity';
import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {examplePermissionGroupScopes, PermissionGroupScopes} from '@xray/types';

@Entity('permission_groups')
export class PermissionGroupEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({name: 'order_by_id', unique: true})
  orderById!: number;

  @Column({name: 'rank_name'})
  title!: string;

  @Column()
  description!: string;

  @Column({type: 'json', default: JSON.stringify(examplePermissionGroupScopes)})
  scopes!: PermissionGroupScopes;

  @OneToMany(() => UserEntity, (user: UserEntity) => user.permissionGroup)
  users?: UserEntity[];
}
