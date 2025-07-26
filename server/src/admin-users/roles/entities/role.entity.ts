import { UserHasRoles } from 'src/admin-users/users/entities/user-has-roles.entity';
import { Timestamped } from 'src/common/entities/timestamped.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Role extends Timestamped {
  @PrimaryGeneratedColumn()
  roleId: number;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: false,
  })
  description: string;

  @Column({
    type: 'boolean',
    default: true,
  })
  isActive: boolean;

  @OneToMany(() => UserHasRoles, (userHasRoles) => userHasRoles.role)
  userHasRoles: UserHasRoles[];
}
