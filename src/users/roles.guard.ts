import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../common/decorators/roles.decorator';
import { Role } from './entities/user.entity';
import { UsersService } from './users.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector,         
    private readonly usersService: UsersService,
    ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {

    console.log("Running RolesGuard")

    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    const roles = (await this.usersService.findOne(user?.username)).role;

    return requiredRoles.some((requiredRole) => roles?.includes(requiredRole));
  }
}