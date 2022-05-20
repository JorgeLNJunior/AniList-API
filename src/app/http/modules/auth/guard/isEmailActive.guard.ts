import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class IsEmailActiveGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    const isActive = request.user.isActive;
    if (!isActive) {
      throw new UnauthorizedException('active your email first');
    }

    return true;
  }
}
