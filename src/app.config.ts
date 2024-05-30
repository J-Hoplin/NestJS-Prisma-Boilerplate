// Nest Packages
import {
  ClassSerializerInterceptor,
  INestApplication,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';

// Third-party Packges
import * as Sentry from '@sentry/node';
import * as bcrypt from 'bcryptjs';

// Custom Packages
import { LocalGuard } from './authentication/guard/local.guard';
import { RootExceptionFilter } from './common/filter';
import { CommonResponseInterceptor } from './common/interceptors';
import { PrismaService } from './prisma/prisma.service';

export async function initializeSentry<
  T extends INestApplication = INestApplication,
>(app: T) {
  const config = app.get<ConfigService>(ConfigService);
  Sentry.init({
    dsn: config.get<string>('SENTRY_DSN'),
    tracesSampleRate: 1.0,
    integrations: [Sentry.prismaIntegration()],
  });
}

// Warning: Do not user this in production
export async function initializeAdminAccount<
  T extends INestApplication = INestApplication,
>(app: T) {
  const adminEmail = 'admin@admin.com';
  const adminPW = await bcrypt.hash('admin', 10);

  // Create or Update admin user
  const prisma = app.get<PrismaService>(PrismaService);
  await prisma.user.upsert({
    where: {
      email: adminEmail,
    },
    update: {
      role: 'ADMIN',
    },
    create: {
      email: adminEmail,
      password: adminPW,
      role: 'ADMIN',
      first_name: 'Admin',
      last_name: 'Admin',
      sign_up_type: 'LOCAL',
    },
  });
}

export function nestAppConfig<T extends INestApplication = INestApplication>(
  app: T,
) {
  app.enableCors({
    origin: '*',
  });

  // Get reflector
  const reflector = app.get<Reflector>(Reflector);

  // Use global guard
  app.useGlobalGuards(new LocalGuard(reflector));

  // Use class validator
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(reflector), // Class-Serializer Interceptor
    new CommonResponseInterceptor(), // Response Payload Interceptor
  );

  // Enable versioning as URI
  app.enableVersioning({
    type: VersioningType.URI,
  });

  // Set class-validator option
  app.useGlobalPipes(
    new ValidationPipe({
      skipNullProperties: true,
      whitelist: true,
    }),
  );

  // Exception Filter
  app.useGlobalFilters(new RootExceptionFilter());

  // Set class-transformer global serializer interceptor
  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));
}
