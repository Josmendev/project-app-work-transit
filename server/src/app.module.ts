import { Module } from '@nestjs/common';
import { AdminRoutesModule } from './admin-routes/admin-routes.module';
import { AdminTripsModule } from './admin-trips/admin-trips.module';
import { AdminUsersModule } from './admin-users/admin-users.module';
import { AdminVehiclesModule } from './admin-vehicles/admin-vehicles.module';
import { CommonModule } from './common/common.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    AdminRoutesModule,
    AdminTripsModule,
    AdminUsersModule,
    AdminVehiclesModule,
    CommonModule,
  ],
})
export class AppModule {}
