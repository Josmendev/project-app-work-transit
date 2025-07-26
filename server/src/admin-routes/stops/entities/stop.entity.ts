import { RouteHasConnectionPoint } from 'src/admin-routes/routes/entities/route-has-connection-point.entity';
import { Zone } from 'src/admin-routes/zones/entities/zone.entity';
import { Timestamped } from 'src/common/entities/timestamped.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Stop extends Timestamped {
  @PrimaryGeneratedColumn()
  stopId: number;

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

  @ManyToOne(() => Zone, (zone) => zone.stops)
  zone: Zone;

  @OneToMany(
    () => RouteHasConnectionPoint,
    (routeHasConnectionPoint) => routeHasConnectionPoint.stop,
  )
  routeHasConnectionPoints: RouteHasConnectionPoint[];
}
