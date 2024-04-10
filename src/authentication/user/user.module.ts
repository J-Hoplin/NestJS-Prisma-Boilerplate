import { Module } from '@nestjs/common';
import { UserAuthV1Module } from './v1/user.module';
import { UserAuthV1Controller } from './v1/user.controller';

@Module({
  imports: [UserAuthV1Module],
  controllers: [UserAuthV1Controller],
})
export class UserAuthenticationModule {}
