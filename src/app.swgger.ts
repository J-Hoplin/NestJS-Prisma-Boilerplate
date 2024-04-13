// Nest Packages
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

interface ISwaggerConfigContact {
  maintainer: string;
  url: string;
  email: string;
}

interface ISwaggerConfig {
  title: string;
  description?: string;
  contact?: ISwaggerConfigContact;
  version?: string;
}

export function nestSwaggerConfig(
  app: INestApplication,
  option: ISwaggerConfig,
) {
  const config = new DocumentBuilder();
  config.setTitle(option.title);
  // Description
  if (option?.description) {
    config.setDescription(option.description);
  }

  // Contact
  if (option?.contact) {
    config.setContact(
      option.contact.maintainer,
      option.contact.url,
      option.contact.email,
    );
  }

  // Version
  if (option?.version) {
    config.setVersion(option.version);
  }

  config.addBearerAuth();

  const document = SwaggerModule.createDocument(app, config.build());
  SwaggerModule.setup('docs', app, document, {
    explorer: true,
  });
}
