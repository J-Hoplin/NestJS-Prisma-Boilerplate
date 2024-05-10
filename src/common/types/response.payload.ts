/**
 * Common Response for both exception and success response
 *
 */
export interface ICommonResponse {
  success: boolean;
  error: any;
  data: any;
}
