import { Module } from '@nestjs/common';
import { StopsService } from './stops.service';
import { StopsController } from './stops.controller';
import { Stop } from './entities/stop.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Stop])],
  controllers: [StopsController],
  providers: [StopsService],
})
export class StopsModule {}
