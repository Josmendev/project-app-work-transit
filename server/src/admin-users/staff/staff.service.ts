import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Staff } from './entities/staff.entity';
import { Repository } from 'typeorm';
import { FindOneByEmailResponseDto } from './dto/find-one-by-emai.dto';
import { formatStaffResponse } from './helpers/format-staff-response.helper';

@Injectable()
export class StaffService {
  constructor(
    @InjectRepository(Staff)
    private readonly staffRepository: Repository<Staff>,
  ) {}

  async findOneByEmail(email: string): Promise<FindOneByEmailResponseDto> {
    const staff = await this.staffRepository.findOne({
      where: { email, isActive: true },
    });
    if (!staff)
      throw new NotFoundException(
        `El personal con el email ${email} no se encuentra registrado`,
      );
    return formatStaffResponse(staff);
  }
}
