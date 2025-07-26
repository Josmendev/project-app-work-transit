import { User } from 'src/admin-users/users/entities/user.entity';

export const formatUserResponseForLogin = (user: User) => ({
  userId: user.userId,
  username: user.username,
  isConfirm: user.isConfirm,
});
