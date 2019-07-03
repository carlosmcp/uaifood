import { NestFactory, Reflector } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { ApplicationModule } from './app.module';
import SERVICE_CONFIG from './../config/service';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(ApplicationModule, {
    
    transport: Transport.TCP,
    options: {
      host: SERVICE_CONFIG.host,
      port: SERVICE_CONFIG.port
    }
  });
  
  app.useGlobalPipes(new ValidationPipe({ validationError: { target:false, value:false, },  transform: true }));
  app.listen(() => console.log('Microservice [BackOffice] is listening'));
  
}
bootstrap();