import { Controller, Get } from '@nestjs/common';
import { AdminAuthV1Service } from './auth.service';

@Controller({
  version: '1',
})
export class AdminAuthV1Controller {
  constructor(private readonly authService: AdminAuthV1Service) {}

  @Get('/')
  get() {}
}
