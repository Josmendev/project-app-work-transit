import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class UserHasRoles {
  @PrimaryGeneratedColumn()
  userHasRolesId: number;

  @ManyToOne(() => User, (user) => user.userHasRoles)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({
    type: 'int',
    nullable: false,
  })
  roleId: number;
}
