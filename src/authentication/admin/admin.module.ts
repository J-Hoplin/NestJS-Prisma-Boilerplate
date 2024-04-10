import { Module } from '@nestjs/common';
import { AdminAuthV1Controller } from './v1/auth.controller';
import { AdminAuthV1Module } from './v1/admin.module';

@Module({
  imports: [AdminAuthV1Module],
  controllers: [AdminAuthV1Controller],
})
export class AdminAuthenticationModule {}
