import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    rawBody: true,
  });

  app.setGlobalPrefix('api/v1');

  const config = new DocumentBuilder()
    .setTitle('Dự án API của tôi')
    .setDescription('Danh sách các API và hướng dẫn sử dụng')
    .setVersion('1.0')
    .addTag('users')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/v1/docs', app, document);

  await app.listen(3000);
  console.log(`Ứng dụng đang chạy tại: ${await app.getUrl()}/api/v1/docs`);
}
bootstrap();
