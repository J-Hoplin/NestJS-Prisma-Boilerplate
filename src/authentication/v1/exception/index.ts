import { createException } from '@app/common';

enum AuthenticationV1ExceptionCode {
  CredentialAlreadyTakenException = 'P2001',
  InvalidCredentialException = 'P2002',
}

// Singup, credential already taken
export class CredentialAlreadyTakenException extends createException(
  400,
  'Credential already taken',
  AuthenticationV1ExceptionCode.CredentialAlreadyTakenException,
) {}

// Invalid credential while signin
export class InvalidCredentialException extends createException(
  400,
  'Invalid Credential',
  AuthenticationV1ExceptionCode.InvalidCredentialException,
) {}
