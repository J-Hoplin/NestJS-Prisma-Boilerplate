import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { UserAuthV1Service } from './user.service';
import { UserV1SigninDto, UserV1SignupDto } from './dto';

@Controller({
  version: '1',
})
export class UserAuthV1Controller {
  constructor(private readonly service: UserAuthV1Service) {}

  @Post('/signup')
  @HttpCode(HttpStatus.OK)
  signup(@Body() dto: UserV1SignupDto) {
    return this.service.signup(dto);
  }

  @Post('/signin')
  @HttpCode(HttpStatus.OK)
  signin(@Body() dto: UserV1SigninDto) {
    return this.service.signin(dto);
  }
}
