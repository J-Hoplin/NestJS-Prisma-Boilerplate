// Nest Packages
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext, Injectable } from '@nestjs/common';

// Third-party Packages
import { Observable } from 'rxjs';

// Custom Packages
import { AllowPublicToken } from '@app/decorator/public/public.decorator';
import { LOCAL } from './strategy/stretegy.token';

@Injectable()
export class LocalGuard extends AuthGuard(LOCAL) {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.getAllAndMerge(AllowPublicToken, [
      context.getClass(),
      context.getHandler(),
    ]);

    /**
     * If AllowPublic not set, it'll return an empty array
     *
     * If set, it will return an boolean true
     */
    if (typeof isPublic === 'boolean' && isPublic) {
      return true;
    }
    return super.canActivate(context);
  }
}
