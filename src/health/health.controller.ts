// Nest Packages
import { Controller, Get, UseGuards } from '@nestjs/common';
import { HealthCheck } from '@nestjs/terminus';

// Custom Packages
import { AllowRole } from '@app/common/decorator';
import { RoleGuard } from '@app/common/guard';
import { HealthControllerDocs } from './docs';
import { HealthService } from './health.service';

@Controller('health')
@UseGuards(RoleGuard)
@AllowRole(['ADMIN'])
@HealthControllerDocs
export class HealthController {
  constructor(private service: HealthService) {}

  @Get()
  @HealthCheck()
  check() {
    return this.service.check();
  }
}
