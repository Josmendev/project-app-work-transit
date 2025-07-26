import { Stop } from 'src/admin-routes/stops/entities/stop.entity';
import { Timestamped } from 'src/common/entities/timestamped.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Zone extends Timestamped {
  @PrimaryGeneratedColumn()
  zoneId: number;

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

  @OneToMany(() => Stop, (stop) => stop.zone)
  stops: Stop[];
}
