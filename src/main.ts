import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v0')

  app.enableCors();

  const config = new DocumentBuilder()
  .setTitle('Reservation Hotel')
  .setDescription('Backend reservation hotel configuration')
  .setVersion('1.0')
  .addBearerAuth()
  .build()

  const document =SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document) 

  await app.listen(process.env.PORT || 3000);
}

bootstrap();