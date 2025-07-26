import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, MoreThan, Not, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UpdatePasswordAndConfirmDto } from './dto/update-password-and-confirm.dto';
import { UpdateTokenAndExpirationTimeDto } from './dto/update-token-and-expiration-time.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findOneByUsername(username: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { username, isActive: true },
    });
    if (!user) throw new NotFoundException(`El usuario ${username} no existe`);
    return user;
  }

  async findOneByStaffId(staffId: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { staff: { staffId }, isActive: true },
    });
    return this.validateUserWithStatus(user, staffId);
  }

  async updatePasswordAndConfirm(
    updatePasswordAndConfirmDto: UpdatePasswordAndConfirmDto,
  ): Promise<string> {
    const { userId, password } = updatePasswordAndConfirmDto;
    const user = await this.userRepository.update(
      { userId },
      { password, isConfirm: true },
    );
    if (user.affected === 0)
      throw new NotFoundException(
        `El usuario con id ${userId} no se encuentra registrado`,
      );
    return 'El usuario se confirmó correctamente';
  }

  private validateUserWithStatus(user: User | null, staffId: number): User {
    if (!user)
      throw new NotFoundException(
        `El usuario con id de personal ${staffId} no se encuentra registrado`,
      );
    if (!user.isConfirm)
      throw new BadRequestException(
        `El usuario con id de personal ${staffId} no está confirmado`,
      );
    return user;
  }

  async updateTokenAndExpirationTime(
    updateTokenAndExpirationTimeDto: UpdateTokenAndExpirationTimeDto,
  ): Promise<string> {
    const { userId, token } = updateTokenAndExpirationTimeDto;
    // console.log(token);
    const expiresAt = new Date(Date.now() + 30000);
    const user = await this.userRepository.update(
      { userId },
      { token, expiresAt },
    );
    if (user.affected === 0)
      throw new NotFoundException(
        `El usuario con id ${userId} no se encuentra registrado`,
      );
    return 'El usuario se actualizó correctamente';
  }

  async findUserWithValidToken(): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        token: Not(IsNull()),
        expiresAt: MoreThan(new Date()),
      },
      relations: ['staff'],
    });
    if (!user || !user.token)
      throw new BadRequestException('El PIN no es válido');
    if (!user.expiresAt || user.expiresAt < new Date())
      throw new BadRequestException('El PIN ha expirado');
    return user;
  }

  async updatePasswordAndClearToken({
    userId,
    password,
  }: {
    userId: number;
    password: string;
  }): Promise<void> {
    await this.userRepository.update(userId, {
      password,
      token: undefined,
      expiresAt: undefined,
    });
  }

  async findOneForAuth(userId: number): Promise<User | null> {
    return this.userRepository.findOne({
      where: { userId, isActive: true },
      relations: ['staff', 'userHasRoles', 'userHasRoles.role'],
    });
  }
}
