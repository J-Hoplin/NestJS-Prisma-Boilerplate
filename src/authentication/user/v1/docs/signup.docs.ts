import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { TokenAuthResponse } from '../response';

export const UserAuthV1SignupDocs = applyDecorators(
  ApiOperation({
    summary: 'User signup',
  }),
  ApiOkResponse({
    type: TokenAuthResponse,
  }),
  ApiBadRequestResponse({
    description: 'Credential Taken',
  }),
  ApiUnauthorizedResponse({
    description: 'Invalid credential',
  }),
);
