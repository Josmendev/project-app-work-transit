import { IsString, IsNotEmpty, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ValidatePinDto {
  @ApiProperty({
    description: 'PIN de verificación recibido por email',
    example: '1234',
    minLength: 4,
    maxLength: 4,
  })
  @IsString({ message: 'El PIN debe ser una cadena' })
  @IsNotEmpty({ message: 'El PIN no puede estar vacío' })
  @Length(4, 4, { message: 'El PIN debe tener 4 dígitos' })
  pin: string;
}

export class ValidatePinResponseDto {
  @ApiProperty({
    description: 'Mensaje de confirmación',
    example: 'PIN válido',
  })
  message: string;

  @ApiProperty({
    description: 'ID del usuario para el siguiente paso',
    example: 1,
  })
  userId: number;
}
