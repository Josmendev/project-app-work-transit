import * as bcrypt from 'bcryptjs';
import { Injectable } from '@nestjs/common';
import { envs } from 'src/config/envs.config';
import { EncryptionService } from '../interfaces/encryption-service.interface';

@Injectable()
export class BcryptAdapter implements EncryptionService {
  async hash(data: string): Promise<string> {
    return bcrypt.hash(data, envs.bcrypt.saltRounds);
  }

  async compare(data: string, hash: string): Promise<boolean> {
    return bcrypt.compare(data, hash);
  }
}
