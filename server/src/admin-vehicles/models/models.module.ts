import { Module } from '@nestjs/common';
import { ModelsService } from './models.service';
import { ModelsController } from './models.controller';
import { Model } from './entities/model.entity';

@Module({
  imports: [Model],
  controllers: [ModelsController],
  providers: [ModelsService],
})
export class ModelsModule {}
