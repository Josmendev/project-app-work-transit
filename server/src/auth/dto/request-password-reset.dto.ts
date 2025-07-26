import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RequestPasswordResetDto {
  @ApiProperty({
    description: 'Correo electrónico del usuario',
    example: 'josmendev@gmail.com',
  })
  @IsEmail({}, { message: 'El correo no es válido' })
  @IsNotEmpty({ message: 'El correo no puede estar vacío' })
  email: string;
}

export class RequestPasswordResetResponseDto {
  @ApiProperty({
    description: 'Mensaje de confirmación',
    example: 'Correo de restablecimiento enviado exitosamente',
  })
  message: string;
}
