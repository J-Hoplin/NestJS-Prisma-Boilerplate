// Nest Packages
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

// Third-party Packages
import * as bcrypt from 'bcryptjs';

// Custom Packages
import { JwtPayload } from '@app/common/types';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { UserV1SigninDto, UserV1SignupDto } from './dto';
import {
  CredentialAlreadyTakenException,
  InvalidCredentialException,
} from './exception';
import { AuthV1Repository } from './repository';
import { TokenAuthResponse } from './response';

@Injectable()
export class UserAuthV1Service {
  constructor(
    private readonly repository: AuthV1Repository,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}

  async signup(dto: UserV1SignupDto): Promise<TokenAuthResponse> {
    const encryptedPassword = await bcrypt.hash(dto.password, 10);
    try {
      const newUser = await this.repository.userSignup(
        {
          ...dto,
          password: encryptedPassword,
        },
        'LOCAL',
      );
      const accessToken = await this.issueToken({ id: newUser.id });
      return new TokenAuthResponse(accessToken);
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
          throw new CredentialAlreadyTakenException();
        }
      }
      // Else
      throw err;
    }
  }

  async signin(dto: UserV1SigninDto): Promise<TokenAuthResponse> {
    const findUser = await this.repository.userSignin(dto);
    if (!findUser) {
      throw new InvalidCredentialException();
    }
    const passwordValidation = await bcrypt.compare(
      dto.password,
      findUser.password,
    );
    if (!passwordValidation) {
      throw new InvalidCredentialException();
    }
    const accessToken = await this.issueToken({ id: findUser.id });
    return new TokenAuthResponse(accessToken);
  }

  private async issueToken(payload: JwtPayload): Promise<string> {
    const accessToken = await this.jwt.signAsync(payload);
    return accessToken;
  }
}
