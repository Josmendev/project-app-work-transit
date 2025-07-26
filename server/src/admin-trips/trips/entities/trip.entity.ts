import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Route } from 'src/admin-routes/routes/entities/route.entity';
import { Vehicle } from 'src/admin-vehicles/vehicles/entities/vehicle.entity';
import { Timestamped } from 'src/common/entities/timestamped.entity';
import { TripHasPassengers } from './trip-has-passengers.entity';
import { TripStatus } from '../enums/trip-status.enum';

@Entity()
export class Trip extends Timestamped {
  @PrimaryGeneratedColumn()
  tripId: number;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  tripNum: string;

  @ManyToOne(() => Route, (route) => route.trips)
  route: Route;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.trips)
  vehicle: Vehicle;

  @Column({
    type: 'varchar',
    length: 300,
    nullable: true,
  })
  qrCode: string;

  @Column({
    type: 'int',
    nullable: false,
  })
  finalCapacity: number;

  @Column({
    type: 'timestamp',
    nullable: false,
  })
  estimatedTimeOfArrival: Date;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  arrivalTime: Date;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  departureTime: Date;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  completionTime: Date;

  @Column({
    type: 'enum',
    enum: TripStatus,
    default: TripStatus.PENDING,
  })
  status: TripStatus;

  @OneToMany(
    () => TripHasPassengers,
    (tripHasPassengers) => tripHasPassengers.trip,
  )
  tripHasPassengers: TripHasPassengers[];
}
