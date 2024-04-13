// Nest Packages
import { Module } from '@nestjs/common';

// Custom Pacakges
import { AdminV1Repository } from './auth.repository';
import { AdminV1Service } from './auth.service';
import { AdminV1Controller } from './auth.controller';

@Module({
  controllers: [AdminV1Controller],
  providers: [AdminV1Service, AdminV1Repository],
  exports: [AdminV1Service, AdminV1Repository],
})
export class AdminV1Module {}
