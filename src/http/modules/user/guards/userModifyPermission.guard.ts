import { CanActivate, ExecutionContext } from '@nestjs/common';

export class UserModifyPermissionGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    if (request.user.isAdmin) return true;

    const tokenUuid = request.user.uuid;
    const requestUuid = request.params.uuid;

    if (tokenUuid !== requestUuid) return false;
    return true;
  }
}
