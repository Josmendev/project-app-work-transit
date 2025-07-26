import {
  IsString,
  IsNotEmpty,
  Length,
  Matches,
  MinLength,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordWithPinDto {
  @ApiProperty({
    description: 'PIN de verificación',
    example: '1234',
  })
  @IsString({ message: 'El PIN debe ser una cadena' })
  @IsNotEmpty({ message: 'El PIN no puede estar vacío' })
  @Length(4, 4, { message: 'El PIN debe tener 4 dígitos' })
  pin: string;

  @ApiProperty({
    description:
      'Nueva contraseña (mínimo 6 caracteres, debe incluir mayúscula, minúscula y número)',
    example: 'miPassword123',
    minLength: 6,
    maxLength: 50,
  })
  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'La contraseña debe tener una mayúscula, una minúscula y un número',
  })
  newPassword: string;

  @ApiProperty({
    description: 'Confirmación de la nueva contraseña',
    example: 'miPassword123',
  })
  @IsString()
  @MinLength(6)
  @MaxLength(50)
  repeatPassword: string;
}

export class ResetPasswordWithPinResponseDto {
  @ApiProperty({
    description: 'Mensaje de confirmación',
    example: 'Contraseña restablecida exitosamente',
  })
  message: string;
}
