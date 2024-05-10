// Nest Packages
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

// Third-party Packages
import { ExtractJwt, Strategy } from 'passport-jwt';

// Custom Packages
import { AuthenticationFailedException } from '@app/common';
import { JwtPayload, UserPayload } from '@app/common/types';
import { PrismaService } from '@app/prisma/prisma.service';
import { LOCAL } from './stretegy.token';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, LOCAL) {
  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
  ) {
    super({
      secretOrKey: config.get<string>('JWT_SECRET'),
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<UserPayload> {
    const findUser = await this.prisma.user.findUnique({
      where: {
        id: payload.id,
      },
      select: {
        id: true,
        email: true,
        signupType: true,
        role: true,
      },
    });

    // If user not validated, throw 401 Unauthroized Exception
    if (!findUser) {
      throw new AuthenticationFailedException();
    }

    // Return payload for user
    return {
      id: findUser.id,
      email: findUser.email,
      type: findUser.signupType,
      role: findUser.role,
    };
  }
}
