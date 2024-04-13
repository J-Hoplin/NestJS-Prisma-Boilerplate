// Nest Pacakges
import { NestFactory } from '@nestjs/core';

// Custom Packages
import { initializeAdminAccount, nestAppConfig } from './app.config';
import { AppModule } from './app.module';
import { nestSwaggerConfig } from './app.swgger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  // Admin account init
  // Warning: Do not user this in production
  initializeAdminAccount(app);

  // Nest application setting
  nestAppConfig(app);

  // Nest application document setting
  nestSwaggerConfig(app, {
    title: 'Hoplin-Nest-Template',
    description: 'Template codes for Nest.js',
    contact: {
      maintainer: 'J-Hoplin',
      url: 'https://github.com/J-Hoplin',
      email: 'hoplin.dev@gmail.com',
    },
  });

  await app.listen(3000);
}
bootstrap();
