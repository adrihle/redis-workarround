import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

const PORT = 3000;
const SWAGGER_SUFIX = 'doc';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  const options = new DocumentBuilder()
    .setTitle('API')
    .setDescription('Endpoints documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(SWAGGER_SUFIX, app, document);

  await app.listen(PORT);
  Logger.log(
    '\x1b[33m\x1b',
    `Application is running on: http://localhost:${PORT}`,
  );
}
bootstrap();
