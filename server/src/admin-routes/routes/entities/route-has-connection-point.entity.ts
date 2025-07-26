import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Route } from './route.entity';
import { ConnectionPoint } from 'src/admin-routes/connection-points/entities/connection-point.entity';
import { Stop } from 'src/admin-routes/stops/entities/stop.entity';
import { Timestamped } from 'src/common/entities/timestamped.entity';

@Entity()
export class RouteHasConnectionPoint extends Timestamped {
  @PrimaryGeneratedColumn()
  routeHasConnectionPointId: number;

  @ManyToOne(() => Route, (route) => route.routeHasConnectionPoints)
  route: Route;

  @ManyToOne(
    () => ConnectionPoint,
    (connectionPoint) => connectionPoint.routeHasConnectionPoints,
  )
  connectionPoint: ConnectionPoint;

  @ManyToOne(() => Stop, (stop) => stop.routeHasConnectionPoints)
  stop: Stop;
}
