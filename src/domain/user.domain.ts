import { $Enums, User } from '@prisma/client';

export class UserDomain implements User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: $Enums.UserRole;
  signupType: $Enums.SignupType;
  createdAt: Date;
  updatedAt: Date;
}
