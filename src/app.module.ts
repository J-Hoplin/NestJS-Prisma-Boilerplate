// Nest Packages
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

// Third-party Packages
import { PostgresDialect } from 'kysely';
import { KyselyModule } from 'nestjs-kysely';
import { Pool } from 'pg';

// Custom Packages
import { AdminModule } from './admin/admin.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationModule } from './authentication/authentication.module';
import { HealthModule } from './health/health.module';
import { LoggerMiddleware } from './logger/logger.middleware';
import { LoggerModule } from './logger/logger.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    LoggerModule,
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
    }),
    KyselyModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        return {
          dialect: new PostgresDialect({
            pool: new Pool({
              database: config.get<string>('DATABASE_NAME'),
              host: config.get<string>('DATABASE_HOST'),
              user: config.get<string>('DATABASE_USER'),
              password: config.get<string>('DATABASE_PASSWORD'),
              port: +config.get<string>('DATABASE_PORT'),
              max: +config.get<string>('DATABASE_MAX_CONNECTION_POOL'),
            }),
          }),
        };
      },
    }),
    PrismaModule,
    AuthenticationModule,
    AdminModule,
    HealthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
