import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { Timestamped } from 'src/common/entities/timestamped.entity';
import { Role } from 'src/admin-users/roles/entities/role.entity';

@Entity()
export class UserHasRoles extends Timestamped {
  @PrimaryGeneratedColumn()
  userHasRolesId: number;

  @ManyToOne(() => User, (user) => user.userHasRoles)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Role, (role) => role.userHasRoles)
  @JoinColumn({ name: 'roleId' })
  role: Role;
}
