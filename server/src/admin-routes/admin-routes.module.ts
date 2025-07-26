import { Module } from '@nestjs/common';
import { RoutesModule } from './routes/routes.module';
import { ConnectionPointsModule } from './connection-points/connection-points.module';
import { StopsModule } from './stops/stops.module';
import { ZonesModule } from './zones/zones.module';

@Module({
  imports: [RoutesModule, ConnectionPointsModule, StopsModule, ZonesModule]
})
export class AdminRoutesModule {}
