import { Module } from '@nestjs/common';
import { UserAuthV1Repository } from './user.repository';
import { UserAuthV1Service } from './user.service';
import { UserAuthV1Controller } from './user.controller';

@Module({
  providers: [UserAuthV1Repository, UserAuthV1Service],
  controllers: [UserAuthV1Controller],
  exports: [UserAuthV1Repository, UserAuthV1Service],
})
export class UserAuthV1Module {}
