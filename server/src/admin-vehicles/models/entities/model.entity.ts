import { Brand } from 'src/admin-vehicles/brands/entities/brand.entity';
import { Vehicle } from 'src/admin-vehicles/vehicles/entities/vehicle.entity';
import { Timestamped } from 'src/common/entities/timestamped.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Model extends Timestamped {
  @PrimaryGeneratedColumn()
  modelId: number;

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

  @ManyToOne(() => Brand, (brand) => brand.models)
  brand: Brand;

  @OneToMany(() => Vehicle, (vehicle) => vehicle.model)
  vehicles: Vehicle[];
}
