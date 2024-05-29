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

  // This used for sentry error code
  // Why?: To prevent sentry message code duplication if code given with unknown
  const errorContextName =
    code === codeUnknown ? `${codeUnknown} - ${message}` : code;
  return class extends RootException {
    constructor() {
      super(payload, statusCode, errorContextName);
    }
  };
};
