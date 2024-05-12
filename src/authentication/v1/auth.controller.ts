// Nest Packages
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

// Custom Packages
import { AllowPublic } from '@app/common/decorator';
import { UserAuthV1Service } from './auth.service';
import { UserAuthV1SigninDocs, UserAuthV1SignupDocs } from './docs';
import { UserV1SigninDto, UserV1SignupDto } from './dto';

@Controller({
  version: '1',
  path: 'auth',
})
@AllowPublic()
@ApiTags('Auth API - V1')
export class UserAuthV1Controller {
  constructor(private readonly service: UserAuthV1Service) {}

  @Post('/signup')
  @HttpCode(HttpStatus.OK)
  @UserAuthV1SignupDocs
  signup(@Body() dto: UserV1SignupDto) {
    return this.service.signup(dto);
  }

  @Post('/signin')
  @UserAuthV1SigninDocs
  @HttpCode(HttpStatus.OK)
  signin(@Body() dto: UserV1SigninDto) {
    return this.service.signin(dto);
  }
}
