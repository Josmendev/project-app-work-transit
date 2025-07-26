import { Trip } from 'src/admin-trips/trips/entities/trip.entity';
import { Model } from 'src/admin-vehicles/models/entities/model.entity';
import { Timestamped } from 'src/common/entities/timestamped.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Vehicle extends Timestamped {
  @PrimaryGeneratedColumn()
  vehicleId: number;

  @Column({
    type: 'varchar',
    length: 15,
    nullable: false,
    unique: true,
  })
  licensePlateNumber: string;

  @Column({
    type: 'int',
    nullable: false,
  })
  capacity: number;

  @Column({
    type: 'boolean',
    default: true,
  })
  isActive: boolean;

  @ManyToOne(() => Model, (model) => model.vehicles)
  model: Model;

  @OneToMany(() => Trip, (trip) => trip.vehicle)
  trips: Trip[];
}
