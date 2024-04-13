// Nest Packages
import { Module } from '@nestjs/common';
import { AdminV1Module } from './v1/admin.module';

@Module({
  imports: [AdminV1Module],
})
export class AdminModule {}
