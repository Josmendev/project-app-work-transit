import { PartialType } from '@nestjs/mapped-types';
import { CreateConnectionPointDto } from './create-connection-point.dto';

export class UpdateConnectionPointDto extends PartialType(CreateConnectionPointDto) {}
