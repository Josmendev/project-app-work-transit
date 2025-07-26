import { RouteHasConnectionPoint } from 'src/admin-routes/routes/entities/route-has-connection-point.entity';
import { Timestamped } from 'src/common/entities/timestamped.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ConnectionPoint extends Timestamped {
  @PrimaryGeneratedColumn()
  connectionPointId: number;

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

  @OneToMany(
    () => RouteHasConnectionPoint,
    (routeHasConnectionPoint) => routeHasConnectionPoint.connectionPoint,
  )
  routeHasConnectionPoints: RouteHasConnectionPoint[];
}
