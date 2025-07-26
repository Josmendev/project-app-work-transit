import { Module } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { VehiclesController } from './vehicles.controller';
import { Vehicle } from './entities/vehicle.entity';

@Module({
  imports: [Vehicle],
  controllers: [VehiclesController],
  providers: [VehiclesService],
})
export class VehiclesModule {}
