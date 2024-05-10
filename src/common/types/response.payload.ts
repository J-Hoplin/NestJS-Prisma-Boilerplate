import { ExceptionPayload } from './exception.payload';

/**
 * Common Response for both exception and success response
 *
 */
export interface ICommonResponse {
  success: boolean;
  data: any;
  error: ExceptionPayload;
}
