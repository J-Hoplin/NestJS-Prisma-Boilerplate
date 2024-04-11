/**
 * For req.user
 *
 * This type used after passport authentication.(Return type of validate() function)
 */
export type UserPayload = {
  id: string;
  email: string;
  type: string;
};
