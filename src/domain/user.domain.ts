// Nest Pacakages
import { ApiProperty } from '@nestjs/swagger';

// Third-party Packages
import { $Enums, User } from '@prisma/client';

export class UserDomain implements User {
  @ApiProperty()
  id: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  role: $Enums.UserRole;

  @ApiProperty()
  signupType: $Enums.SignupType;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
