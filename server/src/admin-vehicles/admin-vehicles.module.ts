import { Module } from '@nestjs/common';
import { VehiclesModule } from './vehicles/vehicles.module';
import { BrandsModule } from './brands/brands.module';
import { ModelsModule } from './models/models.module';

@Module({
  imports: [VehiclesModule, BrandsModule, ModelsModule]
})
export class AdminVehiclesModule {}
