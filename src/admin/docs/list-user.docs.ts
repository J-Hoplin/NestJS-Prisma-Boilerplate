// Nest Pacakges
import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { AdminListUserResponse } from '../serializer/response/list-user.response';

export const AdminListUserDocs = applyDecorators(
  ApiOperation({
    description: 'List service user list',
  }),
  ApiOkResponse({
    type: AdminListUserResponse,
  }),
);
