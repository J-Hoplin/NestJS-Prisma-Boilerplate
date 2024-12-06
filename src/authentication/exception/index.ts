import { createException } from '@app/common/error';

enum AuthenticationExceptionCode {
  CredentialAlreadyTakenException = 'P2001',
  InvalidCredentialException = 'P2002',
}

// Singup, credential already taken
export class CredentialAlreadyTakenException extends createException(
  400,
  'Credential already taken',
  AuthenticationExceptionCode.CredentialAlreadyTakenException,
) {}

// Invalid credential while signin
export class InvalidCredentialException extends createException(
  400,
  'Invalid Credential',
  AuthenticationExceptionCode.InvalidCredentialException,
) {}
