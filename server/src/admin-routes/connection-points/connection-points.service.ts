import { Injectable } from '@nestjs/common';
import { CreateConnectionPointDto } from './dto/create-connection-point.dto';
import { UpdateConnectionPointDto } from './dto/update-connection-point.dto';

@Injectable()
export class ConnectionPointsService {
  create(createConnectionPointDto: CreateConnectionPointDto) {
    return 'This action adds a new connectionPoint';
  }

  findAll() {
    return `This action returns all connectionPoints`;
  }

  findOne(id: number) {
    return `This action returns a #${id} connectionPoint`;
  }

  update(id: number, updateConnectionPointDto: UpdateConnectionPointDto) {
    return `This action updates a #${id} connectionPoint`;
  }

  remove(id: number) {
    return `This action removes a #${id} connectionPoint`;
  }
}
