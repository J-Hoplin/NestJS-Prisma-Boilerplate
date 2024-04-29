// Nest Packages
import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HealthCheck } from '@nestjs/terminus';

// Custom Packages
import { RoleGuard } from '@app/authorization/guard/roles.guard';
import { HealthService } from './health.service';
import { AllowRole } from '@app/common/decorator';

@Controller('health')
@UseGuards(RoleGuard)
@AllowRole(['ADMIN'])
@ApiTags('System Health')
export class HealthController {
  constructor(private service: HealthService) {}

  @Get()
  @HealthCheck()
  check() {
    return this.service.check();
  }
}
