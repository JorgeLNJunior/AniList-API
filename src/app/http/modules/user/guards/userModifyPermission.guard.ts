import { CanActivate, ExecutionContext } from '@nestjs/common'

export class UserModifyPermissionGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest()
    if (request.user.isAdmin) return true

    const tokenUUID = request.user.uuid
    const requestUUID = request.params.uuid

    if (tokenUUID !== requestUUID) return false
    return true
  }
}
