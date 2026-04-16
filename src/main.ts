import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:3000', 
    methods: 'GET,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Leads CRM API')
    .setDescription('The Leads API description')
    .setVersion('1.0')
    .addTag('leads')
    .addTag('comments')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('doc', app, document);


  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,        
      transform: true,         
      transformOptions: {
        enableImplicitConversion: true, 
      },
    }),
  );

  await app.listen(process.env.PORT?? 5000);
}
bootstrap();
