// Nest Packages

// Custom Packages
import { ExceptionPayload } from '../types/exception.payload';

export abstract class RootException<
  T extends ExceptionPayload = ExceptionPayload,
  U extends number = number,
> {
  // Set every message to readonly
  constructor(
    public readonly message: T,
    public readonly statuscode: U,
  ) {}
}
