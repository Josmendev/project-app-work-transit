import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto, LoginResponseDto } from './dto/login.dto';
import {
  ConfirmAccountDto,
  ConfirmAccountResponseDto,
} from './dto/confirm-acount.dto';
import {
  RequestPasswordResetDto,
  RequestPasswordResetResponseDto,
} from './dto/request-password-reset.dto';
import { ValidatePinDto, ValidatePinResponseDto } from './dto/validate-pin.dto';
import {
  ResetPasswordWithPinDto,
  ResetPasswordWithPinResponseDto,
} from './dto/reset-password-with-pin.dto';
import { Auth } from './decorators/auth.decorator';
import { GetUser } from './decorators/get-user.decorator';
import { UserProfileDto } from './dto/validate-user-response.dto';

@ApiTags('Autenticación')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Iniciar sesión' })
  @ApiResponse({
    status: 200,
    description: 'Login exitoso',
    type: LoginResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Credenciales inválidas',
  })
  async login(@Body() loginDto: LoginDto): Promise<LoginResponseDto> {
    return this.authService.login(loginDto);
  }

  @Post('confirm-account')
  @ApiOperation({ summary: 'Confirmar cuenta y establecer contraseña' })
  @ApiResponse({
    status: 200,
    description: 'Cuenta confirmada exitosamente',
    type: ConfirmAccountResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Contraseñas no coinciden o usuario inválido',
  })
  async confirmAccount(
    @Body() confirmAccountDto: ConfirmAccountDto,
  ): Promise<ConfirmAccountResponseDto> {
    return this.authService.confirmAcount(confirmAccountDto);
  }

  @Post('request-password-reset')
  @ApiOperation({ summary: 'Solicitar restablecimiento de contraseña' })
  @ApiResponse({
    status: 200,
    description: 'Correo de restablecimiento enviado',
    type: RequestPasswordResetResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Correo electrónico inválido',
  })
  async requestPasswordReset(
    @Body() requestPasswordResetDto: RequestPasswordResetDto,
  ): Promise<RequestPasswordResetResponseDto> {
    return this.authService.requestPasswordReset(requestPasswordResetDto.email);
  }

  @Post('validate-pin')
  @ApiOperation({ summary: 'Validar PIN de restablecimiento' })
  @ApiResponse({
    status: 200,
    description: 'PIN válido',
    type: ValidatePinResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'PIN inválido o expirado',
  })
  async validatePin(
    @Body() validatePinDto: ValidatePinDto,
  ): Promise<ValidatePinResponseDto> {
    return this.authService.validatePin(validatePinDto);
  }

  @Post('reset-password-with-pin')
  @ApiOperation({ summary: 'Restablecer contraseña usando PIN válido' })
  @ApiResponse({
    status: 200,
    description: 'Contraseña restablecida exitosamente',
    type: ResetPasswordWithPinResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'PIN inválido, expirado o contraseñas no coinciden',
  })
  async resetPasswordWithPin(
    @Body() resetPasswordDto: ResetPasswordWithPinDto,
  ): Promise<ResetPasswordWithPinResponseDto> {
    return this.authService.resetPasswordWithPin(resetPasswordDto);
  }

  @Get('user-profile')
  @Auth()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener perfil del usuario autenticado' })
  @ApiResponse({
    status: 200,
    description: 'Perfil del usuario obtenido exitosamente',
    type: UserProfileDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Token de autorización requerido o inválido',
  })
  @ApiResponse({
    status: 403,
    description: 'Usuario sin permisos suficientes',
  })
  userProfile(@GetUser() user: UserProfileDto): UserProfileDto {
    return user;
  }
}
