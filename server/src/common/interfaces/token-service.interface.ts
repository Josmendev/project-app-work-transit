import { JwtPayloadDto } from 'src/auth/dto/jwt-payload.dto';

export interface TokenService {
  sign(payload: object): string;
  decode(token: string): any;
  verify(token: string): JwtPayloadDto;
}
