import { User } from '@http/modules/user/entities/user.entity';

export interface IMailService {
  sendConfirmationEmail(user: User): Promise<void>;
}
