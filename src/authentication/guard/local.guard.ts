import { AllowPublicToken } from '@app/decorator/public/public.decorator';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { LOCAL } from './strategy/stretegy.token';
import { Observable } from 'rxjs';

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

    if (isPublic) {
      return true;
    }
    return super.canActivate(context);
  }
}
