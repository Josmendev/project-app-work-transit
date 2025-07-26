import { Module } from '@nestjs/common';
import { RoutesService } from './routes.service';
import { RoutesController } from './routes.controller';
import { Route } from './entities/route.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RouteHasConnectionPoint } from './entities/route-has-connection-point.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Route, RouteHasConnectionPoint])],
  controllers: [RoutesController],
  providers: [RoutesService],
})
export class RoutesModule {}
