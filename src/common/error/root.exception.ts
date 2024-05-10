// Nest Packages
import { HttpStatus } from '@nestjs/common';

// Custom Packages
import { ExceptionPayload } from './type';

export abstract class RootException {
  // Set every message to readonly
  constructor(
    public readonly message: ExceptionPayload,
    public readonly statuscode: HttpStatus,
  ) {}
}
