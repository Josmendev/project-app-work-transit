import { IsNumberString, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    description: 'Código de usuario (8 dígitos)',
    example: '70125834',
    minLength: 8,
    maxLength: 8,
  })
  @IsNumberString({}, { message: 'El código debe ser un número' })
  @Length(8, 8, { message: 'El código debe tener 8 dígitos' })
  username: string;

  @ApiProperty({
    description: 'Contraseña del usuario',
    example: 'miPassword123',
    minLength: 6,
    maxLength: 15,
  })
  @IsString({ message: 'La contraseña debe ser una cadena' })
  @Length(6, 15, {
    message: 'La contraseña debe tener entre 6 y 15 caracteres',
  })
  password: string;
}

export class LoginResponseDto {
  @ApiProperty({
    description: 'ID único del usuario',
    example: 1,
  })
  userId: number;

  @ApiProperty({
    description: 'Código de usuario',
    example: '70125834',
  })
  username: string;

  @ApiProperty({
    description: 'Estado de confirmación de la cuenta',
    example: true,
  })
  isConfirm: boolean;

  @ApiProperty({
    description: 'Token JWT (null si cuenta no confirmada)',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    nullable: true,
  })
  token: string | null;
}
