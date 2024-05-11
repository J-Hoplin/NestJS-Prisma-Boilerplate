// Third-party Packages
import { $Enums, User } from '@prisma/client';

// Custom Packages
import { UserV1SigninDto, UserV1SignupDto } from '../dto';

export abstract class AuthV1Repository {
  abstract userSignup(
    data: UserV1SignupDto,
    type: $Enums.SignupType,
  ): Promise<Pick<User, 'id'>>;
  abstract userSignin(
    data: UserV1SigninDto,
  ): Promise<Pick<User, 'id' | 'password'>>;
}
