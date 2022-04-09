import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from '@nestjs/common'

@Injectable()
export class EmailConfirmationGuard implements CanActivate {
  canActivate (context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest()

    const isEmailConfirmed = request.user.isEmailConfirmed
    if (!isEmailConfirmed) {
      throw new UnauthorizedException('confirm your email first')
    }

    return true
  }
}
