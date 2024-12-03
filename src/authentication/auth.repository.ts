import { PrismaService } from '@app/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { $Enums, User } from '@prisma/client';
import { UserV1SigninDto, UserV1SignupDto } from './dto';

@Injectable()
export class AuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  async userSignup(
    data: UserV1SignupDto,
    type: $Enums.SignupType,
  ): Promise<Pick<User, 'id'>> {
    const newUser = await this.prisma.user.create({
      data: {
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        password: data.password,
        sign_up_type: type,
      },
      select: {
        id: true,
      },
    });
    return newUser;
  }
  async userSignin(
    data: UserV1SigninDto,
  ): Promise<Pick<User, 'id' | 'password'>> {
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
