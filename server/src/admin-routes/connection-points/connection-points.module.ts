import { Module } from '@nestjs/common';
import { ConnectionPointsService } from './connection-points.service';
import { ConnectionPointsController } from './connection-points.controller';

@Module({
  controllers: [ConnectionPointsController],
  providers: [ConnectionPointsService],
})
export class ConnectionPointsModule {}
