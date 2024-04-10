import { Module } from '@nestjs/common';
import { AdminAuthenticationModule } from './admin/admin.module';
import { UserAuthenticationModule } from './user/user.module';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
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
