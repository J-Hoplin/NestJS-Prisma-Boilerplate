import { ExceptionPayload } from '../types/exception.payload';
import { RootException } from './exception.abstract';

const codeUnknown = 'Unknown';

// Create Custom Exception
export const createException = (
  statusCode: number,
  message: string,
  code = codeUnknown,
) => {
  const payload: ExceptionPayload = {
    code: code,
    message: message,
  };
  return class extends RootException {
    constructor() {
      super(payload, statusCode);
    }
  };
};
