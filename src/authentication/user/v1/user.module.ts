import { Module } from '@nestjs/common';
import { UserAuthV1Repository } from './user.repository';
import { UserAuthV1Service } from './user.service';
import { UserAuthV1Controller } from './user.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

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
  providers: [UserAuthV1Service, UserAuthV1Repository],
  controllers: [UserAuthV1Controller],
  exports: [UserAuthV1Repository, UserAuthV1Service],
})
export class UserAuthV1Module {}
