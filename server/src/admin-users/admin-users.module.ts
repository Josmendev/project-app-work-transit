import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { StaffModule } from './staff/staff.module';

@Module({
  imports: [UsersModule, RolesModule, StaffModule]
})
export class AdminUsersModule {}
