import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ConnectionPointsService } from './connection-points.service';
import { CreateConnectionPointDto } from './dto/create-connection-point.dto';
import { UpdateConnectionPointDto } from './dto/update-connection-point.dto';

@Controller('connection-points')
export class ConnectionPointsController {
  constructor(private readonly connectionPointsService: ConnectionPointsService) {}

  @Post()
  create(@Body() createConnectionPointDto: CreateConnectionPointDto) {
    return this.connectionPointsService.create(createConnectionPointDto);
  }

  @Get()
  findAll() {
    return this.connectionPointsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.connectionPointsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateConnectionPointDto: UpdateConnectionPointDto) {
    return this.connectionPointsService.update(+id, updateConnectionPointDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.connectionPointsService.remove(+id);
  }
}
