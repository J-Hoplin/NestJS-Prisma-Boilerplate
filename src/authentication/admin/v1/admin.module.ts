import { Module } from '@nestjs/common';
import { AdminAuthV1Repository } from './auth.repository';
import { AdminAuthV1Service } from './auth.service';

@Module({
  providers: [AdminAuthV1Service, AdminAuthV1Repository],
  exports: [AdminAuthV1Service, AdminAuthV1Repository],
})
export class AdminAuthV1Module {}
