import { Module } from '@nestjs/common';
import { AdminAuthV1Repository } from './auth.repository';
import { AdminAuthV1Service } from './auth.service';
import { AdminAuthV1Controller } from './auth.controller';

@Module({
  controllers: [AdminAuthV1Controller],
  providers: [AdminAuthV1Service, AdminAuthV1Repository],
  exports: [AdminAuthV1Service, AdminAuthV1Repository],
})
export class AdminAuthV1Module {}
