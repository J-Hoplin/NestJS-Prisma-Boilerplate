// Nest Pacakges
import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { AdminV1ListUserResponse } from '../response';

export const AdminV1ListUserDocs = applyDecorators(
  ApiOperation({
    description: 'List service user list',
  }),
  ApiOkResponse({
    type: AdminV1ListUserResponse,
  }),
);
