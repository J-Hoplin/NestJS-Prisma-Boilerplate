import { Module } from '@nestjs/common';
import { UserAuthV1Repository } from './user.repository';
import { UserAuthV1Service } from './user.service';

@Module({
  providers: [UserAuthV1Repository, UserAuthV1Service],
  exports: [UserAuthV1Repository, UserAuthV1Service],
})
export class UserAuthV1Module {}
