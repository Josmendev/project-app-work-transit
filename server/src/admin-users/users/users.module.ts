import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserHasRoles } from './entities/user-has-roles.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserHasRoles])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
