import { CanActivate, ExecutionContext } from '@nestjs/common'
import { Observable } from 'rxjs'

export class IsAdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest()
    if (request.user.isAdmin) return true
    return false
  }
}
