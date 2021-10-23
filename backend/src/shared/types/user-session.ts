import { UserStatus } from '../../users/entities';

export interface IUserSession {
  userId: number;
  status: UserStatus;
}
