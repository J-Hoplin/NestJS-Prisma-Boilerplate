// Nest Packages
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

// Custom Packages
import { AllowPublic } from '@app/common/decorator';
import { AuthService } from './auth.service';
import { UserAuthV1SigninDocs, UserAuthV1SignupDocs } from './docs';
import { UserV1SigninDto, UserV1SignupDto } from './dto';

@Controller({
  path: 'auth',
})
@AllowPublic()
@ApiTags('Auth API')
export class AuthController {
  constructor(private readonly service: AuthService) {}

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
