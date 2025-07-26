import { ApiProperty } from '@nestjs/swagger';

export class UserProfileDto {
  @ApiProperty({
    description: 'ID único del usuario',
    example: 1,
  })
  userId: number;

  @ApiProperty({
    description: 'Código de usuario',
    example: '12345678',
  })
  username: string;

  @ApiProperty({
    description: 'ID del staff asociado',
    example: 1,
  })
  staffId: number;

  @ApiProperty({
    description: 'Número de documento de identidad',
    example: '12345678',
  })
  identityDocumentNumber: string;

  @ApiProperty({
    description: 'Nombre del usuario',
    example: 'Juan',
  })
  name: string;

  @ApiProperty({
    description: 'Apellido paterno',
    example: 'Pérez',
  })
  paternalSurname: string;

  @ApiProperty({
    description: 'Apellido materno',
    example: 'García',
  })
  maternalSurname: string;

  @ApiProperty({
    description: 'Roles del usuario',
    example: ['admin', 'manager'],
    type: [String],
  })
  role: string[];
}
