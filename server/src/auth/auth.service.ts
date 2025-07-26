import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/admin-users/users/users.service';
import { LoginDto, LoginResponseDto } from './dto/login.dto';
import { EncryptionService } from 'src/common/interfaces/encryption-service.interface';
import { TokenService } from 'src/common/interfaces/token-service.interface';
import { JwtPayloadDto } from './dto/jwt-payload.dto';
import { formatUserResponseForLogin } from './helpers/format-user-response-for-login.helper';
import {
  ENCRYPTION_SERVICE,
  TOKEN_SERVICE,
} from 'src/common/constants/constants';
import {
  ConfirmAccountDto,
  ConfirmAccountResponseDto,
} from './dto/confirm-acount.dto';
import { generatedPin } from './helpers/generated-pin.helper';
import { StaffService } from 'src/admin-users/staff/staff.service';
import { EmailsService } from 'src/emails/emails.service';
import { RequestPasswordResetResponseDto } from './dto/request-password-reset.dto';
import { ValidatePinDto, ValidatePinResponseDto } from './dto/validate-pin.dto';
import {
  ResetPasswordWithPinDto,
  ResetPasswordWithPinResponseDto,
} from './dto/reset-password-with-pin.dto';
import { ValidateTokenDto } from './dto/validate-token.dto';
import { UserProfileDto } from './dto/validate-user-response.dto';
import { formatUserProfile } from './helpers/format-user-profile.helper';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly staffService: StaffService,
    private readonly emailService: EmailsService,
    @Inject(ENCRYPTION_SERVICE)
    private readonly encryptionService: EncryptionService,
    @Inject(TOKEN_SERVICE)
    private readonly tokenService: TokenService,
  ) {}

  async login(loginDto: LoginDto): Promise<LoginResponseDto> {
    const { username, password } = loginDto;
    const user = await this.userService.findOneByUsername(username);
    const isPasswordValid = await this.encryptionService.compare(
      password,
      user.password,
    );
    if (!isPasswordValid)
      throw new UnauthorizedException(
        `Las credenciales no son válidas (contraseña)`,
      );
    const token = user.isConfirm ? this.getJwtToken({ id: user.userId }) : null;
    return {
      ...formatUserResponseForLogin(user),
      token,
    };
  }

  async confirmAcount(
    confirmAccountDto: ConfirmAccountDto,
  ): Promise<ConfirmAccountResponseDto> {
    const { userId, newPassword, repeatPassword } = confirmAccountDto;
    if (newPassword !== repeatPassword)
      throw new BadRequestException('Las contraseñas no coinciden');
    const password = await this.encryptionService.hash(newPassword);
    await this.userService.updatePasswordAndConfirm({
      userId,
      password,
    });
    return {
      token: this.getJwtToken({ id: userId }),
    };
  }

  async requestPasswordReset(
    email: string,
  ): Promise<RequestPasswordResetResponseDto> {
    const pin: string = generatedPin();
    const staff = await this.staffService.findOneByEmail(email);
    const user = await this.userService.findOneByStaffId(staff.staffId);
    const pinHashed = await this.encryptionService.hash(pin);
    await this.userService.updateTokenAndExpirationTime({
      userId: user.userId,
      token: pinHashed,
    });
    this.emailService.requestPasswordResetUser({ email, pin });
    return {
      message: `Se ha enviado el código de verificación al correo ${email}`,
    };
  }

  async validatePin(
    validatePinDto: ValidatePinDto,
  ): Promise<ValidatePinResponseDto> {
    const { pin } = validatePinDto;
    const user = await this.userService.findUserWithValidToken();
    const isPinValid = await this.encryptionService.compare(pin, user.token);
    if (!isPinValid) throw new BadRequestException('El PIN no es válido');
    return {
      message: 'El PIN es válido',
      userId: user.userId,
    };
  }

  async resetPasswordWithPin(
    resetPasswordDto: ResetPasswordWithPinDto,
  ): Promise<ResetPasswordWithPinResponseDto> {
    const { pin, newPassword, repeatPassword } = resetPasswordDto;
    // Validar que las contraseñas coincidan
    if (newPassword !== repeatPassword)
      throw new BadRequestException('Las contraseñas no coinciden');

    const user = await this.userService.findUserWithValidToken();
    const isPinValid = await this.encryptionService.compare(pin, user.token);
    if (!isPinValid) throw new BadRequestException('PIN inválido');
    const password = await this.encryptionService.hash(newPassword);
    await this.userService.updatePasswordAndClearToken({
      userId: user.userId,
      password,
    });
    return {
      message: 'Contraseña restablecida exitosamente',
    };
  }

  async validateToken(
    validateTokenDto: ValidateTokenDto,
  ): Promise<UserProfileDto> {
    const { token } = validateTokenDto;
    try {
      // Verificar y decodificar el token
      const payload: JwtPayloadDto = this.tokenService.verify(token);
      // Buscar usuario en la base de datos
      const user = await this.userService.findOneForAuth(payload.id);
      if (!user) throw new UnauthorizedException('Usuario no encontrado');
      if (!user.isActive) throw new UnauthorizedException('Usuario inactivo');
      if (!user.isConfirm)
        throw new UnauthorizedException('Usuario no confirmado');
      return formatUserProfile(user);
    } catch (error) {
      if (error instanceof UnauthorizedException) throw error;
      throw new UnauthorizedException('Token inválido o expirado');
    }
  }

  private getJwtToken(payload: JwtPayloadDto) {
    return this.tokenService.sign(payload);
  }
}
