// Nest Packages
import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';

// Custom Pacakges
import { AdminAuthV1Module } from './admin/v1/admin.module';
import { UserAuthV1Module } from './user/v1/user.module';
import { LocalStrategy } from './guard/strategy/local.strategy';

@Module({
  imports: [
    UserAuthV1Module,
    AdminAuthV1Module,
    RouterModule.register([
      {
        path: 'auth',
        children: [
          {
            path: 'user',
            module: UserAuthV1Module,
          },
          {
            path: 'admin',
            module: AdminAuthV1Module,
          },
        ],
      },
    ]),
  ],
  providers: [LocalStrategy],
})
export class AuthenticationModule {}
