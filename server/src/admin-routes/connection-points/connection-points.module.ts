import { Module } from '@nestjs/common';
import { ConnectionPointsService } from './connection-points.service';
import { ConnectionPointsController } from './connection-points.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionPoint } from './entities/connection-point.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ConnectionPoint])],
  controllers: [ConnectionPointsController],
  providers: [ConnectionPointsService],
})
export class ConnectionPointsModule {}
