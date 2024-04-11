/**
 * @Public decorator
 *
 * use to describe this class or context APIs are public
 *
 */

import { SetMetadata } from '@nestjs/common';

export const AllowPublicToken = 'allow-public';
export const AllowPublic = SetMetadata(AllowPublicToken, true);
