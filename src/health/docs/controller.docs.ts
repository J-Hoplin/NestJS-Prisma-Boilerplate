import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

export const HealthV1ControllerDocs = applyDecorators(
  ApiBearerAuth(),
  ApiTags('Health API - V1 (Require role "admin")'),
);
