import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

export const HealthControllerDocs = applyDecorators(
  ApiBearerAuth(),
  ApiTags('Health API(Require role "admin")'),
);
