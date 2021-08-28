import { User } from '@modules/user/entities/user.entity';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class EmailConfirmationGuard implements CanActivate {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const isEmailConfirmed = request.user.isEmailConfirmed;
    if (!isEmailConfirmed) {
      throw new UnauthorizedException('confirm your email first');
    }

    return true;
  }
}
