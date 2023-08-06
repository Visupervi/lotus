import { Injectable, CanActivate, ExecutionContext, Logger } from '@nestjs/common';
import { RoleService } from 'src/modules/role/role.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly roleService: RoleService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const logger = new Logger();
    logger.log('请求接口为：' + request.originalUrl, 'RolesGuard');
    const info = await this.roleService.findRoleAndRouters(request.user.roleId);
    const routes = info.routes.map((item) => item.url);
    if (routes.includes(request.originalUrl)) {
      logger.log('权限验证通过', 'RolesGuard');
      return true;
    }
    logger.log('权限未通过', 'RolesGuard');
    return false;
  }
}
