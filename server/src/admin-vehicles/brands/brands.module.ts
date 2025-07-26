import { Module } from '@nestjs/common';
import { BrandsService } from './brands.service';
import { BrandsController } from './brands.controller';
import { Brand } from './entities/brand.entity';

@Module({
  imports: [Brand],
  controllers: [BrandsController],
  providers: [BrandsService],
})
export class BrandsModule {}
