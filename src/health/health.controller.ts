// Nest Packages
import { Controller, Get } from '@nestjs/common';
import { HealthCheck } from '@nestjs/terminus';
import { ApiTags } from '@nestjs/swagger';

// Custom Packages
import { HealthService } from './health.service';
import { AllowPublic } from '@app/decorator';

@Controller('health')
@AllowPublic()
@ApiTags('System Health')
export class HealthController {
  constructor(private service: HealthService) {}

  @Get()
  @HealthCheck()
  check() {
    return this.service.check();
  }
}
