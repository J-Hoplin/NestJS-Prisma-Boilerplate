import { createException } from '../exception.factory';

enum GlobalExceptionCode {
  AuthenticationFailedException = 'P1001',
  RoleAuthorizationFailedException = 'P1002',
}

// Authentication Failed
export class AuthenticationFailedException extends createException(
  401,
  'Fail to authenticate',
  GlobalExceptionCode.AuthenticationFailedException,
) {}

// Invalid Role
export class RoleAuthorizationFailedException extends createException(
  403,
  'Invalid Role Access',
  GlobalExceptionCode.RoleAuthorizationFailedException,
) {}
