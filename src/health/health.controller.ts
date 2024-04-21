// Nest Packages
import { Controller, Get } from '@nestjs/common';
import { HealthCheck } from '@nestjs/terminus';

// Custom Packages
import { HealthService } from './health.service';
import { AllowPublic } from '@app/decorator';
import { ApiTags } from '@nestjs/swagger';

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
