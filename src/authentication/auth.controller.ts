// Nest Packages
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

// Custom Packages
import { AllowPublic } from '@app/common/decorator';
import { AuthService } from './auth.service';
import { UserAuthSigninDocs, UserAuthSignupDocs } from './docs';
import { UserSigninDto, UserSignupDto } from './dto';

@Controller({
  path: 'auth',
})
@AllowPublic()
@ApiTags('Auth API')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('/signup')
  @HttpCode(HttpStatus.OK)
  @UserAuthSignupDocs
  signup(@Body() dto: UserSignupDto) {
    return this.service.signup(dto);
  }

  @Post('/signin')
  @UserAuthSigninDocs
  @HttpCode(HttpStatus.OK)
  signin(@Body() dto: UserSigninDto) {
    return this.service.signin(dto);
  }
}
