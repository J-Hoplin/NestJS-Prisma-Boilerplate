// Nest Packages
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

// Third-party Packagess
import { Request } from 'express';

// Custom Pacakges
import { AllowRole } from '@app/decorator/role/roles.decorator';
import { UserPayload } from '@app/types';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    const allowedRole = this.reflector.getAllAndMerge(AllowRole, [
      context.getHandler(),
      context.getClass(),
    ]);
    console.log(allowedRole);
    const request = context.switchToHttp().getRequest<Request>();
    const user: UserPayload = request.user as UserPayload;

    // If user role not in allowed role
    if (!allowedRole.includes(user.role)) {
      return false;
    }

    return true;
  }
}
