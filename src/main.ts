import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuración de CORS
  app.enableCors({
    origin: '*', // Cambia esto a un dominio específico en producción
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
  });
  // Aplicar el pipe de validación global
  app.useGlobalPipes(new ValidationPipe({
    transform: true, // Transforma automáticamente los datos del cuerpo en instancias de DTO
    whitelist: true, // Elimina propiedades no especificadas en el DTO
    forbidNonWhitelisted: true, // Lanza una excepción si hay propiedades no permitidas
    forbidUnknownValues: true, // Lanza una excepción si se encuentran valores no permitidos
  }));

  await app.listen(3000);
}
bootstrap();
