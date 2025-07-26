import { Timestamped } from 'src/common/entities/timestamped.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
