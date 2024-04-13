// Nest Packages
import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

export const AdminV1ControllerDocs = applyDecorators(
  ApiBearerAuth(),
  ApiTags('Admin API - V1'),
);
