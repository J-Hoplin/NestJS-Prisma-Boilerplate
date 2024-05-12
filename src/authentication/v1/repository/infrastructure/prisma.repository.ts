// Standard Packages
import { Injectable } from '@nestjs/common';

// Third-party Packages
import { $Enums } from '@prisma/client';

// Custom Packages
import { PrismaService } from '@app/prisma/prisma.service';
import { UserV1SigninDto, UserV1SignupDto } from '../../dto';
import type { AuthV1Repository } from '../auth.repository';

@Injectable()
export class AuthPrismaRepository implements AuthV1Repository {
  constructor(private readonly prisma: PrismaService) {}

  async userSignup(
    data: UserV1SignupDto,
    type: $Enums.SignupType,
  ): Promise<
    Pick<
      {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        role: $Enums.UserRole;
        signupType: $Enums.SignupType;
        createdAt: Date;
        updatedAt: Date;
      },
      'id'
    >
  > {
    const newUser = await this.prisma.user.create({
      data: {
        ...data,
        signupType: type,
      },
      select: {
        id: true,
      },
    });
    return newUser;
  }
  async userSignin(data: UserV1SigninDto): Promise<
    Pick<
      {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        role: $Enums.UserRole;
        signupType: $Enums.SignupType;
        createdAt: Date;
        updatedAt: Date;
      },
      'id' | 'password'
    >
  > {
    const findUser = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
      select: {
        id: true,
        password: true,
      },
    });
    return findUser;
  }
}
