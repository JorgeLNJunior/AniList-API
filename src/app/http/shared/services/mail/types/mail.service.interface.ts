import { User } from '@http/modules/user/entities/user.entity';

export interface IMailService {
  sendUserActivationEmail(user: User): Promise<void>;
}
