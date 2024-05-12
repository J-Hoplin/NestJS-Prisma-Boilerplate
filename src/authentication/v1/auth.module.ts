// Nest Pacakges
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

// Custom Pacakges
import { UserAuthV1Controller } from './auth.controller';
import { UserAuthV1Service } from './auth.service';
import { AuthPrismaRepository, AuthV1Repository } from './repository';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
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
  ],
  providers: [
    UserAuthV1Service,
    {
      provide: AuthV1Repository,
      useClass: AuthPrismaRepository,
    },
  ],
  controllers: [UserAuthV1Controller],
  exports: [UserAuthV1Service],
})
export class UserAuthV1Module {}
