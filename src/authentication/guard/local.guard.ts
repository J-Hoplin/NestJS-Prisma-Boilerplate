// Nest Packages
import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

// Third-party Packages

// Custom Packages
import { AllowPublicToken } from '@app/common/decorator/public/public.decorator';
import { LOCAL } from './strategy/stretegy.token';

@Injectable()
export class LocalGuard extends AuthGuard(LOCAL) {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndMerge(AllowPublicToken, [
      context.getClass(),
      context.getHandler(),
    ]);

    /**
     * If AllowPublic not set, it'll return an empty array
     *
     * If set, it will return an boolean true
     */

    // Return true if metadata allow public
    if (typeof isPublic === 'boolean' && isPublic) {
      try {
        return (await super.canActivate(context)) as boolean;
      } catch (err) {
        return true;
      }
    }
    return (await super.canActivate(context)) as boolean;
  }
}
