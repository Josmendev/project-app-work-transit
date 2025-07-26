import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Timestamped } from 'src/common/entities/timestamped.entity';
import { UserHasRoles } from './user-has-roles.entity';
import { Staff } from 'src/admin-users/staff/entities/staff.entity';

@Entity()
export class User extends Timestamped {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column({
    type: 'varchar',
    length: 15,
    nullable: false,
  })
  username: string;

  @Column({
    type: 'varchar',
    length: 62,
    nullable: false,
  })
  password: string;

  @Column({
    type: 'boolean',
    default: false,
  })
  isConfirm: boolean;

  @Column({
    type: 'varchar',
    length: 62,
    nullable: true,
  })
  token: string;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  expiresAt: Date;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  photo: string;

  @Column({
    type: 'boolean',
    default: true,
  })
  isActive: boolean;

  @OneToMany(() => UserHasRoles, (userHasRoles) => userHasRoles.user, {
    cascade: true,
    eager: true,
  })
  userHasRoles: UserHasRoles[];

  @ManyToOne(() => Staff, (staff) => staff.users)
  @JoinColumn({
    name: 'staffId',
  })
  staff: Staff;
}
