// Nest Packages
import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';

// Custom Packages
import { HealthController } from './health.controller';
import { HealthService } from './health.service';

@Module({
  imports: [TerminusModule],
  controllers: [HealthController],
  providers: [HealthService],
})
export class HealthModule {}
