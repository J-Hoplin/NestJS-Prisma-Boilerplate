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
            path: 'admin',
            module: AdminAuthenticationModule,
          },
          {
            path: 'user',
            module: UserAuthenticationModule,
          },
        ],
      },
    ]),
  ],
})
export class AuthenticationModule {}
