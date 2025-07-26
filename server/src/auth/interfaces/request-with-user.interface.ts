import { Request } from 'express';
import { UserProfileDto } from '../dto/validate-user-response.dto';

export interface RequestWithUser extends Request {
  user?: UserProfileDto;
}
