import { Controller } from '@nestjs/common';
import { ConnectionPointsService } from './connection-points.service';

@Controller('connection-points')
export class ConnectionPointsController {
  constructor(
    private readonly connectionPointsService: ConnectionPointsService,
  ) {}
}
