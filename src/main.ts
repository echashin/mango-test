import { LoggerService, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { OpenAPIObject, SwaggerCustomOptions } from '@nestjs/swagger/dist/interfaces';
import { useContainer } from 'class-validator';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import * as process from 'process';
import * as swStats from 'swagger-stats';

import { AppModule } from './app.module';
import { validationPipeOptions } from './shared/configs/validation-pipe-options';
import { ClusterService } from './shared/services/cluster-service';
import { swaggerDocs } from './swagger-docs';

async function bootstrap(): Promise<void> {
  const adapter: FastifyAdapter = new FastifyAdapter({});
  const app: NestFastifyApplication = await NestFactory.create<NestFastifyApplication>(AppModule, adapter);

  app.enableCors();

  //enable DI in decorators
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.useGlobalPipes(new ValidationPipe(validationPipeOptions));

  const nestWinston: LoggerService = app.get(WINSTON_MODULE_NEST_PROVIDER);
  app.useLogger(nestWinston);

  //enable swagger
  const docs: Record<string, OpenAPIObject> = swaggerDocs(app);

  const swaggerCustomOptions: SwaggerCustomOptions = {
    swaggerOptions: { persistAuthorization: true, preserveAuthorization: true, showExtensions: true },
  };

  for (const [name, document] of Object.entries(docs)) {
    SwaggerModule.setup(`api/${name}`, app, document, swaggerCustomOptions);
  }

  //Swagger All
  const allSwaggerOptions: Omit<OpenAPIObject, 'paths'> = new DocumentBuilder()
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'access-token')
    .setTitle('All Endpoints API')
    .setVersion('1.0.1')
    .addServer(process.env.SERVER_URL)
    .build();

  const allSwaggerDocument: OpenAPIObject = SwaggerModule.createDocument(app, allSwaggerOptions, {
    include: [],
  });
  app.use(swStats.getMiddleware({ swaggerSpec: allSwaggerDocument }));

  await app.startAllMicroservices();
  await app.listen(process.env.APP_PORT, process.env.APP_HOST);

  // eslint-disable-next-line no-console
  console.log(`Application is running on: ${await app.getUrl()}`);
}

if (Number(process.env.MAX_CPU) > 1) {
  ClusterService.clusterize(bootstrap);
} else {
  // eslint-disable-next-line unicorn/prefer-top-level-await
  bootstrap();
}
