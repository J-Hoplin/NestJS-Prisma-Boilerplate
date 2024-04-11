import { Controller, Post } from '@nestjs/common';
import { UserAuthV1Service } from './user.service';

@Controller({
  version: '1',
})
export class UserAuthV1Controller {
  constructor(private readonly service: UserAuthV1Service) {}

  @Post('/signup')
  signup() {}

  @Post('/signin')
  signin() {}
}
