import {
  ClassSerializerInterceptor,
  INestApplication,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

export function nestAppConfig(app: INestApplication) {
  app.enableCors({
    origin: '*',
  });
  // Get reflector
  const reflector = app.get<Reflector>(Reflector);

  // Use class transformer serializer
  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));

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

  // Set class-transformer global serializer interceptor
  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));
}
