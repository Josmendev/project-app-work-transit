import { Module } from '@nestjs/common';
import { BcryptAdapter } from './adapters/bcrypt.adapter';
import { JwtAdapter } from './adapters/jwt.adapter';
import { JwtModule } from '@nestjs/jwt';
import { ENCRYPTION_SERVICE, TOKEN_SERVICE } from './constants/constants';
import { envs } from 'src/config/envs.config';

@Module({
  imports: [
    JwtModule.register({
      secret: envs.jwt.secret,
      signOptions: {
        expiresIn: '2h',
      },
    }),
  ],
  providers: [
    { provide: ENCRYPTION_SERVICE, useClass: BcryptAdapter },
    { provide: TOKEN_SERVICE, useClass: JwtAdapter },
  ],
  exports: [ENCRYPTION_SERVICE, TOKEN_SERVICE],
})
export class CommonModule {}
