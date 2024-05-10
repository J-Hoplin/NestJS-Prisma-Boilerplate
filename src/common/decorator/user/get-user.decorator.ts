// Nest Packages
import { UserPayload } from '@app/common/types';
import { ExecutionContext, createParamDecorator } from '@nestjs/common';

// Third-party Packages
import { Request } from 'express';

/**
 * @GetUser decorator
 *
 * @GetUser('id') => Get only id field of user
 * @GetUser() => Get user credential
 *
 * Use this decorator in request handler for getting authenticated user credential
 */

export const GetUser = createParamDecorator(
  (
    data: keyof UserPayload,
    context: ExecutionContext,
  ): UserPayload | UserPayload[keyof UserPayload] => {
    // Get request context
    const request = context.switchToHttp().getRequest<Request>();

    // Get request user
    const user: UserPayload = (request.user ?? {}) as UserPayload;
    return data ? user[data] : user;
  },
);
