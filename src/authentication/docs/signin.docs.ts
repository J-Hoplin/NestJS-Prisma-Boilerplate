// Nest packages
import { applyDecorators } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

// Custom Packages
import { TokenAuthResponse } from '../response';

export const UserAuthSigninDocs = applyDecorators(
  ApiOperation({
    summary: 'User signin',
  }),
  ApiOkResponse({
    type: TokenAuthResponse,
  }),
  ApiUnauthorizedResponse({
    description: 'Invalid credential',
  }),
);
