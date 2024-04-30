// Nest Packages
import { Controller, Get } from '@nestjs/common';

// Custom Packages
import { AppService } from './app.service';
import { AllowPublic } from './common/decorator';

@Controller()
@AllowPublic()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
