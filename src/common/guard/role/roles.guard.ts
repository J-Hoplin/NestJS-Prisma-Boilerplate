// Nest Packages
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

// Third-party Packagess
import { Request } from 'express';

// Custom Pacakges
import { AllowRole } from '@app/common/decorator/role/roles.decorator';
import { RoleAuthorizationFailedException } from '@app/common/error';
import { UserPayload } from '@app/common/types';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    const allowedRole = this.reflector.getAllAndMerge(AllowRole, [
      context.getHandler(),
      context.getClass(),
    ]);

    const request = context.switchToHttp().getRequest<Request>();
    const user: UserPayload = request.user as UserPayload;

    // If user role not in allowed role
    if (!allowedRole.includes(user.role)) {
      throw new RoleAuthorizationFailedException();
    }

    return true;
  }
}
