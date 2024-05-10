// Nest Packages
import { ICommonResponse } from '@app/common/types';
import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';

// Custom Packages
import { Observable, map } from 'rxjs';

export class CommonResponseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((payload = {}): ICommonResponse => {
        return {
          success: true,
          error: null,
          data: payload,
        };
      }),
    );
  }
}
