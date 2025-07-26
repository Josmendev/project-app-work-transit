import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/admin-users/users/users.module';
import { CommonModule } from 'src/common/common.module';
import { JwtModule } from '@nestjs/jwt';
import { envs } from 'src/config/envs.config';
import { StaffModule } from 'src/admin-users/staff/staff.module';
import { EmailsModule } from 'src/emails/emails.module';

@Module({
  imports: [
    UsersModule,
    StaffModule,
    CommonModule,
    EmailsModule,
    JwtModule.register({
      secret: envs.jwt.secret,
      signOptions: {
        expiresIn: '2h',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
