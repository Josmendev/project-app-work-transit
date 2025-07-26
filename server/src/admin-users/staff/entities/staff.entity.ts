import { TripHasPassengers } from 'src/admin-trips/trips/entities/trip-has-passengers.entity';
import { User } from 'src/admin-users/users/entities/user.entity';
import { Timestamped } from 'src/common/entities/timestamped.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Staff extends Timestamped {
  @PrimaryGeneratedColumn()
  staffId: number;

  @Column({
    type: 'varchar',
    length: 8,
    unique: true,
    nullable: false,
  })
  identityDocumentNumber: string;

  @Column({
    type: 'varchar',
    length: 30,
    nullable: false,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 15,
    nullable: false,
  })
  paternalSurname: string;

  @Column({
    type: 'varchar',
    length: 15,
    nullable: false,
  })
  maternalSurname: string;

  @Column({
    type: 'varchar',
    length: 12,
    nullable: false,
  })
  telephone: string;

  @Column({
    type: 'varchar',
    length: 25,
    nullable: false,
  })
  email: string;

  @Column({
    type: 'boolean',
    default: true,
  })
  isActive: boolean;

  @OneToMany(() => User, (user) => user.staff)
  users: User[];

  @OneToMany(
    () => TripHasPassengers,
    (tripHasPassengers) => tripHasPassengers.staff,
  )
  tripHasPassengers: TripHasPassengers[];
}
