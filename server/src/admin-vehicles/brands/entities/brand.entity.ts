import { Model } from 'src/admin-vehicles/models/entities/model.entity';
import { Timestamped } from 'src/common/entities/timestamped.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Brand extends Timestamped {
  @PrimaryGeneratedColumn()
  brandId: number;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  description: string;

  @Column({
    type: 'boolean',
    default: true,
  })
  isActive: boolean;

  @OneToMany(() => Model, (model) => model.brand)
  models: Model[];
}
