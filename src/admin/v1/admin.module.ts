// Nest Packages
import { Module } from '@nestjs/common';

// Custom Pacakges
import { AdminV1Controller } from './admin.controller';

import { AdminV1Service } from './admin.service';
import { AdminPrismaRepository, AdminV1Repository } from './repository';

@Module({
  controllers: [AdminV1Controller],
  providers: [
    AdminV1Service,
    {
      provide: AdminV1Repository,
      useClass: AdminPrismaRepository,
    },
  ],
  exports: [AdminV1Service, AdminV1Repository],
})
export class AdminV1Module {}
