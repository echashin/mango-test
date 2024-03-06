import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { OpenAPIObject } from '@nestjs/swagger/dist/interfaces';

import { InputError } from './shared/models/input-error';
import { UserModule } from './user/user.module';

export function swaggerDocs(app: INestApplication): Record<string, OpenAPIObject> {
  // Swagger Admin
  const adminSwaggerOptions: Omit<OpenAPIObject, 'paths'> = new DocumentBuilder()
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'access-token')
    .setTitle('Admin Endpoints API')
    .setVersion('1.0.1')
    .addServer(process.env.SERVER_URL)
    .build();

  const adminSwaggerDocument: OpenAPIObject = SwaggerModule.createDocument(app, adminSwaggerOptions, {
    extraModels: [InputError],
    include: [UserModule],
  });

  return {
    admin: adminSwaggerDocument,
  };
}
