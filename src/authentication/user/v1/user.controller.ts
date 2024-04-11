import { Controller, Get } from '@nestjs/common';
import { UserAuthV1Service } from './user.service';

@Controller({
  version: '1',
})
export class UserAuthV1Controller {
  constructor(private readonly service: UserAuthV1Service) {}

  @Get('/')
  get() {}
}
