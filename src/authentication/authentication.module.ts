import { Module } from '@nestjs/common';
import { AdminAuthenticationModule } from './admin/admin.module';
import { UserAuthenticationModule } from './user/user.module';
import { RouterModule } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: config.get<string>('EXPIRE_TIME'),
          },
        };
      },
    }),
    UserAuthenticationModule,
    AdminAuthenticationModule,
    RouterModule.register([
      {
        path: 'auth',
        children: [
          {
            path: 'user',
            module: UserAuthenticationModule,
          },
          {
            path: 'admin',
            module: AdminAuthenticationModule,
          },
        ],
      },
    ]),
  ],
})
export class AuthenticationModule {}
