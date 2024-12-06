// Nest Packages
import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

export const AdminControllerDocs = applyDecorators(
  ApiBearerAuth(),
  ApiTags('Admin API'),
);
