import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RouteHasConnectionPoint } from './route-has-connection-point.entity';
import { Timestamped } from 'src/common/entities/timestamped.entity';
import { Trip } from 'src/admin-trips/trips/entities/trip.entity';

@Entity()
export class Route extends Timestamped {
  @PrimaryGeneratedColumn()
  routeId: number;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: false,
    unique: true,
  })
  routeNumber: string;

  @Column({
    type: 'boolean',
    default: true,
  })
  isActive: boolean;

  @OneToMany(
    () => RouteHasConnectionPoint,
    (routeHasConnectionPoint) => routeHasConnectionPoint.route,
  )
  routeHasConnectionPoints: RouteHasConnectionPoint[];

  @OneToMany(() => Trip, (trip) => trip.route)
  trips: Trip[];
}
