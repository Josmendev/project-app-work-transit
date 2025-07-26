import { User } from 'src/admin-users/users/entities/user.entity';
import { UserProfileDto } from '../dto/validate-user-response.dto';

export const formatUserProfile = (user: User): UserProfileDto => ({
  userId: user.userId,
  username: user.username,
  staffId: user.staff?.staffId || 0,
  identityDocumentNumber: user.staff?.identityDocumentNumber || '',
  name: user.staff?.name || '',
  paternalSurname: user.staff?.paternalSurname || '',
  maternalSurname: user.staff?.maternalSurname || '',
  role: user.userHasRoles?.map((uhr) => uhr.role.description) || [],
});
