// Nest Packages
import { Module } from '@nestjs/common';

// Custom Pacakges
import { LocalStrategy } from './guard/strategy/local.strategy';
import { UserAuthV1Module } from './v1/auth.module';

@Module({
  imports: [UserAuthV1Module],
  providers: [LocalStrategy],
})
export class AuthenticationModule {}
