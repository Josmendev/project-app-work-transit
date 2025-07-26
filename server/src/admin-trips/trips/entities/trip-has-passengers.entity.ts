import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Trip } from './trip.entity';
import { Staff } from 'src/admin-users/staff/entities/staff.entity';
import { Timestamped } from 'src/common/entities/timestamped.entity';

@Entity()
export class TripHasPassengers extends Timestamped {
  @PrimaryGeneratedColumn()
  tripHasPassengerId: number;

  @ManyToOne(() => Trip, (trip) => trip.tripHasPassengers)
  trip: Trip;

  @ManyToOne(() => Staff, (staff) => staff.tripHasPassengers, {
    nullable: true,
  })
  staff: Staff;
}
