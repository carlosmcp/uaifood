import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import SERVICE_CONFIG from './../config/service';
import { ApplicationModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(ApplicationModule, {
    
    transport: Transport.TCP,
    options: {
      host: SERVICE_CONFIG.host,
      port: SERVICE_CONFIG.port
    }
  });
  
  app.useGlobalPipes(new ValidationPipe({ validationError: { target:false, value:false, },  transform: true }));
  app.listen(() => console.log('Microservice [Menu] is listening'));
  
}
bootstrap();