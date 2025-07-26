import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { TokenService } from '../interfaces/token-service.interface';
import { JwtPayloadDto } from 'src/auth/dto/jwt-payload.dto';

@Injectable()
export class JwtAdapter implements TokenService {
  constructor(private readonly jwtService: JwtService) {}
  decode(token: string): string {
    return this.jwtService.decode(token);
  }
  sign(payload: object): string {
    return this.jwtService.sign(payload);
  }

  verify(token: string): JwtPayloadDto {
    return this.jwtService.verify(token);
  }
}
